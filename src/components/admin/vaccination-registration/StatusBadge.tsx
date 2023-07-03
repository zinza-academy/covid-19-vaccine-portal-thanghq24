import { Chip } from '@mui/material';
import { STATUS } from '@src/api/vaccineRegistration/types';
import { FC } from 'react';

interface StatusBadgeProps {
  status: STATUS;
}

const getBadgeColor = (status: STATUS) => {
  switch (status) {
    case STATUS.REQUESTED:
      return 'default';
    case STATUS.ACCEPTED:
      return 'primary';
    case STATUS.REJECTED:
      return 'warning';
    case STATUS.COMPLETED:
      return 'success';
  }
};

const getBadgeLabel = (status: STATUS) => {
  switch (status) {
    case STATUS.REQUESTED:
      return 'Đăng ký thành công';
    case STATUS.ACCEPTED:
      return 'Đã được chấp nhận';
    case STATUS.REJECTED:
      return 'Đã bị từ chối';
    case STATUS.COMPLETED:
      return 'Đã hoàn thành tiêm';
  }
};

const StatusBadge: FC<StatusBadgeProps> = ({ status }) => (
  <Chip color={getBadgeColor(status)} label={getBadgeLabel(status)} />
);

export default StatusBadge;
