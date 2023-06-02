'use client';

import { Button, Stack, Step, StepLabel, Stepper } from '@mui/material';
import PageTitle from '@src/components/portal/vaccine-registration/PageTitle';
import PersonalInfoStep from '@src/components/portal/vaccine-registration/PersonalInfoStep';
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
    <Stepper activeStep={step} alternativeLabel>
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
  const goToHomepage = () => {
    router.push('/');
  };
  const stepBack = () => {
    setStep((prev) => (prev - 1) as AvailableSteps);
  };
  const stepForward = () => {
    setStep((prev) => (prev + 1) as AvailableSteps);
  };

  const renderStepForm = () => {
    switch (step) {
      case 0: {
        return <PersonalInfoStep setStep={setStep} step={step} />;
      }
      case 1: {
        break;
      }
      case 2: {
        break;
      }
      default: {
        break;
      }
    }
  };
  return (
    <Stack spacing={4} py={4}>
      <PageTitle />
      <FormStepper step={step} setStep={setStep} />
      {renderStepForm()}
      {/* <Stack direction="row" spacing={2} justifyContent="center">
        {step < 1 ? (
          <Button variant="outlined" onClick={goToHomepage}>
            Hủy bỏ
          </Button>
        ) : (
          <Button variant="outlined" onClick={stepBack}>
            Quay lại
          </Button>
        )}
        {step > 1 ? (
          <Button variant="contained" onClick={() => alert('try to submit!')}>
            Hoàn thành
          </Button>
        ) : (
          <Button variant="contained" onClick={stepForward}>
            Tiếp tục
          </Button>
        )}
      </Stack> */}
    </Stack>
  );
};

export default VaccineRegistration;
