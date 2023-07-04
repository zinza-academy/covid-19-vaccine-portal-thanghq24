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
import CloseIcon from '@mui/icons-material/Close';
import useFindVaccinationPoint from '@src/api/vaccinationPoint/find';
import { VaccinationPointFindOneResponseType } from '@src/api/vaccinationPoint/findOne';
import {
  VaccineRegistrationFindParamsType,
  VaccineRegistrationFindResponseType,
  VaccineRegistrationStatus
} from '@src/api/vaccineRegistration/types';
import useFindVaccineType, {
  VaccineTypeFindOneResponseType
} from '@src/api/vaccineType/find';
import DateInput from '@src/components/sharedComponents/DateInput';
import SelectInput from '@src/components/sharedComponents/SelectInput';
import { useQueryClient } from '@tanstack/react-query';
import React, { FC, useEffect, useState } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import useDecideApprovalVaccineRegistration from '@src/api/vaccineRegistration/decideApproval';
import { toast } from 'react-toastify';
import useUpdateVaccineRegistrationResult from '@src/api/vaccineRegistrationResult/update';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useFindOneVaccineRegistrationResult from '@src/api/vaccineRegistrationResult/findOne';
import dayjs from 'dayjs';
import useFindOneVaccineRegistration from '@src/api/vaccineRegistration/findOne';

interface EditModalPropsType {
  editModalOpen: boolean;
  handleCloseEditModal: () => void;
  vaccinationRegistrationId: number | null;
  vaccinationRegistrationResultId: number | null;
  vaccineRegistrationForm: UseFormReturn<
    VaccineRegistrationFindParamsType,
    any
  >;
}

interface EditFormDataType {
  injectingTime: string | number | Date | dayjs.Dayjs | null | undefined;
  vaccinationSite: '' | number;
  vaccineType: '' | number;
}

const schema = yup
  .object()
  .shape({
    injectingTime: yup.date().required(),
    vaccinationSite: yup.number().required(),
    vaccineType: yup.number().required()
  })
  .required();

const EditForm: FC<EditModalPropsType> = ({
  editModalOpen,
  handleCloseEditModal,
  vaccinationRegistrationId,
  vaccinationRegistrationResultId,
  vaccineRegistrationForm
}) => {
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  const vaccineTypes = useFindVaccineType();

  const vaccinationPoints = useFindVaccinationPoint({
    page: 0,
    pageSize: 1000,
    address: null,
    district: '',
    name: null,
    province: '',
    ward: ''
  });

  const { data } = useFindOneVaccineRegistrationResult({
    id: vaccinationRegistrationResultId
  });
  const vaccineRegistration = useFindOneVaccineRegistration({
    id: vaccinationRegistrationId
  });

  const decideApprovalMutation = useDecideApprovalVaccineRegistration();
  const updateVaccineRegisterResultMutation =
    useUpdateVaccineRegistrationResult();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid }
  } = useForm<EditFormDataType>({
    mode: 'all',
    defaultValues: {
      injectingTime: null,
      vaccinationSite: '',
      vaccineType: ''
    },
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (data)
      reset({
        injectingTime: data.injectingTime ? dayjs(data.injectingTime) : null,
        vaccineType: data?.vaccineType?.id ? data.vaccineType?.id : '',
        vaccinationSite: data?.vaccinationSite?.id
          ? data?.vaccinationSite?.id
          : ''
      });
  }, [data, reset]);

  const getSelections = (
    unformattedData:
      | VaccineTypeFindOneResponseType[]
      | VaccinationPointFindOneResponseType[]
      | undefined
  ) => {
    if (!unformattedData)
      return [
        {
          value: '',
          label: 'Không có lựa chọn'
        }
      ];
    return unformattedData.map((dataItem) => ({
      value: dataItem.id,
      label: dataItem.name
    }));
  };

  const onSubmit = async (data: EditFormDataType) => {
    if (
      data.vaccineType === '' ||
      data.vaccinationSite === '' ||
      data.injectingTime === null
    ) {
      toast.warning('Không được bỏ trống các lựa chọn!');
      return;
    }
    try {
      setLoading(true);
      if (vaccinationRegistrationResultId) {
        const variables = {
          id: vaccinationRegistrationResultId,
          vaccinationRegistrationResultUpdateFormData: {
            injectingTime: data.injectingTime,
            vaccineType: data.vaccineType,
            vaccinationSite: data.vaccinationSite
          }
        };
        await updateVaccineRegisterResultMutation.mutateAsync(variables);

        toast.success('Hoàn tất tiêm chủng!');
      } else {
        toast.error('Không thể thực hiện hành động này!');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra!');
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    try {
      setLoading(true);
      if (vaccinationRegistrationId) {
        const variables = {
          id: vaccinationRegistrationId,
          vaccinationRegistrationDecideApprovalFormData: {
            status: VaccineRegistrationStatus.Completed
          }
        };
        const result = await decideApprovalMutation.mutateAsync(variables);

        queryClient.setQueryData<
          VaccineRegistrationFindResponseType | undefined
        >(
          ['vaccine-registrations', vaccineRegistrationForm.getValues()],
          (vaccinationRegistrations) => {
            if (!vaccinationRegistrations) return vaccinationRegistrations;

            let updateVaccinationRegistrationIndex =
              vaccinationRegistrations.data.findIndex(
                (vaccinationRegistration) =>
                  vaccinationRegistration.id === result.id
              );

            vaccinationRegistrations.data[updateVaccinationRegistrationIndex] =
              result;

            return vaccinationRegistrations;
          }
        );

        toast.success('Hoàn tất tiêm chủng!');
        handleCloseEditModal();
      } else {
        toast.error('Không thể thực hiện hành động này!');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra!');
    } finally {
      setLoading(false);
    }
  };

  const isCompleteButtonDisabled = () => {
    return (
      loading ||
      !data?.injectingTime ||
      !data.vaccinationSite ||
      !data.vaccineType ||
      vaccineRegistration.data?.status === VaccineRegistrationStatus.Completed
    );
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
          <Typography variant="h6">Kết quả tiêm</Typography>
          <IconButton color="default" onClick={handleCloseEditModal}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider />
        <Grid container spacing={2} p={2}>
          <Grid item xs={4}>
            <DateInput
              control={control}
              name="injectingTime"
              label="Thời điểm tiêm"
              placeholder="Thời điểm tiêm"
              errorMessage="Thời điểm tiêm không được bỏ trống và hợp lý"
              disablePast
              required
            />
          </Grid>
          <Grid item xs={4}>
            <SelectInput
              name="vaccineType"
              control={control}
              label="Loại vaccine"
              placeholder="Loại vaccine"
              errorMessage="Loại vaccine không được bỏ trống"
              selections={getSelections(vaccineTypes.data)}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <SelectInput
              name="vaccinationSite"
              control={control}
              label="Nơi tiêm"
              placeholder="Nơi tiêm"
              errorMessage="Nơi tiêm không được bỏ trống"
              selections={getSelections(vaccinationPoints.data?.data)}
              required
            />
          </Grid>
        </Grid>
        <Stack direction="row" justifyContent="end" spacing={2} p={2}>
          <Button
            type="submit"
            variant="outlined"
            disabled={loading || !isValid}>
            Cập nhật
          </Button>
          <Button
            variant="contained"
            disabled={isCompleteButtonDisabled()}
            onClick={handleComplete}>
            Hoàn tất
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default EditForm;
