import { useState } from 'react';
import axios from 'axios';
import mockDrivers from '../mocks/mockDrivers';

export const useDeleteEntity = (apiEndpoint, allowMockDataDeletion, setData, data, deleteSuccessMessage, deleteErrorMessage) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [entityToDelete, setEntityToDelete] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: '' });

  const handleDeleteClick = (id) => {
    setEntityToDelete(id);
    setDeleteDialogOpen(true);
  };

 const handleDeleteConfirm = async () => {
  try {
    if (allowMockDataDeletion || data !== mockDrivers) {
      if (data === mockDrivers || data.find(item => item.id === entityToDelete)) {
        setData(data.filter((item) => item.id !== entityToDelete));
        setNotification({ open: true, message: deleteSuccessMessage, severity: 'success' });
      } else {
        setNotification({ open: true, message: deleteErrorMessage, severity: 'error' });
      }
    } else {
      await axios.delete(`${apiEndpoint}${entityToDelete}`);
      setData(data.filter((item) => item.id !== entityToDelete));
      setNotification({ open: true, message: deleteSuccessMessage, severity: 'success' });
    }
  } catch (err) {
    setNotification({ open: true, message: deleteErrorMessage, severity: 'error' });
  }
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