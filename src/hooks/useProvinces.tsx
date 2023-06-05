import { useQuery } from '@tanstack/react-query';

interface SelectionObject {
  value: string | number | string[] | undefined;
  label: string | number;
}

interface Province {
  name: string;
  code: string | number;
  division_type: string;
  codename: string;
  phone_code: number;
}

interface District {
  name: string;
  code: string | number;
  division_type: string;
  codename: string;
  district_code: number;
}

interface Ward {
  name: string;
  code: string | number;
  division_type: string;
  codename: string;
  district_code: number;
}

interface ProvinceResult extends Province {
  districts: District[];
}

interface DistrictResult extends Province {
  districts: District[];
  wards: Ward[];
}

interface WardResult extends Province {
  wards: Ward[];
}

const useProvinces = (province: string, district: string) => {
  //provinces.open-api.vn/api/p get provinces
  //provinces.open-api.vn/api/p/1?depth=2 get district array inside one province object
  //provinces.open-api.vn/api/d/7?depth=2 get ward array inside one district object
  const provinces = useQuery<ProvinceResult[]>({
    queryKey: ['province'],
    queryFn: async () => {
      const response = await fetch('https://provinces.open-api.vn/api/p/');
      if (!response.ok) {
        throw new Error('Có lỗi xảy ra');
      }
      return response.json();
    }
  });

  const districts = useQuery<DistrictResult>({
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

  const wards = useQuery<WardResult>({
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
    let selections = provinces.data
      ? provinces?.data.map((province) => {
          return { value: province.code, label: province.name };
        })
      : [];
    selections.splice(0, 0, { value: '', label: 'Không có lựa chọn' });
    return selections;
  };

  const districtSelections = (): SelectionObject[] => {
    let selections = districts.data
      ? districts?.data?.districts.map((district) => {
          return { value: district.code, label: district.name };
        })
      : [];
    selections.splice(0, 0, { value: '', label: 'Không có lựa chọn' });
    return selections;
  };

  const wardSelections = (): SelectionObject[] => {
    let selections = wards.data
      ? wards?.data?.wards.map((ward) => {
          return { value: ward.code, label: ward.name };
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
