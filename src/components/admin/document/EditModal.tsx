'use client';

import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  Stack,
  Typography
} from '@mui/material';
import TextInput from '@src/components/sharedComponents/TextInput';
import React, { ChangeEvent, FC, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Document } from '@src/components/admin/document/DocumentTable';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { red } from '@mui/material/colors';
import RequiredTag from '@components/sharedComponents/RequiredTag';

interface EditModalProps {
  editModalOpen: boolean;
  handleCloseEditModal: () => void;
  document: Document | null;
}

const schema = yup
  .object()
  .shape({
    name: yup.string().required(),
    file: yup
      .mixed<File>()
      .test('required', 'File tải lên phải là file PDF', (file) => {
        if (file && file?.type === 'application/pdf') return true;
        return false;
      })
  })
  .required();

const EditModal: FC<EditModalProps> = ({
  editModalOpen,
  handleCloseEditModal,
  document
}) => {
  const {
    control,
    getValues,
    setValue,
    handleSubmit,
    trigger,
    reset,
    formState: { errors, isValid }
  } = useForm<Document>({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (document !== null) reset(document);
  }, [document]);

  const onSubmit = (data: Document) => {
    console.log(data);
    alert('try to modify document' + JSON.stringify(data));
  };

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setValue('file', e.target.files[0]);
    trigger('file');
  };

  return (
    <Modal hideBackdrop open={editModalOpen} onClose={handleCloseEditModal}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: '4px',
          width: '500px'
        }}>
        <Stack direction="row" justifyContent="space-between" spacing={2} p={2}>
          <Typography variant="h6">Cập nhật tài liệu</Typography>
          <IconButton color="default" onClick={handleCloseEditModal}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider />
        <Stack spacing={2} p={2}>
          <TextInput
            control={control}
            name="name"
            label="Tên tài liệu"
            placeholder="Tên tài liệu"
            errorMessage="Tên tài liệu không được bỏ trống"
            required
          />
          <Typography>
            File tài liệu:
            <RequiredTag />
          </Typography>
          {getValues('file') && getValues('file')?.name}
          <Typography
            sx={{ display: !errors?.file ? 'none' : 'block', color: red[500] }}>
            {errors?.file?.message}
          </Typography>
          <Button variant="contained" component="label">
            Tải lên pdf mới
            <input type="file" hidden onChange={handleChangeFile} />
          </Button>
        </Stack>
        <Stack direction="row" justifyContent="end" spacing={2} p={2}>
          <Button variant="outlined" onClick={handleCloseEditModal}>
            Hủy bỏ
          </Button>
          <Button type="submit" variant="contained" disabled={!isValid}>
            Xác nhận
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default EditModal;
