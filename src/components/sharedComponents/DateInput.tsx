import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, TextField, Typography } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

interface DateInput {
  control: Control;
  name: string;
  errorMessage: string;
  label: string | undefined;
  placeholder: string;
  disableFuture: boolean | undefined;
}

const DateInput: React.FC<DateInput> = ({
  control,
  name,
  errorMessage,
  label,
  placeholder,
  disableFuture
}) => {
  return (
    <Box>
      {label ? <Typography>{label}</Typography> : null}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disableFuture={disableFuture}
              slotProps={{
                textField: {
                  helperText: errorMessage
                }
              }}
              slots={
                <TextField
                  fullWidth
                  helperText={!!fieldState.error?.message && errorMessage}
                  placeholder={placeholder}
                  error={!!fieldState.error}
                  {...field}
                />
              }
            />
          </LocalizationProvider>
        )}
      />
    </Box>
  );
};

export default DateInput;
