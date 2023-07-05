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
import { Document, DocumentUpdateFormData } from '@src/api/document/types';
import useFindOneDocument from '@src/api/document/findOne';
import { toast } from 'react-toastify';
import useUpdateDocument from '@src/api/document/update';
import { useQueryClient } from '@tanstack/react-query';

interface EditModalProps {
  editModalOpen: boolean;
  handleCloseEditModal: () => void;
  document: Document | null;
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
    .nullable()
});

const EditModal: FC<EditModalProps> = ({
  editModalOpen,
  handleCloseEditModal,
  document
}) => {
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  const {
    control,
    getValues,
    setValue,
    handleSubmit,
    trigger,
    reset,
    formState: { errors, isValid }
  } = useForm<DocumentUpdateFormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      file: null
    },
    resolver: yupResolver(schema)
  });

  const { data } = useFindOneDocument(document ? document.id : null);
  const { mutateAsync } = useUpdateDocument();

  useEffect(() => {
    if (document !== null && data)
      reset({
        name: data.name,
        file: null
      });
  }, [document, data, reset]);

  const onSubmit = async (data: DocumentUpdateFormData) => {
    try {
      setLoading(true);

      const updatedDocument = await mutateAsync({
        id: document?.id,
        updateDocumentFormData: data
      });

      const documentQuery = queryClient.getQueryData<Document[]>(['documents']);

      if (documentQuery) {
        const updateDocumentIndex = documentQuery.findIndex(
          (document) => document.id === updatedDocument.id
        );

        documentQuery[updateDocumentIndex] = updatedDocument;
      }

      toast.success('Cập nhật tài liệu thành công!');
      handleCloseEditModal();
    } catch (error) {
      toast.error('Không thể cập nhật tài liệu!');
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
          <Button
            type="submit"
            variant="contained"
            disabled={loading || !isValid}>
            Cập nhật
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default EditModal;
