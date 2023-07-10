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
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { red } from '@mui/material/colors';
import RequiredTag from '@components/sharedComponents/RequiredTag';
import { Document, DocumentCreateFormData } from '@src/api/document/types';
import useCreateDocument from '@src/api/document/create';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface CreateModalProps {
  createModalOpen: boolean;
  handleCloseCreateModal: () => void;
}

const schema = yup.object().shape({
  name: yup.string().required(),
  file: yup
    .mixed<File>()
    .test('pdf', 'File tải lên phải là file PDF', (file) => {
      if (!file) {
        return true;
      } else if (file.type === 'application/pdf') return true;
      return false;
    })
    .required()
});

const defaultValues = {
  name: '',
  file: null
};

const CreateModal: FC<CreateModalProps> = ({
  createModalOpen,
  handleCloseCreateModal
}) => {
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  const {
    control,
    getValues,
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<DocumentCreateFormData>({
    mode: 'onChange',
    defaultValues: defaultValues,
    resolver: yupResolver(schema)
  });

  const { mutateAsync } = useCreateDocument();

  useEffect(() => {
    reset(defaultValues);
  }, [createModalOpen, reset]);

  const onSubmit = async (data: DocumentCreateFormData) => {
    try {
      setLoading(true);

      const newDocument = await mutateAsync(data);

      const documentQuery = queryClient.getQueryData<Document[]>(['documents']);

      if (documentQuery) documentQuery.push(newDocument);

      toast.success('Tạo mới tài liệu thành công!');
      handleCloseCreateModal();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ERR_NETWORK') toast.error('Lỗi mạng!');
        else if (error?.response?.status === 409)
          toast.error('Tên tài liệu đã được sử dụng!');
        else toast.error('Không thể tạo mới tài liệu!');
      } else {
        toast.error('Có lỗi xảy ra!');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setValue('file', e.target.files[0], {
      shouldValidate: true
    });
  };

  return (
    <Modal hideBackdrop open={createModalOpen} onClose={handleCloseCreateModal}>
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
          <Typography variant="h6">Thêm mới tài liệu</Typography>
          <IconButton color="default" onClick={handleCloseCreateModal}>
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
          <Button variant="outlined" onClick={handleCloseCreateModal}>
            Hủy bỏ
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading || !isValid}>
            Thêm mới
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default CreateModal;
