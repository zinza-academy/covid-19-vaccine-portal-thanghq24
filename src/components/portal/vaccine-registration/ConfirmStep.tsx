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
  FormStepProps
} from '@src/app/portal/vaccine-registration/page';
import React, { FC, useState } from 'react';
import Shield from '@public/images/shield 1.png';
import Vaccine from '@public/images/vaccine2 1.png';
import Hospital from '@public/images/hospital 1.png';
import Image from 'next/image';

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

const ConfirmStep: FC<FormStepProps> = ({ setStep }) => {
  const [agreement, setAgreement] = useState(false);
  const handleChange = () => {
    setAgreement((prev) => !prev);
  };
  const stepBack = () => {
    setStep((prev) => (prev - 1) as AvailableSteps);
  };
  const stepForward = () => {
    setStep((prev) => (prev + 1) as AvailableSteps);
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
        {/* We should call the registration api call to server and clear the current form after */}
        <Button variant="contained" disabled={!agreement} onClick={stepForward}>
          Tiếp tục
        </Button>
      </Stack>
    </Stack>
  );
};

export default ConfirmStep;
