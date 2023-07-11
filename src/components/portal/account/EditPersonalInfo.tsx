'use client';

import { Button, Grid, Stack, Typography } from '@mui/material';
import TextInput from '@src/components/sharedComponents/TextInput';
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useProvinces from '@src/hooks/useProvinces';
import dayjs from 'dayjs';
import DateInput from '@src/components/sharedComponents/DateInput';
import SelectInput from '@src/components/sharedComponents/SelectInput';
import { useAppDispatch, useAppSelector } from '@src/hooks/reduxHook';
import { editAccount } from '@src/redux/userSlice';
import { selectUserData } from '@src/redux/userSlice';
import useEditAccount from '@src/api/account/edit';
import { getISODate } from '@src/utils/getISODate';
import { toast } from 'react-toastify';
import axios from 'axios';

export interface PersonalInfoFormData {
  citizenIdentification: string;
  healthInsuranceNumber: string;
  fullName: string;
  email: string;
  dob: string | number | Date | dayjs.Dayjs | null | undefined;
  gender: string;
  province: number | string;
  district: number | string;
  ward: number | string;
}

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

  const [loading, setLoading] = useState(false);
  const [prevProvince, setPrevProvince] = useState<string | number | undefined>(
    userData.ward?.district.provinceId
  );
  const [prevDistrict, setPrevDistrict] = useState<string | number | undefined>(
    userData.ward?.districtId
  );

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    reset,
    formState: { isDirty, isValid, errors }
  } = useForm<PersonalInfoFormData>({
    mode: 'onChange',
    defaultValues: {
      citizenIdentification: userData.citizenIdentification,
      fullName: userData.fullName,
      email: userData.email,
      healthInsuranceNumber: userData.healthInsuranceNumber,
      dob: dayjs(userData.dob),
      gender: userData.gender ? userData.gender : '',
      province: userData.ward?.district.provinceId,
      district: userData.ward?.districtId,
      ward: userData.ward?.id
    },
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    reset({
      citizenIdentification: userData.citizenIdentification,
      fullName: userData.fullName,
      email: userData.email,
      healthInsuranceNumber: userData.healthInsuranceNumber,
      dob: dayjs(userData.dob),
      gender: userData.gender ? userData.gender : '',
      province: userData.ward?.district.provinceId,
      district: userData.ward?.districtId,
      ward: userData.ward?.id
    });
  }, [userData, reset]);

  const { provinceSelections, districtSelections, wardSelections } =
    useProvinces(getValues('province'), getValues('district'));

  const watchProvince = watch('province');
  const watchDistrict = watch('district');

  useEffect(() => {
    if (watchProvince !== prevProvince) {
      setValue('district', '', {
        shouldValidate: true
      });
      setValue('ward', '', {
        shouldValidate: true
      });
      setPrevProvince(watchProvince);
    }
  }, [watchProvince, setValue, prevProvince, setPrevProvince]);

  useEffect(() => {
    if (watchDistrict !== prevDistrict) {
      setValue('ward', '', {
        shouldValidate: true
      });
      setPrevDistrict(watchDistrict);
    }
  }, [watchDistrict, setValue, prevDistrict, setPrevDistrict]);

  const editAccountMutation = useEditAccount();

  const onSubmitPersonalInfo = async (formData: PersonalInfoFormData) => {
    if (!userData.id) return;

    try {
      setLoading(true);

      const newUserData = await editAccountMutation.mutateAsync({
        userId: userData.id,
        formData: {
          citizenIdentification: Number(formData.citizenIdentification),
          fullName: formData.fullName,
          email: formData.email,
          healthInsuranceNumber: formData.healthInsuranceNumber,
          dob: getISODate(formData.dob),
          gender: formData.gender,
          ward: Number(formData.ward)
        }
      });

      dispatch(editAccount(newUserData));

      toast.success('Chỉnh sửa thông tin tài khoản thành công!');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ERR_NETWORK') toast.error('Lỗi mạng!');
        else if (error?.response?.status === 409)
          toast.error('Email đã được sử dụng!');
        else toast.error('Chỉnh sửa thông tin tài khoản thất bại!');
      } else {
        toast.error('Có lỗi xảy ra!');
      }
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = !isDirty || !isValid || loading;

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
        <Grid item xs={3}>
          <TextInput
            name="healthInsuranceNumber"
            control={control}
            label="Số thẻ BHYT"
            placeholder="Số thẻ BHYT"
            errorMessage="Nhóm ưu tiên không được bỏ trống và được nhập đúng đinh dạng"
            required
          />
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={3}>
          <TextInput
            control={control}
            name="email"
            label="Email"
            placeholder="Email"
            errorMessage="Email không được bỏ trống và phải đúng định dạng"
            required
          />
        </Grid>
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
        <Button type="submit" variant="contained" disabled={isDisabled}>
          Lưu
        </Button>
      </Stack>
    </Stack>
  );
};

export default EditPersonalInfo;
