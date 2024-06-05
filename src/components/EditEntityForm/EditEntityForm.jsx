import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Box, TextField, Typography, Button, Grid, CssBaseline, Snackbar } from '@mui/material';
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';

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

const EditEntityForm = ({ entityLabel, fields, index, apiEndpoint, cancelLabel, validatioNmessage }) => {
  const dispatch = useDispatch();
  const selectedDriver = useSelector(state => state.drivers.selectedDriver);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [upForm, setUpForm] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (index !== undefined) {
      dispatch({
        type: 'GET_DRIVER_BY_INDEX',
        payload: index,
      });
    }
  }, [dispatch, index]);

  useEffect(() => {
    setUpForm(selectedDriver || {});
    setErrors({});
  }, [selectedDriver]);

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
        if (!/^\d+$/.test(value)&&value < 18) {
          error = `${validatioNmessage.inFildValidation} ${field.label} ${validatioNmessage.ageValidation}`;
        }
        break;
      case 'drivingExperience':
        if (!/^\d+$/.test(value)&& (value < 0 || ( (selectedDriver.age - value) < 18))) {
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

  const handleSubmit = async event => {
    event.preventDefault();
    const formIsValid = Object.values(errors).every(x => x === '');

    if (formIsValid) {
      try {
        const response = await axios.post(apiEndpoint, { ...upForm });
        dispatch({ type: 'UPDATE_DRIVER', payload: { index, data: response.data } });
        setMessage('Entity has been successfully edited.');
        setSeverity('success');
      } catch (err) {
        dispatch({ type: 'UPDATE_DRIVER', payload: { index, data: upForm } });
        setMessage('Entity has been successfully edited.');
        setSeverity('success');
        setTimeout(() => {
          dispatch({ type: 'SET_IS_READ_TRUE' });
          dispatch({ type: 'SET_IS_EDD_FALSE' });
          dispatch({ type: 'SET_IS_EDIT_FALSE' });
          setOpen(false);
        }, 1500);
      }
      setOpen(true);
    } else {
      setMessage('Please correct the errors before submitting.');
      setSeverity('error');
      setOpen(true);
    }
  };

  const handleCancel = () => {
    dispatch({ type: 'SET_IS_READ_TRUE' });
    dispatch({ type: 'SET_IS_EDD_FALSE' });
    dispatch({ type: 'SET_IS_EDIT_FALSE' });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  
  const formIsValid = Object.values(errors).every(x => x === '');

  return (
    <Container component="main" maxWidth="xs" style={styles.container}>
      <CssBaseline />
      <Box component="form" noValidate onSubmit={handleSubmit} sx={styles.form}>
        <Typography component="h1" variant="h5">
          {entityLabel}
        </Typography>
        <Grid container spacing={2}>
          {fields.map((field, fieldIndex) => (
            <Grid item key={field.name} xs={12}>
              <TextField
                autoComplete={field.name}
                autoFocus={fieldIndex === 0}
                error={!!errors[field.name]}
                fullWidth
                helperText={errors[field.name]}
                id={field.name}
                label={field.label}
                name={field.name}
                onChange={changeUpForm}
                required={field.required}
                value={upForm[field.name] || ''}
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
              disabled={!formIsValid}
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

export default EditEntityForm;
