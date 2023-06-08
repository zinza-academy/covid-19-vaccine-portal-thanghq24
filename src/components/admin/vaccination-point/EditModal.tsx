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
import React, { FC, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { VaccinationPoint } from './VaccinationPointTable';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface EditModalProps {
  editModalOpen: boolean;
  handleCloseEditModal: () => void;
  vaccinationPoint: VaccinationPoint | null;
}

const schema = yup
  .object()
  .shape({
    name: yup.string().required(),
    address: yup.string().required(),
    ward: yup.string().required(),
    district: yup.string().required(),
    province: yup.string().required(),
    manager: yup.string().required(),
    tableNumber: yup.number().default(0)
  })
  .required();

const EditModal: FC<EditModalProps> = ({
  editModalOpen,
  handleCloseEditModal,
  vaccinationPoint
}) => {
  const {
    control,
    getValues,
    handleSubmit,
    reset,
    formState: { isDirty, isValid }
  } = useForm<VaccinationPoint>({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (vaccinationPoint !== null) reset(vaccinationPoint);
  }, [vaccinationPoint]);

  const onSubmit = (data: VaccinationPoint) => {
    alert('try to modify vaccination point' + JSON.stringify(data));
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
          <Typography variant="h6" onClick={() => console.log(getValues())}>
            Cập nhật điểm tiêm
          </Typography>
          <IconButton color="default" onClick={handleCloseEditModal}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider />
        <Stack spacing={2} p={2}>
          <TextInput
            control={control}
            name="name"
            label="Tên điểm tiêm"
            placeholder="Tên điểm tiêm"
            errorMessage="Tên điểm tiêm không được bỏ trống"
            required
          />
          <TextInput
            control={control}
            name="address"
            label="Số nhà, tên đường"
            placeholder="Số nhà, tên đường"
            errorMessage="Số nhà, tên đường không được bỏ trống"
            required
          />
          <TextInput
            control={control}
            name="manager"
            label="Người đứng đầu cơ sở tiêm chủng"
            placeholder="Người đứng đầu cơ sở tiêm chủng"
            errorMessage="Người đứng đầu cơ sở tiêm chủng không được bỏ trống"
            required
          />
          <TextInput
            control={control}
            name="tableNumber"
            label="Số bàn tiêm"
            placeholder="Số bàn tiêm"
            errorMessage="Số bàn tiêm không được bỏ trống"
            required
          />
        </Stack>
        <Stack direction="row" justifyContent="end" spacing={2} p={2}>
          <Button variant="outlined" onClick={handleCloseEditModal}>
            Hủy bỏ
          </Button>
          <Button type="submit" variant="contained">
            Xác nhận
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default EditModal;
