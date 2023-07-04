import { useQuery } from '@tanstack/react-query';
import api from '../axios';
import { Document } from './types';

const findOneDocumentApi = async (id: number) => {
  const { data } = await api.get<Document>('documents/' + id);
  return data;
};

const useFindOneDocument = async (id: number) => {
  const findOneDocumentQuery = useQuery<Document>({
    queryKey: ['document', id],
    queryFn: () => findOneDocumentApi(id)
  });

  return findOneDocumentQuery;
};

export default useFindOneDocument;
