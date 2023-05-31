import { Box, Button, Stack } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import SelectInput from '../sharedComponents/SelectInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useProvinces from '@src/hooks/useProvinces';
import SearchIcon from '@mui/icons-material/Search';

interface FormData {
  province: string;
  district: string;
  ward: string;
}

const schema = yup
  .object()
  .shape({
    province: yup.string(),
    district: yup.string(),
    ward: yup.string()
  })
  .required();

const defaultValues = {
  province: '',
  district: '',
  ward: ''
};

const SearchSection: FC = () => {
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

  const [loading, setLoading] = useState(false);

  const { provinceSelections, districtSelections, wardSelections } =
    useProvinces(getValues('province'), getValues('district'));
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

  const canSubmit = loading;

  const onSubmit = (data: FormData) => {
    setLoading(true);
    setTimeout(() => {
      alert('trying to log in with this data: ' + JSON.stringify(data));
      setLoading(false);
    }, 2000);
  };
  return (
    <Stack
      component="form"
      direction="row"
      spacing={2}
      onSubmit={handleSubmit(onSubmit)}>
      <Box width={260}>
        <SelectInput
          control={control}
          errorMessage="Tỉnh/Thành phố không được bỏ trống"
          // label="Tỉnh/Thành phố"
          name="province"
          selections={provinceSelections()}
          defaultValue=""
          placeholder="Tỉnh/Thành phố"
          required
          size="small"
        />
      </Box>
      <Box width={260}>
        <SelectInput
          control={control}
          errorMessage="Quận/Huyện không được bỏ trống"
          // label="Quận/Huyện"
          name="district"
          selections={districtSelections()}
          defaultValue=""
          placeholder="Quận/Huyện"
          required
          size="small"
        />
      </Box>
      <Box width={260}>
        <SelectInput
          control={control}
          errorMessage="Xã/Phường không được bỏ trống"
          // label="Xã/Phường"
          name="ward"
          selections={wardSelections()}
          defaultValue=""
          placeholder="Xã/Phường"
          required
          size="small"
        />
      </Box>
      <Box>
        <Button
          type="submit"
          variant="contained"
          disabled={canSubmit}
          endIcon={<SearchIcon />}>
          Tiếp tục
        </Button>
      </Box>
    </Stack>
  );
};

export default SearchSection;
