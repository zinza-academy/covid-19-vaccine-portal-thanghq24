import { useQuery } from '@tanstack/react-query';
import api from '../axios';
import { Document } from './types';

const findDocumentApi = async () => {
  const { data } = await api.get<Document[]>('documents');
  return data;
};

const useFindDocument = () => {
  const findDocumentQuery = useQuery<Document[]>({
    queryKey: ['documents'],
    queryFn: () => findDocumentApi()
  });

  return findDocumentQuery;
};

export default useFindDocument;
