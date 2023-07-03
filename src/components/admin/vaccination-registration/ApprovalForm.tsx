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
import React, { FC, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import dayPhases from '@src/utils/constants/dayPhases';
import useFindOneVaccineRegistration from '@src/api/vaccineRegistration/findOne';
import { getISODate } from '@src/utils/getISODate';
import useDecideApprovalVaccineRegistration from '@src/api/vaccineRegistration/decideApproval';
import {
  STATUS,
  VaccineRegistrationFindParamsType,
  VaccineRegistrationFindResponseType
} from '@src/api/vaccineRegistration/types';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { UseFormReturn } from 'react-hook-form';

interface ApprovalFormProps {
  approvalModalOpen: boolean;
  handleCloseApprovalModal: () => void;
  vaccinationRegistrationId: number | null;
  vaccineRegistrationForm: UseFormReturn<
    VaccineRegistrationFindParamsType,
    any
  >;
}

const ApprovalForm: FC<ApprovalFormProps> = ({
  approvalModalOpen,
  handleCloseApprovalModal,
  vaccinationRegistrationId,
  vaccineRegistrationForm
}) => {
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  const { data } = useFindOneVaccineRegistration({
    id: vaccinationRegistrationId
  });

  const { mutateAsync } = useDecideApprovalVaccineRegistration();

  const handleDecide = async (status: STATUS) => {
    try {
      setLoading(true);
      if (vaccinationRegistrationId) {
        const variables = {
          id: vaccinationRegistrationId,
          vaccinationRegistrationDecideApprovalFormData: {
            status: status
          }
        };
        const result = await mutateAsync(variables);

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

        toast.success('Phê duyệt thành công');
        handleCloseApprovalModal();
      } else {
        toast.error('Không thể thực hiện hành động này');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra!');
    } finally {
      setLoading(false);
    }
  };

  if (!data)
    return (
      <Modal open={false}>
        <p>Placeholder modal</p>
      </Modal>
    );

  return (
    <Modal
      hideBackdrop
      open={approvalModalOpen}
      onClose={handleCloseApprovalModal}>
      <Box
        sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: '4px'
        }}>
        <Stack direction="row" justifyContent="space-between" spacing={2} p={2}>
          <Typography variant="h6" onClick={() => console.log(data)}>
            Phê duyệt đăng ký tiêm chủng
          </Typography>
          <IconButton color="default" onClick={handleCloseApprovalModal}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider />
        <Stack spacing={2} p={2}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="body1">Họ và tên</Typography>
              <Typography variant="body1" fontWeight={600}>
                {data.user.fullName}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">Ngày sinh</Typography>
              <Typography variant="body1" fontWeight={600}>
                {getISODate(data.user.dob)}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">Giới tính</Typography>
              <Typography variant="body1" fontWeight={600}>
                {data.user.gender}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">
                Số CMND/CCCD/Mã định danh công dân
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {data.user.citizenIdentification}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">Số thẻ BHYT</Typography>
              <Typography variant="body1" fontWeight={600}>
                {data.user.healthInsuranceNumber}
              </Typography>
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <Typography variant="body1">Tỉnh/Thành phố</Typography>
              <Typography variant="body1" fontWeight={600}>
                {data.user.ward.district.province.name}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">Quận/Huyện</Typography>
              <Typography variant="body1" fontWeight={600}>
                {data.user.ward.district.name}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">Xã/Phường</Typography>
              <Typography variant="body1" fontWeight={600}>
                {data.user.ward.name}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">Nhóm ưu tiên</Typography>
              <Typography variant="body1" fontWeight={600}>
                {data.priorityType}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">Nghề nghiệp</Typography>
              <Typography variant="body1" fontWeight={600}>
                {data.job}
              </Typography>
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <Typography variant="body1">
                Ngày muốn được tiêm (dự kiến)
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {getISODate(data.appointmentDate)}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">Buổi tiêm mong muốn</Typography>
              <Typography variant="body1" fontWeight={600}>
                {
                  dayPhases[
                    dayPhases.findIndex(
                      (phase) => phase.value === data.dayPhase
                    )
                  ].label
                }
              </Typography>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </Stack>
        <Stack direction="row" justifyContent="end" spacing={2} p={2}>
          <Button
            variant="outlined"
            disabled={loading}
            onClick={() => handleDecide(STATUS.REJECTED)}>
            Từ chối
          </Button>
          <Button
            variant="contained"
            disabled={loading}
            onClick={() => handleDecide(STATUS.ACCEPTED)}>
            Chấp nhận
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ApprovalForm;
