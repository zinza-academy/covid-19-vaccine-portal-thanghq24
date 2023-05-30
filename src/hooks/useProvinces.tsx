import { useQuery } from '@tanstack/react-query';

interface SelectionObject {
  value: string | number | boolean;
  label: string | number;
}

const useProvinces = (province: string, district: string) => {
  //provinces.open-api.vn/api/p get provinces
  //provinces.open-api.vn/api/p/1?depth=2 get district array inside one province object
  //provinces.open-api.vn/api/d/7?depth=2 get ward array inside one district object
  const provinces = useQuery({
    queryKey: ['province'],
    queryFn: async () => {
      const response = await fetch('https://provinces.open-api.vn/api/p/');
      if (!response.ok) {
        throw new Error('Có lỗi xảy ra');
      }
      return response.json();
    }
  });

  const districts = useQuery({
    queryKey: ['district', province],
    queryFn: async () => {
      const response = await fetch(
        `https://provinces.open-api.vn/api/p/${province}?depth=2`
      );
      if (!response.ok) {
        throw new Error('Có lỗi xảy ra');
      }
      return response.json();
    },
    enabled: !!province
  });

  const wards = useQuery({
    queryKey: ['district', district],
    queryFn: async () => {
      const response = await fetch(
        `https://provinces.open-api.vn/api/d/${district}?depth=2`
      );
      if (!response.ok) {
        throw new Error('Có lỗi xảy ra');
      }
      return response.json();
    },
    enabled: !!district
  });

  const provinceSelections = (): SelectionObject[] => {
    return provinces?.data
      ? // @ts-ignore
        provinces.data.map((province, index) => {
          return { value: province.code, label: province.name };
        })
      : [];
  };

  const districtSelections = (): SelectionObject[] => {
    return districts.data?.districts
      ? // @ts-ignore
        districts.data.districts.map((province, index) => {
          return { value: province.code, label: province.name };
        })
      : [];
  };

  const wardSelections = (): SelectionObject[] => {
    return wards.data?.wards
      ? // @ts-ignore
        wards.data.wards.map((province, index) => {
          return { value: province.code, label: province.name };
        })
      : [];
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
