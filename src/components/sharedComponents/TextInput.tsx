import { Stack, TextField, TextFieldVariants, Typography } from '@mui/material';
import React, { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import RequiredTag from './RequiredTag';

interface TextInput {
  variant: TextFieldVariants;
  control: Control;
  name: string;
  errorMessage: string;
  placeholder: string;
  label: string | undefined;
  type: React.HTMLInputTypeAttribute | undefined;
  required: boolean | undefined;
}

const TextInput: FC<TextInput> = ({
  control,
  name,
  errorMessage,
  placeholder,
  label,
  variant = 'outlined',
  type,
  required = false
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
};

export default TextInput;
