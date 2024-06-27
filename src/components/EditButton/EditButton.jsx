import React from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

const EditButton = ({ onEdit }) => {
  return (
    <IconButton onClick={onEdit} style={{ position: 'absolute', top: 0, right: 0 }}>
      <EditIcon />
    </IconButton>
  );
};

export default EditButton;
