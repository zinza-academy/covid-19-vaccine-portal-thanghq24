import {
  Box,
  Button,
  Divider,
  Grid,
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
  const [prevProvince, setPrevProvince] = useState<string | number | undefined>(
    ''
  );
  const [prevDistrict, setPrevDistrict] = useState<string | number | undefined>(
    ''
  );
  const createVaccinationPointMutation = useCreateVaccinationPoint();

  const provinceDistrictForm = useForm<ProvinceDistrictFormData>({
    mode: 'onChange',
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
    formState: { isDirty, isValid }
  } = useForm<VaccinationPointCreateFormData>({
    mode: 'onChange',
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
    reset();
    provinceDistrictForm.reset();
  }, [createModalOpen, reset, provinceDistrictForm]);

  useEffect(() => {
    if (watchProvince !== prevProvince) {
      setPrevProvince(watchProvince);
      provinceDistrictForm.setValue('district', '', {
        shouldValidate: true
      });
      setValue('ward', '', {
        shouldValidate: true
      });
    }
  }, [provinceDistrictForm, watchProvince, setValue, prevProvince]);

  useEffect(() => {
    if (watchDistrict !== prevDistrict) {
      setPrevDistrict(watchDistrict);
      setValue('ward', '', {
        shouldValidate: true
      });
    }
  }, [watchDistrict, setValue, prevDistrict]);

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
          width: '900px'
        }}>
        <Stack direction="row" justifyContent="space-between" spacing={2} p={2}>
          <Typography variant="h6">Tạo mới điểm tiêm</Typography>
          <IconButton color="default" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider />
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextInput
                control={control}
                name="name"
                label="Tên điểm tiêm"
                placeholder="Tên điểm tiêm"
                errorMessage="Tên điểm tiêm không được bỏ trống"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextInput
                control={control}
                name="address"
                label="Số nhà, tên đường"
                placeholder="Số nhà, tên đường"
                errorMessage="Số nhà, tên đường không được bỏ trống"
                required
              />
            </Grid>
            <Grid item xs={4}>
              <SelectInput
                control={provinceDistrictForm.control}
                label="Tỉnh/Thành phố"
                errorMessage="Tỉnh/Thành phố không được bỏ trống"
                name="province"
                selections={provinceSelections()}
                defaultValue=""
                placeholder="Tỉnh/Thành phố"
                required
              />
            </Grid>
            <Grid item xs={4}>
              <SelectInput
                control={provinceDistrictForm.control}
                label="Quận/Huyện"
                errorMessage="Quận/Huyện không được bỏ trống"
                name="district"
                selections={districtSelections()}
                defaultValue=""
                placeholder="Quận/Huyện"
                required
              />
            </Grid>
            <Grid item xs={4}>
              <SelectInput
                control={control}
                label="Xã/Phường"
                errorMessage="Xã/Phường không được bỏ trống"
                name="ward"
                selections={wardSelections()}
                defaultValue=""
                placeholder="Xã/Phường"
              />
            </Grid>
            <Grid item xs={6}>
              <TextInput
                control={control}
                name="manager"
                label="Người đứng đầu cơ sở tiêm chủng"
                placeholder="Người đứng đầu cơ sở tiêm chủng"
                errorMessage="Người đứng đầu cơ sở tiêm chủng không được bỏ trống"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextInput
                control={control}
                name="tableNumber"
                label="Số bàn tiêm"
                placeholder="Số bàn tiêm"
                errorMessage="Số bàn tiêm là số và không được bỏ trống"
                required
              />
            </Grid>
          </Grid>
        </Box>
        <Stack direction="row" justifyContent="end" spacing={2} p={2}>
          <Button variant="outlined" onClick={handleClose}>
            Hủy bỏ
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading || !isDirty || !isValid}>
            Tạo mới
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default CreateModal;
