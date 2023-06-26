import { Box, Button, Stack } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import SelectInput from '../sharedComponents/SelectInput';
import { UseFormReturn } from 'react-hook-form';
import useProvinces from '@src/hooks/useProvinces';
import SearchIcon from '@mui/icons-material/Search';
import useFindVaccinationPoint, {
  VaccinationPointFindQueryType
} from '@src/api/authApi/vaccinationPoint/find';
import { toast } from 'react-toastify';

interface VaccinationPointSearchPropTypes {
  vaccinationPointForm: UseFormReturn<VaccinationPointFindQueryType, any>;
}

const SearchSection: FC<VaccinationPointSearchPropTypes> = ({
  vaccinationPointForm
}) => {
  const { control, handleSubmit, getValues, setValue, watch } =
    vaccinationPointForm;

  const [loading, setLoading] = useState(false);

  const { refetch } = useFindVaccinationPoint(getValues());

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

  const canSubmit = !loading;

  const onSubmit = async () => {
    try {
      setLoading(true);
      await refetch();
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
      direction="row"
      spacing={2}
      onSubmit={handleSubmit(onSubmit)}>
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
          required
          size="small"
        />
      </Box>
      <Box>
        <Button
          type="submit"
          variant="contained"
          disabled={!canSubmit}
          endIcon={<SearchIcon />}>
          Tìm kiếm
        </Button>
      </Box>
    </Stack>
  );
};

export default SearchSection;
