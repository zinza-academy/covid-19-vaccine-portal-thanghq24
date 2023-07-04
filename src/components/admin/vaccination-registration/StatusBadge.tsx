import { Chip } from '@mui/material';
import { VaccineRegistrationStatus } from '@src/api/vaccineRegistration/types';
import { FC } from 'react';

interface StatusBadgeProps {
  status: VaccineRegistrationStatus;
}

const getBadgeColor = (status: VaccineRegistrationStatus) => {
  switch (status) {
    case VaccineRegistrationStatus.Requested:
      return 'default';
    case VaccineRegistrationStatus.Accepted:
      return 'primary';
    case VaccineRegistrationStatus.Rejected:
      return 'warning';
    case VaccineRegistrationStatus.Completed:
      return 'success';
  }
};

const getBadgeLabel = (status: VaccineRegistrationStatus) => {
  switch (status) {
    case VaccineRegistrationStatus.Requested:
      return 'Đăng ký thành công';
    case VaccineRegistrationStatus.Accepted:
      return 'Đã được chấp nhận';
    case VaccineRegistrationStatus.Rejected:
      return 'Đã bị từ chối';
    case VaccineRegistrationStatus.Completed:
      return 'Đã hoàn thành tiêm';
  }
};

const StatusBadge: FC<StatusBadgeProps> = ({ status }) => (
  <Chip color={getBadgeColor(status)} label={getBadgeLabel(status)} />
);

export default StatusBadge;
