import { Box, Button, Stack } from '@mui/material';
import { VaccineRegistrationFindParamsType } from '@src/api/vaccineRegistration/types';
import DateInput from '@src/components/sharedComponents/DateInput';
import SelectInput from '@src/components/sharedComponents/SelectInput';
import React, { FC } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import priorityType from '@src/utils/constants/priorityType';
import dayjs from 'dayjs';
import { getISODate } from '@src/utils/getISODate';

interface SearchSectionPropsType {
  vaccineRegistrationForm: UseFormReturn<
    VaccineRegistrationFindParamsType,
    any
  >;
}

interface SearchFormDataType {
  priorityType: number | string;
  appointmentDate: string | number | Date | dayjs.Dayjs | null | undefined;
}

const SearchSection: FC<SearchSectionPropsType> = ({
  vaccineRegistrationForm
}) => {
  const { handleSubmit, control } = useForm<SearchFormDataType>({
    defaultValues: {
      priorityType: '',
      appointmentDate: null
    }
  });

  const onSubmit = (data: SearchFormDataType) => {
    vaccineRegistrationForm.setValue(
      'appointmentDate',
      data.appointmentDate ? getISODate(data.appointmentDate) : null,
      {
        shouldValidate: true
      }
    );
    vaccineRegistrationForm.setValue(
      'priorityType',
      data.priorityType === '' ? null : data.priorityType,
      {
        shouldValidate: true
      }
    );
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      component="form"
      onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ width: '260px' }}>
        <SelectInput
          name="priorityType"
          control={control}
          placeholder="Nhóm ưu tiên"
          selections={priorityType}
          size="small"
        />
      </Box>
      <Box sx={{ width: '260px' }}>
        <DateInput
          control={control}
          name="appointmentDate"
          placeholder="Ngày/Tháng/Năm"
          size="small"
        />
      </Box>
      <Button type="submit" variant="contained">
        Tìm kiếm
      </Button>
    </Stack>
  );
};

export default SearchSection;
