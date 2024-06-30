import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

export const useDeleteEntity = (
  apiEndpoint,
  setData,
  data,
  deleteSuccessMessage,
  deleteErrorMessage
) => {
  const navigate = useNavigate(); 
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [entityToDelete, setEntityToDelete] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: '' });

  const handleDeleteClick = (id) => {
    setEntityToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${apiEndpoint}/${entityToDelete}`);
      setData(data.filter((item) => item.id !== entityToDelete));
      setNotification({ open: true, message: deleteSuccessMessage, severity: 'success' });
    } catch (err) {
      setNotification({ open: true, message: deleteErrorMessage, severity: 'error' });
    }
    navigate(0);
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  return {
    deleteDialogOpen,
    notification,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    setNotification,
  };
};
