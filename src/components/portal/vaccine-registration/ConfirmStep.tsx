import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography
} from '@mui/material';
import {
  AvailableSteps,
  VaccineRegistrationConfirmStepProps
} from '@src/app/(mainPage)/portal/vaccine-registration/page';
import React, { FC, useState } from 'react';
import Shield from '@public/images/shield 1.png';
import Vaccine from '@public/images/vaccine2 1.png';
import Hospital from '@public/images/hospital 1.png';
import Image from 'next/image';
import { toast } from 'react-toastify';
import useCreateVaccineRegistration from '@src/api/vaccineRegistration/create';
import { useAppDispatch, useAppSelector } from '@src/hooks/reduxHook';
import { logout, selectUserData } from '@src/redux/userSlice';
import { getISODate } from '@src/utils/getISODate';

const agreements = [
  {
    icon: Shield,
    label:
      'Tiêm chủng vắc xin là biện pháp phòng chống dịch hiệu quả, tuy nhiên vắc xin phòng COVID-19 có thể không phòng được bệnh hoàn toàn. Người được tiêm chủng vắc xin phòng COVID-19 có thể phòng được bệnh hoặc giảm mức độ nặng nếu mắc bệnh. Tuy nhiên, sau khi tiêm chủng vẫn phải tiếp tục thực hiện nghiêm các biện pháp phòng chống dịch theo quy định.'
  },
  {
    icon: Vaccine,
    label:
      'Tiêm chủng vắc xin phòng COVID-19 có thể gây ra một số biểu hiện tại chỗ tiêm hoặc toàn thân như sưng, đau chỗ tiêm, nhức đầu, buồn nôn, sốt, đau cơ…hoặc tai biến nặng sau tiêm chủng. Tiêm vắc xin mũi 2 do Pfizer sản xuất ở người đã tiêm mũi 1 bằng vắc xin AstraZeneca có thể tăng khả năng xảy ra phản ứng thông thường sau tiêm chủng.'
  },
  {
    icon: Hospital,
    label:
      'Khi có triệu chứng bất thường về sức khỏe, người được tiêm chủng cần đến ngay cơ sở y tế gần nhất để được tư vấn, thăm khám và điều trị kịp thời.'
  }
];

const ConfirmStep: FC<VaccineRegistrationConfirmStepProps> = ({
  setStep,
  vaccineRegistrationForm,
  setRegisterResponse
}) => {
  const [agreement, setAgreement] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUserData);

  const { getValues } = vaccineRegistrationForm;

  const { mutateAsync } = useCreateVaccineRegistration();

  const handleChange = () => {
    setAgreement((prev) => !prev);
  };

  const stepBack = () => {
    setStep((prev) => (prev - 1) as AvailableSteps);
  };

  const confirmRegister = async () => {
    try {
      setLoading(true);
      const registerData = getValues();
      registerData.appointmentDate = registerData.appointmentDate
        ? getISODate(registerData.appointmentDate)
        : null;

      if (!userData.id) {
        toast.error('Vui lòng đăng nhập lại');
        dispatch(logout);
      } else {
        const registerResponse = await mutateAsync({
          ...registerData,
          user: userData.id
        });
        setRegisterResponse(registerResponse);

        toast.success('Đăng ký thành công');
        setStep((prev) => (prev + 1) as AvailableSteps);
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={2}>
      <Stack divider={<Divider sx={{ my: 2 }} />}>
        <Stack spacing={1}>
          {agreements.map((item, index) => (
            <Stack key={index} direction="row" spacing={1}>
              <Image
                src={item.icon}
                alt="agreement-icon"
                width={24}
                height={24}
              />
              <Typography>
                {index + 1}. {item.label}
              </Typography>
            </Stack>
          ))}
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="body1">
            Sau khi đã đọc các thông tin nêu trên, tôi đã hiểu về các nguy cơ
            và:{' '}
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={agreement} onChange={handleChange} />}
              label="Đồng ý tiêm chủng"
            />
          </FormGroup>
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Button variant="outlined" onClick={stepBack}>
          Quay lại
        </Button>
        <Button
          variant="contained"
          disabled={!agreement || loading}
          onClick={confirmRegister}>
          Đăng ký
        </Button>
      </Stack>
    </Stack>
  );
};

export default ConfirmStep;
