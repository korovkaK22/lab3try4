import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import DataTable from 'components/DataTable';
import ConfirmDeleteDialog from 'components/ConfirmDeleteDialog';
import { useDeleteEntity } from 'misc/hooks/useDeleteEntity';
import { useFetchData } from 'misc/hooks/useFetchData';
import FilterMenu from 'components/FilterMenu/FilterMenu';
import Pagination from '@mui/material/Pagination';
import AddDriverButton from 'components/AddDriverButton';
import { useDispatch } from 'react-redux';

export default function FetchDataTable({
  apiEndpoint,
  columns,
  tableLabel,
  navigateParams,
  allowMockDataDeletion = false,
  dialogTitle,
  dialogContentText,
  cancelButtonText,
  confirmButtonText,
  deleteSuccessMessage,
  deleteErrorMessage,
  filterMenuText,
  buttonText,
  drivingExperienceLabel,
  nameLabel,
  addDriverButtonText,
  itemsPerPage = 5
}) {
  const [filters, setFilters] = useState({ experience: 0, name: '' });
  const [savedFilters, setSavedFilters] = useState({});
  const { data, setData, error } = useFetchData(apiEndpoint, true);
  const [hoveredRow, setHoveredRow] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem('paginationPage');
    return savedPage ? parseInt(savedPage) : 1;
  });

  const {
    deleteDialogOpen,
    notification,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    setNotification,
  } = useDeleteEntity(apiEndpoint, allowMockDataDeletion, setData, data, deleteSuccessMessage, deleteErrorMessage);

  useEffect(() => {
    const savedFiltersString = localStorage.getItem('savedFilters');
    if (savedFiltersString) {
      const savedFilters = JSON.parse(savedFiltersString);
      setSavedFilters(savedFilters);
      setFilters(savedFilters);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('savedFilters', JSON.stringify(filters));
  }, [filters]);

  useEffect(() => {
    setFilters(savedFilters);
  }, [savedFilters]);

  useEffect(() => {
    localStorage.setItem('paginationPage', currentPage.toString());
  }, [currentPage]);

  const handleRowClick = (id) => {
    dispatch({ type: 'SET_IS_READ_TRUE' });
    dispatch({ type: 'SET_IS_EDIT_FALSE' });
    dispatch({ type: 'SET_IS_EDD_FALSE' });
    navigate(`${navigateParams}${id}`);

  };

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };
  
  const filterData = (data) => {
    return data
      .filter(item => 
        (filters.drivingExperience ? item.drivingExperience >= filters.drivingExperience : true) &&
        (filters.name ? item.name.toLowerCase().startsWith(filters.name.toLowerCase()) : true)
      );
  };

  const filteredData = filterData(data);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Box>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          {tableLabel}
        </Typography>
        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}
          <Box display="flex" justifyContent="flex-end" mb={2}>
              <AddDriverButton addDriverButtonText={addDriverButtonText} />
              <FilterMenu
              applyFilters={applyFilters}
              savedFilters={savedFilters}
              filterMenuText={filterMenuText}
              buttonText={buttonText}
              drivingExperienceLabel={drivingExperienceLabel}
              nameLabel={nameLabel}
            />
            </Box>
        <DataTable
          data={currentItems}
          columns={columns}
          handleRowClick={handleRowClick}
          handleDeleteClick={handleDeleteClick}
          hoveredRow={hoveredRow}
          setHoveredRow={setHoveredRow}
        />
        <ConfirmDeleteDialog
          open={deleteDialogOpen}
          dialogTitle={dialogTitle}
          dialogContentText={dialogContentText}
          cancelButtonText={cancelButtonText}
          confirmButtonText={confirmButtonText}
          handleDeleteCancel={handleDeleteCancel}
          handleDeleteConfirm={handleDeleteConfirm}
        />
        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={() => setNotification({ ...notification, open: false })}
        >
          <Alert onClose={() => setNotification({ ...notification, open: false })} severity={notification.severity}>
            {notification.message}
          </Alert>
        </Snackbar>
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination count={Math.ceil(filteredData.length / itemsPerPage)} page={currentPage} onChange={(event, page) => setCurrentPage(page)} />
        </Box>
      </Box>
    </Container>
  );
}
