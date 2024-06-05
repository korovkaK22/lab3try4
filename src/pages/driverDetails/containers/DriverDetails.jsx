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
    { name: 'id', label: formatMessage({ id: 'id' }), required: true},
    { name: 'name', label: formatMessage({ id: 'name' }), required: true},
    { name: 'surname', label: formatMessage({ id: 'surname' }), required: true},
    { name: 'companyId', label: formatMessage({ id: 'companyId' }), required: true},
    { name: 'age', label: formatMessage({ id: 'age' }), required: true},
    { name: 'drivingExperience', label: formatMessage({ id: 'drivingExperience' })},
    { name: 'salary', label: formatMessage({ id: 'salary' }), required: true},
    { name: 'cars', label: formatMessage({ id: 'cars' }), required: true},
  ];

  const validatioNmessage={
    inFildValidation:formatMessage({ id: 'inFildValidation' }),
    digitsValidation: formatMessage({ id: 'digitsValidation' }),
    nameValidation:formatMessage({ id: 'nameValidation' }),
    ageValidation:formatMessage({ id: 'ageValidation' }),
    drivingExperienceValidation:formatMessage({ id: 'drivingExperienceValidation' }),
    carsValidation:formatMessage({ id: 'carsValidation' })
  }

  useEffect(() => {
    const index = Number(id) - 1;
    const apiEndpoint = "testApi";

    const formProps = {
      index,
      apiEndpoint,
      fields,
    };

    if (isRead && !isEdd && !isEdit) {
      setComponent(
        <RevisionEntityForm
          {...formProps}
          entityLabel={formatMessage({ id: 'revisionLabel' })}
          buttonLabel={formatMessage({ id: 'revisionbuttonLabel' })}
        />
      );
    } else if (isRead && isEdd) {
      setComponent(
        <AddEntityForm
          {...formProps}
          validatioNmessage = {validatioNmessage}
          entityLabel={formatMessage({ id: 'addLabel' })}
          cancelLabel={formatMessage({ id: 'cancelLabel' })}
        />
      );
    } else if (isEdit) {
      setComponent(
        <EditEntityForm
          {...formProps}
          validatioNmessage = {validatioNmessage}
          entityLabel={formatMessage({ id: 'labelEdit' })}
          cancelLabel={formatMessage({ id: 'cancelLabel' })}
        />
      );
    }
    // eslint-disable-next-line
  }, [isRead, isEdd, isEdit, formatMessage, id]);

  return (
    <Typography>
      {component}
    </Typography>
  );
}

export default DriverDetails;
