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
import React, { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { VaccinationRegistration } from './VaccinationRegistrationTable';
import dayjs from 'dayjs';
import dayPhases from '@src/utils/constants/dayPhases';

interface ApprovalFormProps {
  approvalModalOpen: boolean;
  handleCloseApprovalModal: () => void;
  vaccinationRegistration: VaccinationRegistration | null;
}

const ApprovalForm: FC<ApprovalFormProps> = ({
  approvalModalOpen,
  handleCloseApprovalModal,
  vaccinationRegistration
}) => {
  const handleAccept = () => {
    alert('try to accept a vaccination registration');
    handleCloseApprovalModal();
  };

  const handleReject = () => {
    alert('try to reject a vaccination registration');
    handleCloseApprovalModal();
  };

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
          <Typography
            variant="h6"
            onClick={() => console.log(vaccinationRegistration)}>
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
                {vaccinationRegistration?.fullName}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">Ngày sinh</Typography>
              <Typography variant="body1" fontWeight={600}>
                {dayjs(vaccinationRegistration?.dob).format('DD/MM/YYYY')}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">Giới tính</Typography>
              <Typography variant="body1" fontWeight={600}>
                {vaccinationRegistration?.gender}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">
                Số CMND/CCCD/Mã định danh công dân
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {vaccinationRegistration?.citizenIdentification}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">Số thẻ BHYT</Typography>
              <Typography variant="body1" fontWeight={600}></Typography>
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <Typography variant="body1">Tỉnh/Thành phố</Typography>
              <Typography variant="body1" fontWeight={600}>
                {vaccinationRegistration?.province}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">Quận/Huyện</Typography>
              <Typography variant="body1" fontWeight={600}>
                {vaccinationRegistration?.district}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">Xã/Phường</Typography>
              <Typography variant="body1" fontWeight={600}>
                {vaccinationRegistration?.ward}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">Nhóm ưu tiên</Typography>
              <Typography variant="body1" fontWeight={600}>
                {vaccinationRegistration?.priorityType}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">Nghề nghiệp</Typography>
              <Typography variant="body1" fontWeight={600}>
                {vaccinationRegistration?.job}
              </Typography>
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <Typography variant="body1">
                Ngày muốn được tiêm (dự kiến)
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {dayjs(vaccinationRegistration?.appointmentDate).format(
                  'DD/MM/YYYY'
                )}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">Buổi tiêm mong muốn</Typography>
              <Typography variant="body1" fontWeight={600}>
                {vaccinationRegistration?.dayPhase
                  ? dayPhases[
                      dayPhases.findIndex(
                        (phase) =>
                          phase.value === vaccinationRegistration.dayPhase
                      )
                    ].label
                  : ''}
              </Typography>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </Stack>
        <Stack direction="row" justifyContent="end" spacing={2} p={2}>
          <Button variant="outlined" onClick={handleReject}>
            Từ chối
          </Button>
          <Button variant="contained" onClick={handleAccept}>
            Chấp nhận
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ApprovalForm;
