import { Stack, TextField, TextFieldVariants, Typography } from '@mui/material';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

interface TextInput {
  variant: TextFieldVariants;
  control: Control;
  name: string;
  errorMessage: string;
  placeholder: string;
  label: string | undefined;
  type: React.HTMLInputTypeAttribute | undefined;
}

export default function TextInput({
  control,
  name,
  errorMessage,
  placeholder,
  label,
  variant = 'outlined',
  type
}: TextInput) {
  return (
    <Stack spacing={1}>
      {label ? <Typography>{label}</Typography> : null}
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
            {...field}
          />
        )}
      />
    </Stack>
  );
}
