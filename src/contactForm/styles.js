import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    // backgroundImage: "linear-gradient(#FF9933, white, #138808)",
    padding: '20px',
    width: '75%',
    margin: '0 auto',
  },
  form: {
    padding:'20px',
  },
  formTF: {
    padding: '5px',
    color: 'white',
  },
  button: {
    fontFamily: 'Poppins, sans-serif',
    margin: '5px',
    fontSize: '15px',
    padding: '15px',
  },
  formHeader: {
    fontFamily: 'Poppins, sans-serif',
    color: "#B61F34",
  },
  textfieldLabel: {
    fontFamily: 'Poppins, sans-serif',
  },
  buttonSubmit: {
  },
  tac: {
    fontFamily: 'Poppins, sans-serif',
    display: 'block',
    margin: 'auto',
  },
  subMsg: {
    fontSize: '1.5em',
    fontFamily: 'Poppins, sans-serif',
  },
  code:{
    paddingTop: '50px',
  }

}));