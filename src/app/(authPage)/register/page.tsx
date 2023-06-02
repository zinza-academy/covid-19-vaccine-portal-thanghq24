'use client';
import {
  Button,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  Typography
} from '@mui/material';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextInput from '@components/sharedComponents/TextInput';
import { useRouter } from 'next/navigation';
import DateInput from '@src/components/sharedComponents/DateInput';
import SelectInput from '@src/components/sharedComponents/SelectInput';
import useProvinces from '@src/hooks/useProvinces';
import dayjs from 'dayjs';

interface FormData {
  citizenIdentification: string;
  email: string;
  password: string;
  fullName: string;
  dob: Date | null;
  gender: string | null;
  province: string;
  district: string;
  ward: string;
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
    email: yup.string().email().required(),
    password: yup.string().trim().min(8).required(),
    fullName: yup.string().required(),
    dob: yup.date().max(dayjs().subtract(5, 'year').toDate()).required(),
    gender: yup.string().max(1).required(),
    province: yup.string().required(),
    district: yup.string().required(),
    ward: yup.string().required()
  })
  .required();

const defaultValues = {
  citizenIdentification: '',
  email: '',
  password: '',
  fullName: '',
  dob: null,
  gender: '',
  province: '',
  district: '',
  ward: ''
};

const Register: FC = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    getValues,
    watch,
    formState: { isDirty, isValid }
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: defaultValues,
    resolver: yupResolver(schema)
  });
  const { provinceSelections, districtSelections, wardSelections } =
    useProvinces(getValues('province'), getValues('district'));
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(true);

  //watch updates of province and district to trigger api call to provinceAPI
  watch('province');
  watch('district');

  const onSubmit = (data: FormData) => {
    setLoading(true);
    let formData = data;
    setTimeout(() => {
      alert(
        success
          ? 'trying to log in with this data: ' +
              JSON.stringify({
                ...formData,
                dob:
                  formData.dob !== null
                    ? new Date(formData.dob).toLocaleDateString('en-GB')
                    : null
              })
          : 'Có lỗi xảy ra'
      );
      setLoading(false);
      success ? goToHomePage() : null;
    }, 2000);
  };

  const canSubmit = !isValid || !isDirty || loading;

  const goToHomePage = () => {
    router.push('/');
  };

  const toggleSuccess = () => {
    setSuccess((prev) => !prev);
  };

  return (
    <Stack
      spacing={3}
      component="form"
      width={400}
      onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" fontWeight="700" align="center">
        Đăng ký tài khoản
      </Typography>
      <TextInput
        control={control}
        name="citizenIdentification"
        label="Số CMND/CCCD"
        placeholder="Số CMND/CCCD"
        errorMessage="Số CMND/CCCD không được bỏ trống, phải là số, độ dài chuẩn (9 hoặc 12)"
        required
      />
      <TextInput
        control={control}
        name="email"
        label="Email"
        placeholder="Email"
        errorMessage="Email không được bỏ trống và phải đúng định dạng"
        required
      />
      <TextInput
        control={control}
        name="password"
        label="Mật khẩu"
        placeholder="Mật khẩu"
        errorMessage="Mật khẩu không được bỏ trống"
        type="password"
        required
      />
      <TextInput
        control={control}
        name="fullName"
        label="Họ và tên"
        placeholder="Họ và tên"
        errorMessage="Họ và tên không được bỏ trống"
        required
      />
      <DateInput
        control={control}
        name="dob"
        errorMessage="Ngày sinh không được bỏ trống và hợp lý"
        disableFuture={true}
        label="Ngày sinh"
        placeholder="Ngày/Tháng/Năm"
        required
      />
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
      <Stack direction="row" justifyContent="end">
        <Button variant="text" type="submit" disabled={canSubmit}>
          Tiếp tục
        </Button>
      </Stack>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch defaultChecked value={success} onChange={toggleSuccess} />
          }
          label="Fake API Call Success?"
        />
      </FormGroup>
    </Stack>
  );
};

export default Register;
