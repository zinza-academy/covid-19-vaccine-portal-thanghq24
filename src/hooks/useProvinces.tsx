import { useQuery } from '@tanstack/react-query';

interface SelectionObject {
  value: string | number | string[] | undefined;
  label: string | number;
}

export interface Province {
  name: string;
  id: number | string;
}

export interface District {
  name: string;
  id: number | string;
  provinceId: number | string;
}

export interface Ward {
  name: string;
  id: number | string;
  districtId: number | string;
}

const useProvinces = (province: string | number, district: string | number) => {
  const apiPrefix = process.env.NEXT_PUBLIC_API_URL;

  const provinces = useQuery<Province[]>({
    queryKey: ['province'],
    queryFn: async () => {
      const response = await fetch(apiPrefix + 'provinces');
      if (!response.ok) {
        throw new Error('Có lỗi xảy ra');
      }
      return response.json();
    }
  });

  const districts = useQuery<District[]>({
    queryKey: ['district', province],
    queryFn: async () => {
      const response = await fetch(
        `${apiPrefix}districts/by-province/${province}`
      );
      if (!response.ok) {
        throw new Error('Có lỗi xảy ra');
      }
      return response.json();
    },
    enabled: !!province
  });

  const wards = useQuery<Ward[]>({
    queryKey: ['ward', district],
    queryFn: async () => {
      const response = await fetch(`${apiPrefix}wards/by-district/${district}`);
      if (!response.ok) {
        throw new Error('Có lỗi xảy ra');
      }
      return response.json();
    },
    enabled: !!district
  });

  const provinceSelections = (): SelectionObject[] => {
    let selections = provinces.data
      ? provinces?.data.map((province) => {
          return { value: province.id, label: province.name };
        })
      : [];
    selections.splice(0, 0, { value: '', label: 'Không có lựa chọn' });
    return selections;
  };

  const districtSelections = (): SelectionObject[] => {
    let selections = districts.data
      ? districts?.data.map((district) => {
          return { value: district.id, label: district.name };
        })
      : [];
    selections.splice(0, 0, { value: '', label: 'Không có lựa chọn' });
    return selections;
  };

  const wardSelections = (): SelectionObject[] => {
    let selections = wards.isSuccess
      ? wards?.data.map((ward) => {
          return { value: ward.id, label: ward.name };
        })
      : [];
    selections.splice(0, 0, { value: '', label: 'Không có lựa chọn' });
    return selections;
  };

  return {
    provinces,
    districts,
    wards,
    provinceSelections,
    districtSelections,
    wardSelections
  };
};

export default useProvinces;
