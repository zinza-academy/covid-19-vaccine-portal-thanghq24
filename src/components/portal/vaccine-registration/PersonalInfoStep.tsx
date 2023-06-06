import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@src/hooks/reduxHook';
import {
  FormData,
  selectVaccineRegistrationFormData,
  submitFormData
} from '@src/redux/vaccineRegistrationSlice';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SelectInput from '@src/components/sharedComponents/SelectInput';
import priorityType from '@src/utils/constants/priorityType';
import jobs from '@src/utils/constants/jobs';
import notes from '@src/utils/constants/vaccinationRegisterNotes';
import TextInput from '@src/components/sharedComponents/TextInput';
import { red } from '@mui/material/colors';
import {
  AvailableSteps,
  FormStepProps
} from '@src/app/(mainPage)/portal/vaccine-registration/page';
import { useRouter } from 'next/navigation';
import DateInput from '@src/components/sharedComponents/DateInput';
import dayPhases from '@src/utils/constants/dayPhases';
import dayjs from 'dayjs';

const schema = yup
  .object()
  .shape({
    priorityType: yup.number().required(),
    // healthInsuranceNumber must be a string with 15 characters and first 2 chars are letters, the rest is number
    healthInsuranceNumber: yup
      .string()
      .trim()
      .length(15)
      .uppercase()
      .test('health-insurance-number-check', (value) => {
        let checkFirstTwoChars = yup
          .string()
          .matches(/^[A-Z]+$/) //?
          .isValid(value?.slice(0, 2));
        let checkLastThirteenNums = yup
          .string()
          .length(13)
          .matches(/[^0-9]/);
        if (!checkFirstTwoChars) return false;
        if (!checkLastThirteenNums) return false;
        return true;
      })
      .required(),
    job: yup.string(),
    workplace: yup.string(),
    address: yup.string().trim(),
    appointmentDate: yup.date().min(dayjs().add(1, 'day').toDate()).required(),
    dayPhase: yup.string().required()
  })
  .required();

const PersonalInfoStep: FC<FormStepProps> = ({ setStep }) => {
  const router = useRouter();
  const currentFormData = useAppSelector(selectVaccineRegistrationFormData);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid }
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      ...currentFormData,
      appointmentDate: dayjs(currentFormData.appointmentDate)
    },
    resolver: yupResolver(schema)
  });

  const canSubmit = !isDirty || !isValid;

  const onSubmit = (data: FormData) => {
    dispatch(submitFormData(data));
    stepForward();
  };

  const goToHomepage = () => {
    router.push('/');
  };
  const stepForward = () => {
    setStep((prev) => (prev + 1) as AvailableSteps);
  };

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2}>
      <Typography variant="body1" fontWeight={600}>
        1. Thông tin người đăng ký tiêm
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <SelectInput
            name="priorityType"
            control={control}
            label="Nhóm ưu tiên"
            placeholder="Nhóm ưu tiên"
            errorMessage="Nhóm ưu tiên không được bỏ trống"
            selections={priorityType}
            required
          />
        </Grid>
        <Grid item xs={4}>
          <TextInput
            name="healthInsuranceNumber"
            control={control}
            label="Số thẻ BHYT"
            placeholder="Số thẻ BHYT"
            errorMessage="Nhóm ưu tiên không được bỏ trống và được nhập đúng đinh dạng"
            required
          />
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <SelectInput
            name="job"
            control={control}
            label="Nghề nghiệp"
            placeholder="Nghề nghiệp"
            selections={jobs}
          />
        </Grid>
        <Grid item xs={4}>
          <TextInput
            name="workplace"
            control={control}
            label="Đơn vị công tác"
            placeholder="Đơn vị công tác"
          />
        </Grid>
        <Grid item xs={4}>
          <TextInput
            name="address"
            control={control}
            label="Địa chỉ hiện tại"
            placeholder="Địa chỉ hiện tại"
          />
        </Grid>
      </Grid>
      <Typography variant="body1" fontWeight={600}>
        2. Thông tin đăng ký tiêm chủng
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <DateInput
            control={control}
            name="appointmentDate"
            label="Ngày muốn được tiêm (dự kiến)"
            placeholder="Ngày/Tháng/Năm"
            errorMessage="Ngày muốn được tiêm không được bỏ trống và hợp lý"
            disablePast
            required
          />
        </Grid>
        <Grid item xs={4}>
          <SelectInput
            name="dayPhase"
            control={control}
            label="Buổi tiêm mong muốn"
            placeholder="Buổi tiêm mong muốn"
            errorMessage="Buổi tiêm mong muốn không được bỏ trống"
            selections={dayPhases}
            required
          />
        </Grid>
      </Grid>
      <Stack spacing={2} sx={{ color: red[600] }}>
        <Typography>{`Lưu ý:`}</Typography>
        <Stack>
          {notes.map((note, index) => (
            <Typography key={index} component="li">
              {note}
            </Typography>
          ))}
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Button variant="outlined" onClick={goToHomepage}>
          Hủy bỏ
        </Button>
        <Button type="submit" variant="contained" disabled={canSubmit}>
          Tiếp tục
        </Button>
      </Stack>
    </Stack>
  );
};

export default PersonalInfoStep;
