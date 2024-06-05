import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const styles = {
  container: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    mt: 1,
  },
  submitButton: {
    mt: 3,
    mb: 2,
  },
  cancelButton: { 
    mt: 3,
    mb: 2,
    backgroundColor: 'red',
    '&:hover': {
      backgroundColor: 'darkred',
    },
  },
};

const addDriver = (newDriver) => ({
  type: 'ADD_DRIVER',
  payload: newDriver,
});

const getNewdriverID = (newDriver) => ({
  type: 'GET_NEW_DRIVER_ID',
});

const AddEntityForm = ({ entityLabel, apiEndpoint, fields, cancelLabel, validatioNmessage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const newdriverID = useSelector(state => state.drivers.newdriverID);

  useEffect(() => {
    dispatch(getNewdriverID());
  }, [dispatch]); 

  const initialFormState = fields.reduce((acc, field) => {
    acc[field.name] = field.name === 'id' ? newdriverID : '';
    return acc;
  }, {});

  const [upForm, setUpForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const validateField = (name, value) => {
    const field = fields.find(field => field.name === name);
    let error = '';

    switch (name) {
      case 'id':
      case 'companyId':
      case 'salary':
        if (!/^\d+$/.test(value)) {
          error = `${validatioNmessage.inFildValidation} ${field.label} ${validatioNmessage.digitsValidation}`;
        }
        break;
      case 'name':
      case 'surname':
        const lettersOnly = /^[A-Za-zА-Яа-яЁё]+$/;
        if (!value.trim() || value.trim().length < 3 || !lettersOnly.test(value.trim())) {
          error = `${validatioNmessage.inFildValidation} ${field.label} ${validatioNmessage.nameValidation}`;
        }
        break;
      case 'age':
        if (!/^\d+$/.test(value) || value < 18) {
          error = `${validatioNmessage.inFildValidation} ${field.label} ${validatioNmessage.ageValidation}`;
        }
        break;
      case 'drivingExperience':
        if (!/^\d+$/.test(value)|| (value < 0 || (upForm.age - value) < 18)) {
          error = `${validatioNmessage.inFildValidation} ${field.label} ${validatioNmessage.drivingExperienceValidation}`;
        }
        break;
      case 'cars':
        if (!value.trim() || value.trim().length < 3) {
          error = `${validatioNmessage.inFildValidation} ${field.label} ${validatioNmessage.carsValidation}`;
        }
        break;
      default:
        break;
    }

    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    return error;
  };

  const changeUpForm = event => {
    const { name, value } = event.target;
    setUpForm(prevForm => ({ ...prevForm, [name]: value }));
    validateField(name, value);
  };

  const isFormValid = () => {
    const isAnyFieldEmpty = Object.values(upForm).some(value => value === '');
    const areAllErrorsEmpty = Object.values(errors).every(error => !error);
    return !isAnyFieldEmpty && areAllErrorsEmpty;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isFormValid()) {
      try {
        const response = await axios.post(apiEndpoint, { ...upForm });
        dispatch(addDriver(response.data));
        setUpForm(initialFormState);
      } catch (err) {
        console.error('An error occurred:', err);
        dispatch(addDriver(upForm)); 
        setUpForm(initialFormState);
      }
    } else {
      setOpen(true);
      setMessage('Please correct the errors before submitting.');
      setSeverity('error');
    }
  };

  const handleCancel = () => {
    navigate('/drivers');
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs" style={styles.container}>
      <CssBaseline />
      <Box component="form" noValidate onSubmit={handleSubmit} sx={styles.form}>
        <Typography component="h1" variant="h5">
          {entityLabel}
        </Typography>
        <Grid container spacing={2}>
          {fields.map(field => (
            <Grid item key={field.name} xs={12}>
              <TextField
                autoComplete={field.name}
                error={!!errors[field.name]}
                fullWidth
                helperText={errors[field.name]}
                id={field.name}
                label={field.label}
                name={field.name}
                onChange={changeUpForm}
                required={field.required}
                value={upForm[field.name]}
                sx={field.name === 'id' ? { pointerEvents: 'none' } : undefined}
              />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              sx={styles.cancelButton}
              onClick={handleCancel}
            >
              {cancelLabel}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              disabled={!isFormValid()}
              fullWidth
              type="submit"
              variant="contained"
              sx={styles.submitButton}
            >
              {entityLabel}
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddEntityForm;
