import { useMutation } from '@tanstack/react-query';
import api from '../axios';
import { Document } from './types';

const deleteDocumentApi = async (id: number) => {
  const { data } = await api.delete<Document>('documents/' + id);
  return data;
};

const useDeleteDocument = () => {
  const deleteDocumentMutation = useMutation((id: number) =>
    deleteDocumentApi(id)
  );

  return deleteDocumentMutation;
};

export default useDeleteDocument;
