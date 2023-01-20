import React, { useState } from 'react';
import { Button, Paper, TextField, Typography } from "@material-ui/core";
import { db } from '../firebaseConfig';
// import './styled.scss';
import useStyles from './styles';
import { doc, getDoc, updateDoc } from "firebase/firestore";


const ValidateForm = () => {
  const [vformData, setVFormData] = useState({
    name: '', email: '', contact: '',
  });
  const [formError, setFormError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState({
    contact: '',code:'', redeemed: false,
  });
  const classes = useStyles();

  const updateInput = e => {
    setVFormData({
      ...vformData,
      [e.target.name]: e.target.value,
    })
  }

  const getContactData = async (contact) => {
    const docRef = doc(db, "contacts", contact);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setData(docSnap.data());
      return true;
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      return false;
    }
  }

  const handleSubmit =  async event => {
    event.preventDefault();
    getContactData(vformData.contact);
    setIsSuccess(false);
  }
  
  const clear = () => {
    setVFormData({ contact:'' });
    setData({contact: '',code:'', redeemed: false,});
    setIsSuccess(false);
  }

  const markAsRedeemed = async () => {
    const contactsRef = doc(db, "contacts", data.contact);
    await updateDoc(contactsRef, {
      redeemed: true
    });
    setIsSuccess(true);
  }

  return (
    <Paper className={classes.paper}>
      <Typography className={classes.formHeader} variant='h5'>VALIDATION FORM</Typography>
        <form autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          <TextField
            InputLabelProps={{className: classes.textfieldLabel}}
            className={classes.formTF}
            half="true"
            required 
            name='contact' 
            variant="outlined" 
            label='Contact' 
            value={vformData.contact}
            error={formError}
            helperText={formError ? "Invalid Number" : ""}
            onChange={(e) => {
              // console.log(e.target.value.length);
              updateInput(e);
              if (e.target.value.length !== 10) {
                setFormError(true);
              } else {
                setFormError(false);
              }
            }}
          />
          <Button className={classes.button} variant='contained' color='primary' size='small' type='submit' >Validate</Button>
          <Button className={classes.button} variant='contained' color='secondary' size='small' onClick={clear} >Clear</Button>
        </form>
        <Typography>{data.code}</Typography>
        {data.code ? (
          <Typography>
            { data.redeemed ? 
              "Code already redeemed :(" : 
              <Button className={classes.button} variant='contained' color='secondary' size='small' onClick={markAsRedeemed} >Mark as redeemed</Button>
            }
          </Typography>
        ): null}
        {isSuccess ?
          (<Typography>Successfully marked as redeemed!</Typography>) : null
        }
    </Paper>
  )
}

export default ValidateForm;