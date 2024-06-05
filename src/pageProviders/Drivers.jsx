import DriversPage from 'pages/drivers';
import React from 'react';

import PageContainer from './components/PageContainer';

const Drivers = (props) => {
return (
    <PageContainer>
    <DriversPage {...props} />
    </PageContainer>
);
};

export default Drivers;
