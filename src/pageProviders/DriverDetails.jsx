import DriverDetailsPage from 'pages/driverDetails';
import React from 'react';

import PageContainer from './components/PageContainer';

const DriverDetails = (props) => {
return (
    <PageContainer>
    <DriverDetailsPage {...props} />
    </PageContainer>
);
};

export default DriverDetails;
