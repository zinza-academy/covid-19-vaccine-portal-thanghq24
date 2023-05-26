import { MenuItem, Stack, TextField, Typography } from '@mui/material';
import React, { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import RequiredTag from './RequiredTag';

interface SelectionObject {
  value: string | number | boolean;
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
}

const SelectInput: FC<SelectInput> = ({
  control,
  name,
  errorMessage,
  label,
  placeholder,
  selections,
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
          <TextField
            fullWidth
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
            {...field}
            onClick={() => console.log(field.value)}>
            {/* placeholder solution 2 */}
            {/* {field.value === 'none' ? (
              <MenuItem value="none" disabled>
                {placeholder}
              </MenuItem>
            ) : null} */}
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
