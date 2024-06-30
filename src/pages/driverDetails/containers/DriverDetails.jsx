import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Typography from 'components/Typography';
import AddEntityForm from 'components/AddEntityForm';
import RevisionEntityForm from 'components/RevisionEntityForm/RevisionEntityForm';
import EditEntityForm from 'components/EditEntityForm';

function DriverDetails() {
  const { formatMessage } = useIntl();
  const { id } = useParams();
  const { isRead, isEdd, isEdit } = useSelector(state => ({
    isRead: state.drivers.isRead,
    isEdd: state.drivers.isEdd,
    isEdit: state.drivers.isEdit,
  }));
  const [component, setComponent] = useState(null);

  const fields = [
    { name: 'name', label: formatMessage({ id: 'name' }), required: true },
    { name: 'surname', label: formatMessage({ id: 'surname' }), required: true },
    { name: 'companyId', label: formatMessage({ id: 'companyId' }), required: true },
    { name: 'age', label: formatMessage({ id: 'age' }), required: true },
    { name: 'drivingExperience', label: formatMessage({ id: 'drivingExperience' }) },
    { name: 'salary', label: formatMessage({ id: 'salary' }), required: true },
    { name: 'cars', label: formatMessage({ id: 'cars' }), required: true },
  ];

  const validationMessage = {
    inFieldValidation: formatMessage({ id: 'inFieldValidation' }),
    digitsValidation: formatMessage({ id: 'digitsValidation' }),
    nameValidation: formatMessage({ id: 'nameValidation' }),
    ageValidation: formatMessage({ id: 'ageValidation' }),
    drivingExperienceValidation: formatMessage({ id: 'drivingExperienceValidation' }),
    carsValidation: formatMessage({ id: 'carsValidation' }),
  };
  const serverUrl = 'https://load-balancer-try-2-1553176268.eu-north-1.elb.amazonaws.com';

  useEffect(() => {
    const index = Number(id);
    const apiEndpoint = `${serverUrl}/api/taxi-driver`;
    const formProps = {
      index,
      apiEndpoint,
      fields,
      validationMessage,
    };

    if (isRead && !isEdd && !isEdit) {
      setComponent(
        <RevisionEntityForm
          apiEndpoint
          {...formProps}
          entityLabel={formatMessage({ id: 'revisionLabel' })}
          buttonLabel={formatMessage({ id: 'revisionbuttonLabel' })}
        />
      );
    } else if (isRead && isEdd) {
      setComponent(
        <AddEntityForm
          apiEndpoint
          {...formProps}
          entityLabel={formatMessage({ id: 'addLabel' })}
          cancelLabel={formatMessage({ id: 'cancelLabel' })}
        />
      );
    } else if (isEdit) {
      setComponent(
        <EditEntityForm
          apiEndpoint
          {...formProps}
          entityLabel={formatMessage({ id: 'labelEdit' })}
          cancelLabel={formatMessage({ id: 'cancelLabel' })}
        />
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRead, isEdd, isEdit, formatMessage, id]);

  return (
    <Typography>
      {component}
    </Typography>
  );
}

export default DriverDetails;
