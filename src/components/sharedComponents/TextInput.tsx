import { Stack, TextField, TextFieldVariants, Typography } from '@mui/material';
import React, { FC } from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import RequiredTag from './RequiredTag';

interface TextInputProps<T extends FieldValues> extends UseControllerProps<T> {
  variant?: TextFieldVariants;
  errorMessage?: string;
  placeholder?: string;
  label?: string | undefined;
  type?: React.HTMLInputTypeAttribute | undefined;
  required?: boolean | undefined;
  size?: 'medium' | 'small';
}

const TextInput = <T extends FieldValues>({
  control,
  name,
  errorMessage,
  placeholder,
  label,
  variant = 'outlined',
  type,
  required = false,
  size
}: TextInputProps<T>) => {
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
          <TextField
            variant={variant}
            fullWidth
            helperText={!!fieldState.error?.message && errorMessage}
            placeholder={placeholder}
            error={!!fieldState.error}
            type={type}
            size={size}
            {...field}
          />
        )}
      />
    </Stack>
  );
};

export default TextInput;
