import React from 'react';
import { useAppDispatch, useAppSelector } from '@src/hooks/reduxHook';
import {
  selectVaccineRegistrationFormData,
  test
} from '@src/redux/vaccineRegistrationSlice';
import { Button } from '@mui/material';

const PersonalInfoStep = () => {
  const dispatch = useAppDispatch();

  const currentFormData = useAppSelector(selectVaccineRegistrationFormData);
  const testAction = () => {
    dispatch(test({ job: 'teacher' }));
  };

  return (
    <div>
      PersonalInfoStep
      {JSON.stringify(currentFormData)}
      <Button onClick={() => testAction()}>Test action</Button>
    </div>
  );
};

export default PersonalInfoStep;
