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
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { VaccinationPointFindOneResponseType } from '@src/api/vaccinationPoint/findOne';
import useProvinces from '@src/hooks/useProvinces';
import SelectInput from '@src/components/sharedComponents/SelectInput';

interface EditModalProps {
  editModalOpen: boolean;
  handleCloseEditModal: () => void;
  vaccinationPoint: VaccinationPointFindOneResponseType | null;
}

interface VaccinationSiteFormData {
  id: number;
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
  const provinceDistrictForm = useForm<ProvinceDistrictFormData>({
    defaultValues: {
      province: vaccinationPoint?.ward.district.province.id || '',
      district: vaccinationPoint?.ward.district.id || ''
    }
  });

  const { control, getValues, setValue, watch, handleSubmit, reset } =
    useForm<VaccinationSiteFormData>({
      defaultValues: {
        id: vaccinationPoint?.id,
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
    provinceDistrictForm.setValue('district', '');
    setValue('ward', '');
  }, [provinceDistrictForm, watchProvince, setValue]);

  useEffect(() => {
    setValue('ward', '');
  }, [watchDistrict, setValue]);

  useEffect(() => {
    if (vaccinationPoint !== null) {
      reset({
        id: vaccinationPoint.id,
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
    }
  }, [vaccinationPoint, reset, provinceDistrictForm]);

  const onSubmit = (data: VaccinationSiteFormData) => {
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
