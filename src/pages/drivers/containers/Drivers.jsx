import { useIntl } from 'react-intl';
import React from 'react';
import Typography from 'components/Typography';
import FetchDataTable from 'components/FetchDataTable';


function Drivers() {
  const { formatMessage } = useIntl();
  const columns = [
    { field: 'id', headerName: `${formatMessage({ id: 'id' })}` },
    { field: 'name', headerName: `${formatMessage({ id: 'name' })}` },
    { field: 'surname', headerName: `${formatMessage({ id: 'surname' })}` },
    { field: 'drivingExperience', headerName: `${formatMessage({ id: 'drivingExperience' })}` },
    { field: 'cars', headerName: `${formatMessage({ id: 'cars' })}` },
  ]
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  return (
    <Typography>
      <FetchDataTable
        apiEndpoint= {`${serverUrl}/api/taxi-driver`}
        columns={columns}
        navigateParams='/driverDetailsID/'
        tableLabel={formatMessage({ id: 'driversTable' })}
        dialogTitle={formatMessage({ id: 'deleteConfirmation' })}
        dialogContentText={formatMessage({ id: 'deleteText' })}
        cancelButtonText={formatMessage({ id: 'cancelDelete' })}
        confirmButtonText={formatMessage({ id: 'confirmDelete' })}
        deleteSuccessMessage={formatMessage({ id: 'deleteSuccessMessage' })}
        deleteErrorMessage={formatMessage({ id: 'deleteErrorMessage' })}
        filterMenuText={formatMessage({ id: 'filterMenuText' })}
        buttonText={formatMessage({ id: 'buttonText' })}
        drivingExperienceLabel={formatMessage({ id: 'drivingExperienceLabel' })}
        nameLabel={formatMessage({ id: 'nameLabel' })}
        addDriverButtonText={formatMessage({ id: 'addDriverButtonText' })}
      />
    </Typography>
  );
}

export default Drivers;
