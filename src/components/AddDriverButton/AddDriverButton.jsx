import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const AddDriverButton = ({ addDriverButtonText, navigatePath = '/driverDetailsAdd/add' }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddDriverClick = () => {
    dispatch({ type: 'SET_IS_READ_TRUE' });
    dispatch({ type: 'SET_IS_EDD_TRUE' });
    dispatch({ type: 'SET_IS_EDIT_FALSE' });
    navigate(navigatePath);
  };

  return (
    <Button variant="contained" color="primary" onClick={handleAddDriverClick}>
      {addDriverButtonText}
    </Button>
  );
};

export default AddDriverButton;
