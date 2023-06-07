'use client';

import { Button, Grid, Stack, Typography } from '@mui/material';
import TextInput from '@src/components/sharedComponents/TextInput';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useProvinces from '@src/hooks/useProvinces';
import dayjs from 'dayjs';
import DateInput from '@src/components/sharedComponents/DateInput';
import SelectInput from '@src/components/sharedComponents/SelectInput';
import { useAppDispatch, useAppSelector } from '@src/hooks/reduxHook';
import { PersonalInfoFormData, updateUserData } from '@src/redux/userSlice';
import { selectUserData } from '@src/redux/userSlice';

const schema = yup
  .object()
  .shape({
    citizenIdentification: yup
      .string()
      .matches(/^[0-9]+$/)
      .test(
        'check ID length',
        'ID length must be 9 or 12',
        (value) => value?.length === 9 || value?.length === 12
      ),
    fullName: yup.string().required(),
    dob: yup.date().max(dayjs().subtract(5, 'year').toDate()).required(),
    gender: yup.string().max(1).required(),
    province: yup.string().required(),
    district: yup.string().required(),
    ward: yup.string().required()
  })
  .required();

const EditPersonalInfo: FC = () => {
  const userData = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    getValues,
    watch,
    reset,
    formState: { isDirty, isValid }
  } = useForm<PersonalInfoFormData>({
    mode: 'onChange',
    defaultValues: {
      citizenIdentification: userData.citizenIdentification,
      fullName: userData.fullName,
      dob: dayjs(userData.dob),
      gender: userData.gender,
      province: userData.province,
      district: userData.district,
      ward: userData.ward
    },
    resolver: yupResolver(schema)
  });
  const { provinceSelections, districtSelections, wardSelections } =
    useProvinces(getValues('province'), getValues('district'));

  //watch updates of province and district to trigger api call to provinceAPI
  watch('province');
  watch('district');

  const onSubmitPersonalInfo = (data: PersonalInfoFormData) => {
    dispatch(updateUserData(data));
  };

  const canSubmit = !isDirty || !isValid;

  return (
    <Stack
      component="form"
      spacing={2}
      onSubmit={handleSubmit(onSubmitPersonalInfo)}>
      <Typography component="p" variant="body1" fontWeight={600}>
        Thông tin cá nhân
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextInput
            control={control}
            name="citizenIdentification"
            label="Số CMND/CCCD"
            placeholder="Số CMND/CCCD"
            errorMessage="Số CMND/CCCD không được bỏ trống, phải là số, độ dài chuẩn (9 hoặc 12)"
            required
          />
        </Grid>
        <Grid item xs={9}></Grid>
        <Grid item xs={3}>
          <TextInput
            control={control}
            name="fullName"
            label="Họ và tên"
            placeholder="Họ và tên"
            errorMessage="Họ và tên không được bỏ trống"
            required
          />
        </Grid>
        <Grid item xs={3}>
          <DateInput
            control={control}
            name="dob"
            errorMessage="Ngày sinh không được bỏ trống và hợp lý"
            disableFuture={true}
            label="Ngày sinh"
            placeholder="Ngày/Tháng/Năm"
            required
          />
        </Grid>
        <Grid item xs={3}>
          <SelectInput
            control={control}
            errorMessage="Giới tính không được bỏ trống"
            label="Giới tính"
            name="gender"
            selections={[
              { value: 'M', label: 'Nam' },
              { value: 'F', label: 'Nữ' }
            ]}
            defaultValue=""
            placeholder="Giới tính"
            required
          />
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
          <SelectInput
            control={control}
            errorMessage="Tỉnh/Thành phố không được bỏ trống"
            label="Tỉnh/Thành phố"
            name="province"
            selections={provinceSelections()}
            defaultValue=""
            placeholder="Tỉnh/Thành phố"
            required
          />
        </Grid>
        <Grid item xs={3}>
          <SelectInput
            control={control}
            errorMessage="Quận/Huyện không được bỏ trống"
            label="Quận/Huyện"
            name="district"
            selections={districtSelections()}
            defaultValue=""
            placeholder="Quận/Huyện"
            required
          />
        </Grid>
        <Grid item xs={3}>
          <SelectInput
            control={control}
            errorMessage="Xã/Phường không được bỏ trống"
            label="Xã/Phường"
            name="ward"
            selections={wardSelections()}
            defaultValue=""
            placeholder="Xã/Phường"
            required
          />
        </Grid>
      </Grid>
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" disabled={!isDirty} onClick={() => reset()}>
          Hủy bỏ
        </Button>
        <Button type="submit" variant="contained" disabled={canSubmit}>
          Lưu
        </Button>
      </Stack>
    </Stack>
  );
};

export default EditPersonalInfo;
