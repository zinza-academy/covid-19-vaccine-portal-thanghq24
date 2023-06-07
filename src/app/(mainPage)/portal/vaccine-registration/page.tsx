'use client';

import { Button, Stack, Step, StepLabel, Stepper } from '@mui/material';
import ConfirmStep from '@src/components/portal/vaccine-registration/ConfirmStep';
import PageTitle from '@src/components/portal/PageTitle';
import PersonalInfoStep from '@src/components/portal/vaccine-registration/PersonalInfoStep';
import ResultStep from '@src/components/portal/vaccine-registration/ResultStep';
import { useRouter } from 'next/navigation';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';

const STEPS = [
  {
    key: 0,
    label: 'Thông tin cá nhân'
  },
  {
    key: 1,
    label: 'Phiếu đồng ý tiêm'
  },
  {
    key: 2,
    label: 'Hoàn thành'
  }
];

export type AvailableSteps = 0 | 1 | 2;

export interface FormStepProps {
  step: AvailableSteps;
  setStep: Dispatch<SetStateAction<AvailableSteps>>;
}

const FormStepper: FC<FormStepProps> = ({ step, setStep }) => {
  return (
    <Stepper activeStep={step} alternativeLabel sx={{ pb: 4 }}>
      {STEPS.map((step, index) => (
        <Step key={step.key}>
          <StepLabel>{step.label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

const VaccineRegistration: FC = () => {
  const router = useRouter();
  const [step, setStep] = useState<AvailableSteps>(0);

  const renderStepForm = () => {
    switch (step) {
      case 0: {
        return <PersonalInfoStep setStep={setStep} step={step} />;
      }
      case 1: {
        return <ConfirmStep setStep={setStep} step={step} />;
      }
      case 2: {
        return <ResultStep />;
      }
      default: {
        break;
      }
    }
  };
  return (
    <Stack spacing={4} py={4}>
      <PageTitle title="Đăng ký tiêm chủng cá nhân" />
      <FormStepper step={step} setStep={setStep} />
      {renderStepForm()}
    </Stack>
  );
};

export default VaccineRegistration;
