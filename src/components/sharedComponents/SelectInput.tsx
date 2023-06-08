import { MenuItem, Stack, TextField, Typography } from '@mui/material';
import React, { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import RequiredTag from './RequiredTag';

interface SelectionObject {
  value: string | number | string[] | undefined;
  label: string | number;
}

interface SelectInput {
  control: Control;
  name: string;
  errorMessage: string;
  label: string | undefined;
  placeholder: string;
  defaultValue: string | number | boolean;
  selections: SelectionObject[];
  required: boolean | undefined;
  size: 'medium' | 'small';
}

const SelectInput: FC<SelectInput> = ({
  control,
  name,
  errorMessage,
  label,
  placeholder,
  selections,
  required,
  size
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
            fullWidth
            size={size}
            select
            helperText={!!fieldState.error?.message && errorMessage}
            error={!!fieldState.error}
            //placeholder solution 1
            sx={{
              '& .MuiSelect-select .notranslate::after': placeholder
                ? {
                    content: `"${placeholder}"`,
                    opacity: 0.42
                  }
                : {}
            }}
            {...field}>
            {selections.map((selection, index) => (
              <MenuItem key={index} value={selection.value}>
                {selection.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    </Stack>
  );
};

export default SelectInput;
