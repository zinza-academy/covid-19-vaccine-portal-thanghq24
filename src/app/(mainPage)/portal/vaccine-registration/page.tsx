'use client';

import { Stack, Step, StepLabel, Stepper } from '@mui/material';
import ConfirmStep from '@src/components/portal/vaccine-registration/ConfirmStep';
import PageTitle from '@src/components/portal/PageTitle';
import PersonalInfoStep from '@src/components/portal/vaccine-registration/PersonalInfoStep';
import ResultStep from '@src/components/portal/vaccine-registration/ResultStep';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import dayjs from 'dayjs';
import { VaccineRegistrationCreateResponseType } from '@src/api/vaccineRegistration/types';

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

interface VaccineRegistrationStepProps {
  step: AvailableSteps;
  setStep: Dispatch<SetStateAction<AvailableSteps>>;
}
export interface VaccineRegistrationFormStepProps
  extends VaccineRegistrationStepProps {
  vaccineRegistrationForm: UseFormReturn<VaccineRegistrationFormData, any>;
}

export interface VaccineRegistrationConfirmStepProps
  extends VaccineRegistrationFormStepProps {
  setRegisterResponse: React.Dispatch<
    React.SetStateAction<VaccineRegistrationCreateResponseType | null>
  >;
}

export interface VaccineRegistrationResultStepProps {
  registerResponse: VaccineRegistrationCreateResponseType | null;
}

export interface VaccineRegistrationFormData {
  priorityType: number | '';
  job: string;
  workplace: string;
  address: string;
  appointmentDate: string | number | Date | dayjs.Dayjs | null | undefined;
  dayPhase: string;
}

const schema = yup
  .object()
  .shape({
    priorityType: yup.number().required(),
    job: yup.string(),
    workplace: yup.string(),
    address: yup.string().trim(),
    appointmentDate: yup.date().min(dayjs().add(1, 'day').toDate()).required(),
    dayPhase: yup.string().required()
  })
  .required();

const FormStepper: FC<VaccineRegistrationStepProps> = ({ step }) => {
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
  const [step, setStep] = useState<AvailableSteps>(0);
  const [registerResponse, setRegisterResponse] =
    useState<VaccineRegistrationCreateResponseType | null>(null);

  const vaccineRegistrationForm = useForm<VaccineRegistrationFormData>({
    mode: 'onChange',
    defaultValues: {
      priorityType: '',
      job: '',
      workplace: '',
      address: '',
      appointmentDate: null,
      dayPhase: ''
    },
    resolver: yupResolver(schema)
  });

  const renderStepForm = () => {
    switch (step) {
      case 0: {
        return (
          <PersonalInfoStep
            setStep={setStep}
            step={step}
            vaccineRegistrationForm={vaccineRegistrationForm}
          />
        );
      }
      case 1: {
        return (
          <ConfirmStep
            setStep={setStep}
            step={step}
            vaccineRegistrationForm={vaccineRegistrationForm}
            setRegisterResponse={setRegisterResponse}
          />
        );
      }
      case 2: {
        return <ResultStep registerResponse={registerResponse} />;
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
