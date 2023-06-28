import { Box, Button, Stack } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import SelectInput from '@components/sharedComponents/SelectInput';
import { UseFormReturn, useForm } from 'react-hook-form';
import useProvinces from '@src/hooks/useProvinces';
import SearchIcon from '@mui/icons-material/Search';
import useFindVaccinationPoint, {
  VaccinationPointFindQueryType
} from '@src/api/vaccinationPoint/find';
import { toast } from 'react-toastify';
import TextInput from '@src/components/sharedComponents/TextInput';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface VaccinationPointSearchPropTypes {
  vaccinationPointForm: UseFormReturn<VaccinationPointFindQueryType, any>;
}

interface SearchFilterForm {
  province: string | number;
  district: string | number;
  ward: string | number;
  name: string;
  address: string;
}

const searchFilterSchema = yup.object({
  province: yup.string(),
  district: yup.string(),
  ward: yup.string(),
  name: yup.string(),
  address: yup.string()
});

const SearchSection: FC<VaccinationPointSearchPropTypes> = ({
  vaccinationPointForm
}) => {
  const { control, getValues, setValue, watch, handleSubmit } =
    useForm<SearchFilterForm>({
      defaultValues: {
        ward: '',
        district: '',
        province: '',
        name: '',
        address: ''
      },
      resolver: yupResolver(searchFilterSchema)
    });

  const [loading, setLoading] = useState(false);

  const { provinceSelections, districtSelections, wardSelections } =
    useProvinces(getValues('province'), getValues('district'));
  //watch updates of province and district to trigger api call to provinceAPI
  const watchProvince = watch('province');
  const watchDistrict = watch('district');
  watch('name');
  watch('address');

  useEffect(() => {
    setValue('district', '', {
      shouldValidate: true
    });
    setValue('ward', '', {
      shouldValidate: true
    });
  }, [watchProvince, setValue, watch]);

  useEffect(() => {
    setValue('ward', '', {
      shouldValidate: true
    });
  }, [watchDistrict, setValue, watch]);

  const onSubmit = async (data: SearchFilterForm) => {
    try {
      setLoading(true);

      vaccinationPointForm.setValue('province', data.province, {
        shouldValidate: true
      });
      vaccinationPointForm.setValue('district', data.district, {
        shouldValidate: true
      });
      vaccinationPointForm.setValue('ward', data.ward, {
        shouldValidate: true
      });
      vaccinationPointForm.setValue('name', data.name, {
        shouldValidate: true
      });
      vaccinationPointForm.setValue('address', data.address, {
        shouldValidate: true
      });

      toast.success('Dữ liệu đơn vị hành chính đã được cập nhật!');
    } catch (error) {
      toast.error('Không thể tải dữ liệu đơn vị hành chính!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack
      component="form"
      direction="column"
      spacing={2}
      onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" spacing={2}>
        <Box width={260}>
          <SelectInput
            control={control}
            errorMessage="Tỉnh/Thành phố không được bỏ trống"
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
            name="ward"
            selections={wardSelections()}
            defaultValue=""
            placeholder="Xã/Phường"
            size="small"
          />
        </Box>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Box sx={{ width: '260px' }}>
          <TextInput
            control={control}
            name="name"
            placeholder="Điểm tiêm"
            size="small"
          />
        </Box>
        <Box sx={{ width: '260px' }}>
          <TextInput
            control={control}
            name="address"
            placeholder="Địa chỉ"
            required
            size="small"
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          endIcon={<SearchIcon />}>
          Tìm kiếm
        </Button>
      </Stack>
    </Stack>
  );
};

export default SearchSection;
