import { useMutation } from '@tanstack/react-query';
import api from '../axios';
import { Document, DocumentCreateFormData } from './types';

const createDocumentApi = async (
  createDocumentFormData: DocumentCreateFormData
) => {
  const { data } = await api.post<Document>(
    'documents',
    createDocumentFormData
  );
  return data;
};

const useCreateDocument = async () => {
  const createDocumentMutation = useMutation(
    (createDocumentFormData: DocumentCreateFormData) =>
      createDocumentApi(createDocumentFormData)
  );

  return createDocumentMutation;
};

export default useCreateDocument;
