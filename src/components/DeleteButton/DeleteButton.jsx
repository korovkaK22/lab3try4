import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

export default function DeleteButton({ onClick }) {
  return (
    <Tooltip title="Delete">
      <IconButton onClick={onClick} size="small">
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
}
