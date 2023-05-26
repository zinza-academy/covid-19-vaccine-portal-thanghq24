import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Stack, TextField, Typography } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import RequiredTag from './RequiredTag';

interface DateInput {
  control: Control;
  name: string;
  errorMessage: string;
  label: string | undefined;
  placeholder: string;
  disableFuture: boolean | undefined;
  required: boolean | undefined;
}

const DateInput: React.FC<DateInput> = ({
  control,
  name,
  errorMessage,
  label,
  placeholder = 'Ngày/Tháng/Năm',
  disableFuture,
  required
}) => {
  return (
    <Stack spacing={1}>
      {label ? (
        <Typography>
          {label} {required ? <RequiredTag /> : null}
        </Typography>
      ) : null}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disableFuture={disableFuture}
              slotProps={{
                textField: {
                  error: !!fieldState?.error,
                  helperText: !!fieldState.error?.message && errorMessage,
                  placeholder: placeholder
                }
              }}
              sx={{ width: '100%' }}
              {...field}
            />
          </LocalizationProvider>
        )}
      />
    </Stack>
  );
};

export default DateInput;
