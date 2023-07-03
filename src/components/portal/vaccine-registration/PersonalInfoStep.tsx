import React, { FC, useState } from 'react';
import { useAppSelector } from '@src/hooks/reduxHook';
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import SelectInput from '@src/components/sharedComponents/SelectInput';
import priorityType from '@src/utils/constants/priorityType';
import jobs from '@src/utils/constants/jobs';
import notes from '@src/utils/constants/vaccinationRegisterNotes';
import TextInput from '@src/components/sharedComponents/TextInput';
import { red } from '@mui/material/colors';
import {
  AvailableSteps,
  VaccineRegistrationFormData,
  VaccineRegistrationFormStepProps
} from '@src/app/(mainPage)/portal/vaccine-registration/page';
import DateInput from '@src/components/sharedComponents/DateInput';
import dayPhases from '@src/utils/constants/dayPhases';
import { selectUserData } from '@src/redux/userSlice';
import { toast } from 'react-toastify';
import Link from 'next/link';

const PersonalInfoStep: FC<VaccineRegistrationFormStepProps> = ({
  setStep,
  vaccineRegistrationForm
}) => {
  const userData = useAppSelector(selectUserData);

  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isValid }
  } = vaccineRegistrationForm;

  const isDisabled = loading || !isValid;

  const onSubmit = (data: VaccineRegistrationFormData) => {
    try {
      setLoading(true);
      toast.success('Thông tin đăng ký đã được lưu!');
      stepForward();
    } catch (error) {
      toast.error('Có lỗi xảy ra!');
    } finally {
      setLoading(false);
    }
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
          <Typography mb={1}>Số thẻ BHYT</Typography>
          <TextField
            fullWidth
            defaultValue={userData.healthInsuranceNumber}
            disabled
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
        <Link href="/">
          <Button variant="outlined">Hủy bỏ</Button>
        </Link>
        <Button type="submit" variant="contained" disabled={isDisabled}>
          Tiếp tục
        </Button>
      </Stack>
    </Stack>
  );
};

export default PersonalInfoStep;
