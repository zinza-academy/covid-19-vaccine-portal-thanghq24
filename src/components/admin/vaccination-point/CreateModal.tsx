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
import React, { FC, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { UseFormReturn, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useProvinces from '@src/hooks/useProvinces';
import SelectInput from '@src/components/sharedComponents/SelectInput';
import useCreateVaccinationPoint, {
  VaccinationPointCreateFormData
} from '@src/api/vaccinationPoint/create';
import { toast } from 'react-toastify';
import axios from 'axios';
import {
  VaccinationPointFindQueryType,
  VaccinationPointFindResponseType
} from '@src/api/vaccinationPoint/find';
import { useQueryClient } from '@tanstack/react-query';

interface CreateModalProps {
  createModalOpen: boolean;
  handleCloseCreateModal: () => void;
  vaccinationPointForm: UseFormReturn<VaccinationPointFindQueryType, any>;
}

interface ProvinceDistrictFormData {
  province: string | number;
  district: string | number;
}

const provinceDistrictSchema = yup
  .object()
  .shape({
    district: yup.string().required(),
    province: yup.string().required()
  })
  .required();

const schema = yup
  .object()
  .shape({
    name: yup.string().required(),
    address: yup.string().required(),
    ward: yup.string().required(),
    manager: yup.string().required(),
    tableNumber: yup.number().default(0)
  })
  .required();

const CreateModal: FC<CreateModalProps> = ({
  createModalOpen,
  handleCloseCreateModal,
  vaccinationPointForm
}) => {
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  const createVaccinationPointMutation = useCreateVaccinationPoint();

  const provinceDistrictForm = useForm<ProvinceDistrictFormData>({
    defaultValues: {
      province: '',
      district: ''
    },
    resolver: yupResolver(provinceDistrictSchema)
  });

  const {
    control,
    setValue,
    watch,
    handleSubmit,
    reset,
    formState: { isDirty }
  } = useForm<VaccinationPointCreateFormData>({
    defaultValues: {
      name: '',
      address: '',
      ward: '',
      manager: '',
      tableNumber: 0
    },
    resolver: yupResolver(schema)
  });

  const { provinceSelections, districtSelections, wardSelections } =
    useProvinces(
      provinceDistrictForm.getValues('province'),
      provinceDistrictForm.getValues('district')
    );

  const watchProvince = provinceDistrictForm.watch('province');
  const watchDistrict = provinceDistrictForm.watch('district');
  watch('name');
  watch('address');

  useEffect(() => {
    provinceDistrictForm.setValue('district', '', {
      shouldValidate: true
    });
    setValue('ward', '', {
      shouldValidate: true
    });
  }, [provinceDistrictForm, watchProvince, setValue]);

  useEffect(() => {
    setValue('ward', '', {
      shouldValidate: true
    });
  }, [watchDistrict, setValue]);

  const onSubmit = async (data: VaccinationPointCreateFormData) => {
    try {
      setLoading(true);

      await createVaccinationPointMutation.mutateAsync(data);
      const vaccinationPointsQuery =
        queryClient.getQueryData<VaccinationPointFindResponseType>([
          'vaccination-points',
          vaccinationPointForm
        ]);

      if (vaccinationPointsQuery)
        vaccinationPointForm.setValue(
          'page',
          Math.floor(
            vaccinationPointsQuery?.count /
              vaccinationPointForm.getValues('pageSize')
          ),
          {
            shouldValidate: true
          }
        );

      toast.success('Tạo mới thành công');

      handleClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ERR_NETWORK') toast.error('Lỗi mạng!');
        else if (error?.response?.status === 401)
          toast.error('Không có quyền thực hiện!');
        else toast.error('Tạo mới thất bại!');
      } else {
        toast.error('Có lỗi xảy ra!');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    handleCloseCreateModal();
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
          <Typography variant="h6">Tạo mới điểm tiêm</Typography>
          <IconButton color="default" onClick={handleClose}>
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
          <SelectInput
            control={provinceDistrictForm.control}
            errorMessage="Tỉnh/Thành phố không được bỏ trống"
            name="province"
            selections={provinceSelections()}
            defaultValue=""
            placeholder="Tỉnh/Thành phố"
            required
          />
          <SelectInput
            control={provinceDistrictForm.control}
            errorMessage="Quận/Huyện không được bỏ trống"
            name="district"
            selections={districtSelections()}
            defaultValue=""
            placeholder="Quận/Huyện"
            required
          />
          <SelectInput
            control={control}
            errorMessage="Xã/Phường không được bỏ trống"
            name="ward"
            selections={wardSelections()}
            defaultValue=""
            placeholder="Xã/Phường"
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
            errorMessage="Số bàn tiêm là số và không được bỏ trống"
            required
          />
        </Stack>
        <Stack direction="row" justifyContent="end" spacing={2} p={2}>
          <Button variant="outlined" onClick={handleClose}>
            Hủy bỏ
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading || !isDirty}>
            Tạo mới
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default CreateModal;
