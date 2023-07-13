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
import { VaccinationPointFindOneResponseType } from '@src/api/vaccinationPoint/findOne';
import useProvinces from '@src/hooks/useProvinces';
import SelectInput from '@src/components/sharedComponents/SelectInput';
import useEditVaccinationPoint from '@src/api/vaccinationPoint/edit';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import {
  VaccinationPointFindQueryType,
  VaccinationPointFindResponseType
} from '@src/api/vaccinationPoint/find';

interface EditModalProps {
  editModalOpen: boolean;
  handleCloseEditModal: () => void;
  vaccinationPoint: VaccinationPointFindOneResponseType | null;
  vaccinationPointForm: UseFormReturn<VaccinationPointFindQueryType, any>;
}

interface VaccinationSiteFormData {
  name: string;
  address: string;
  ward: string | number;
  manager: string;
  tableNumber: number;
}

interface ProvinceDistrictFormData {
  province: string | number;
  district: string | number;
}

const provinceDistrictSchema = yup
  .object()
  .shape({
    province: yup.string().required(),
    district: yup.string().required()
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

const EditModal: FC<EditModalProps> = ({
  editModalOpen,
  handleCloseEditModal,
  vaccinationPoint,
  vaccinationPointForm
}) => {
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);
  const [prevProvince, setPrevProvince] = useState<
    string | number | undefined
  >();
  const [prevDistrict, setPrevDistrict] = useState<
    string | number | undefined
  >();

  const editVaccinationPointMutation = useEditVaccinationPoint();

  const provinceDistrictForm = useForm<ProvinceDistrictFormData>({
    mode: 'onChange',
    defaultValues: {
      province: vaccinationPoint?.ward.district.province.id || '',
      district: vaccinationPoint?.ward.district.id || ''
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
  } = useForm<VaccinationSiteFormData>({
    mode: 'onChange',
    defaultValues: {
      name: vaccinationPoint?.name,
      address: vaccinationPoint?.address,
      ward: vaccinationPoint?.ward.id || '',
      manager: vaccinationPoint?.manager,
      tableNumber: vaccinationPoint?.tableNumber
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
    if (prevProvince !== undefined && watchProvince !== prevProvince) {
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
    if (prevDistrict !== undefined && watchDistrict !== prevDistrict) {
      setPrevDistrict(watchDistrict);
      setValue('ward', '', {
        shouldValidate: true
      });
    }
  }, [watchDistrict, setValue, prevDistrict]);

  useEffect(() => {
    if (vaccinationPoint !== null) {
      reset({
        name: vaccinationPoint.name,
        address: vaccinationPoint.address,
        ward: vaccinationPoint.ward.id,
        manager: vaccinationPoint.manager,
        tableNumber: vaccinationPoint.tableNumber
      });
      provinceDistrictForm.reset({
        province: vaccinationPoint.ward.district.province.id,
        district: vaccinationPoint.ward.district.id
      });
      setPrevProvince(vaccinationPoint.ward.district.provinceId);
      setPrevDistrict(vaccinationPoint.ward.districtId);
    }
  }, [vaccinationPoint, reset, provinceDistrictForm]);

  const onSubmit = async (data: VaccinationSiteFormData) => {
    try {
      setLoading(true);

      const variables = {
        id: vaccinationPoint?.id,
        vaccinationPointEditFormData: data
      };
      const result = await editVaccinationPointMutation.mutateAsync(variables);

      queryClient.setQueryData<VaccinationPointFindResponseType | undefined>(
        [
          'vaccination-points',
          {
            page: vaccinationPointForm.getValues('page'),
            pageSize: vaccinationPointForm.getValues('pageSize')
          }
        ],
        (vaccinationPoints) => {
          if (!vaccinationPoints) return vaccinationPoints;

          let updateVaccinationPointIndex = vaccinationPoints.data.findIndex(
            (vaccinationPoint) => vaccinationPoint.id === result.id
          );
          vaccinationPoints.data[updateVaccinationPointIndex] = result;

          return vaccinationPoints;
        }
      );

      toast.success('Chỉnh sửa thành công');
      handleCloseEditModal();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ERR_NETWORK') toast.error('Lỗi mạng!');
        else if (error?.response?.status === 401)
          toast.error('Không có quyền thực hiện!');
        else toast.error('Chỉnh sửa thất bại!');
      } else {
        toast.error('Có lỗi xảy ra!');
      }
    } finally {
      setLoading(false);
    }
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
          width: '900px'
        }}>
        <Stack direction="row" justifyContent="space-between" spacing={2} p={2}>
          <Typography variant="h6">Cập nhật điểm tiêm</Typography>
          <IconButton color="default" onClick={handleCloseEditModal}>
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
          <Button variant="outlined" onClick={handleCloseEditModal}>
            Hủy bỏ
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading || !isDirty || !isValid}>
            Xác nhận
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default EditModal;
