import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Typography, Button, Grid, CssBaseline, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const styles = {
  container: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  navigateButton: {
    mt: 3,
    mb: 2,
  },
  editButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  disabledInput: {
    pointerEvents: 'none',
  },
};

const processResponseData = (data) => {
  const orderedData = {
    name: data.name || '',
    surname: data.surname || '',
    companyId: data.companyId || '',
    age: data.age || '',
    drivingExperience: data.drivingExperience || '',
    salary: data.salary || '',
    cars: data.cars || ''
  };

  return orderedData;
};

const RevisionEntityForm = ({ entityLabel, fields = [], index, apiEndpoint, buttonLabel }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [entityData, setEntityData] = useState({});
  const selectedDriver = useSelector(state => state.drivers.selectedDriver);

  useEffect(() => {
    if (index !== undefined) {
      dispatch({
        type: 'GET_DRIVER_BY_INDEX',
        payload: index,
      });

      const fetchData = async () => {
        try {
          const response = await axios.get(`${apiEndpoint}/${index}`);
          const orderedData = processResponseData(response);
          setEntityData(orderedData);
        } catch (error) {
          console.error('Помилка при отриманні даних:', error);
          setEntityData(processResponseData(selectedDriver));
        }
      };

      fetchData();
    }
  }, [dispatch, index, selectedDriver, apiEndpoint]);

  const handleEditClick = () => {
    dispatch({ type: 'SET_IS_READ_FALSE' });
    dispatch({ type: 'SET_IS_EDD_FALSE' });
    dispatch({ type: 'SET_IS_EDIT_TRUE' });
  };

  return (
    <Container component="main" maxWidth="xs" style={styles.container}>
      <CssBaseline />
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography component="h1" variant="h5">
            {entityLabel}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={handleEditClick} color="secondary" style={{ alignSelf: 'flex-end' }}>
            <EditIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {fields.length > 0 && fields.map((field, fieldIndex) => (
          <Grid item key={field.name} xs={12}>
            <TextField
              style={styles.disabledInput}
              autoComplete={field.name}
              autoFocus={fieldIndex === 0}
              fullWidth
              id={field.name}
              label={field.label}
              name={field.name}
              value={entityData[field.name] || ''}
              onChange={(e) => setEntityData({ ...entityData, [field.name]: e.target.value })}
            />
          </Grid>
        ))}
      </Grid>
      <Button
        fullWidth
        variant="contained"
        sx={styles.navigateButton}
        onClick={() => navigate('/drivers')}
      >
        {buttonLabel}
      </Button>
    </Container>
  );
};

export default RevisionEntityForm;
