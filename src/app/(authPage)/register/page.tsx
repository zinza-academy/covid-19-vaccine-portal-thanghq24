'use client';
import {
  Button,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  Typography
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextInput from '@components/sharedComponents/TextInput';
import { useRouter } from 'next/navigation';
import DateInput from '@src/components/sharedComponents/DateInput';
import SelectInput from '@src/components/sharedComponents/SelectInput';
import useProvinces from '@src/hooks/useProvinces';
import dayjs from 'dayjs';
import fetchAPI from '@src/utils/fetchAPI';
import { toast } from 'react-toastify';
import { getISODate } from '@src/utils/getISODate';

export interface FormData extends FieldValues {
  citizenIdentification: number | '';
  email: string;
  password: string;
  fullName: string;
  dob: string | number | Date | dayjs.Dayjs | null | undefined;
  gender: string | null;
  province: string;
  district: string;
  ward: string;
  roles: number[];
}

const schema = yup
  .object()
  .shape({
    citizenIdentification: yup
      .number()
      .min(100000000000)
      .max(999999999999)
      .required(),
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
    email: yup.string().email().required(),
    password: yup.string().trim().min(8).required(),
    fullName: yup.string().required(),
    dob: yup.date().max(dayjs().subtract(5, 'year').toDate()).required(),
    gender: yup.string().max(1).required(),
    province: yup.string().required(),
    district: yup.string().required(),
    ward: yup.string().required(),
    roles: yup.array(yup.number())
  })
  .required();

const defaultValues: FormData = {
  citizenIdentification: '',
  healthInsuranceNumber: '',
  email: '',
  password: '',
  fullName: '',
  dob: null,
  gender: '',
  province: '',
  district: '',
  ward: '',
  roles: [3]
};

const Register: FC = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
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
  const watchProvince = watch('province');
  const watchDistrict = watch('district');

  useEffect(() => {
    setValue('district', '');
    setValue('ward', '');
  }, [watchProvince]);
  useEffect(() => {
    setValue('ward', '');
  }, [watchDistrict]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    let formData = {
      ...data,
      dob: data.dob !== null ? getISODate(data.dob) : null,
      province: Number(data.province),
      district: Number(data.district),
      ward: Number(data.ward),
      roles: defaultValues.roles
    };

    console.log(formData);

    await fetchAPI('auth/sign-up', 'POST', formData)
      .then(() => {
        toast.success('Đăng ký thành công');
        router.push('/login');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Đăng ký thất bại');
        setLoading(false);
      });
  };

  const canSubmit = !isValid || !isDirty || loading;

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
        name="healthInsuranceNumber"
        control={control}
        label="Số thẻ BHYT"
        placeholder="Số thẻ BHYT"
        errorMessage="Nhóm ưu tiên không được bỏ trống và được nhập đúng đinh dạng"
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
