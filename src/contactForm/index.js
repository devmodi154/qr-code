import React, { useState } from 'react';
import { Button, Paper, TextField, Typography } from "@material-ui/core";
import { db } from '../firebaseConfig';
import useStyles from './styles';
// import './styles.css';
import Confetti from "react-confetti";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { v4 as uuid } from 'uuid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from  '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';




const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', contact: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [code, setCode] = useState("");
  const classes = useStyles();
  const [isError, setIsError] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const errMessage = "Sorry this number has been already registered.";
  // const submissionMessage = `Thank you for submitting the form!\n Please save & share the following code at your nearest branch.`;
  const submissionMessage = (
    <div>
      <p>Thank you for submitting the form!</p>
      <p>Please save & share the following code at your nearest branch.</p>
    </div>
  )


  const updateInput = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactExists = async (contact) => {
    const docRef = doc(db, "contacts", contact);
    const docSnap = await getDoc(docRef);
    
    return docSnap.exists();
  }
   
  const handleSubmit =  async event => {
    event.preventDefault();

    if (isError) {
      return false;
    }

    const uid = uuid().slice(0,8).toUpperCase();

    const res = await contactExists(formData.contact);
    setIsSubmitted(true);
    if(res) {
      setMessage(errMessage);
      return;
    }

    await setDoc(doc(db, "contacts", formData.contact), {
      name: formData.name,
      email: formData.email,
      contact: formData.contact,
      code: uid,
      redeemed: false
    });
    setCode(uid);
    setMessage(submissionMessage);
    console.log('DATA SAVED!');
  }
  
  const clear = () => {
    setFormData({ name: '', email: '', contact: '' });
  }

  var displayMessage = (
    <div className={classes.subMsg}>
      <Typography variant='h5'>{message}</Typography>
      <Typography className={classes.code} variant='h3'>{code}</Typography>
      <Confetti />
    </div>
  )

  const form = (
    <Paper elevation={5} className={classes.paper}>
      <Typography className={classes.formHeader} variant='h5' align='center'>REPUBLIC DAY OFFER!</Typography>
        <form noValidate={false} autoComplete="off" className={classes.form} onSubmit={handleSubmit}>
            <TextField 
              InputLabelProps={{className: classes.textfieldLabel}}
              className={classes.formTF}
              required
              name='name' 
              variant="outlined" 
              label='Name'  
              value={formData.name} 
              fullWidth
              onChange={updateInput}
            />
            <TextField 
              InputLabelProps={{className: classes.textfieldLabel}}
              className={classes.formTF}
              name='email' 
              variant="outlined" 
              label='Email'  
              value={formData.email} 
              fullWidth
              onChange={updateInput}
            />
            <TextField
              InputLabelProps={{className: classes.textfieldLabel}}
              className={classes.formTF}
              error={isError}
              required 
              name='contact' 
              variant="outlined" 
              label='Contact' 
              fullWidth
              helperText={isError ? "Invalid Number" : ""}
              value={formData.contact} 
              onChange={(e) => {
                // console.log(e.target.value.length);
                updateInput(e);
                if (e.target.value.length !== 10) {
                  setIsError(true);
                } else {
                  setIsError(false);
                }
              }}
            />
            <Button className={classes.button} variant='contained' color='primary' type='submit' >Submit</Button>
            <Button className={classes.button} variant='contained' color='secondary' onClick={clear} >Clear</Button>
            <Button onClick={handleToggle} className={classes.tac}>Terms & Conditions</Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Terms & Conditions"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                1. This offer is valid only for customers of [Bank Name].<br />

                2. The promo code can be used to avail a discount of [discount amount] on [product/service offered].<br />

                3. The promo code is valid only on [specific date or period of time].<br />

                4. The promo code can only be used once per customer.<br />

                5. The promo code must be entered at the time of checkout to redeem the discount.<br />

                6. This offer cannot be combined with any other offers or promotions.<br />

                7. The bank reserves the right to modify or cancel this offer at any time without prior notice.<br />

                8. The bank is not responsible for any loss or damage incurred as a result of the use of the promo code.<br />

                9. By using the promo code, customers agree to these terms and conditions.<br />

                10. The bank has the right to cancel the transaction if it finds any misuse of the Promo code or any suspicious activity.<br />

                11. The bank has the right to change the terms and conditions of the offer anytime without prior notice.<br />

                12. The offer is subject to change based on the bank's discretion.<br />

                13. In case of any disputes, the bank's decision will be final.<br />

                14. These terms and conditions are subject to change without notice.<br />
                </DialogContentText>
              </DialogContent>
            </Dialog>
        </form>
    </Paper>
  );

  return (
    <>
        {!isSubmitted ? form : displayMessage}
    </>
  )
}

export default ContactForm;