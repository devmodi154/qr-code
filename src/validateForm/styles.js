import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: '20px',
    width: '75%',
    margin: '0 auto',
  },
  form: {
    padding:'20px',
  },
  formTF: {
    padding: '5px',
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
}));