import { useQuery } from '@tanstack/react-query';
import api from '../axios';
import { Document } from './types';

const findOneDocumentApi = async (id: number | null) => {
  const { data } = await api.get<Document>('documents/' + id);
  return data;
};

const useFindOneDocument = (id: number | null) => {
  const findOneDocumentQuery = useQuery<Document>({
    queryKey: ['document', id],
    queryFn: () => findOneDocumentApi(id),
    enabled: !!id
  });

  return findOneDocumentQuery;
};

export default useFindOneDocument;
