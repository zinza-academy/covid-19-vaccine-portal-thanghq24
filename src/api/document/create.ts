import { useMutation } from '@tanstack/react-query';
import { fileApi } from '../axios';
import { Document, DocumentCreateFormData } from './types';

const createDocumentApi = async (
  createDocumentFormData: DocumentCreateFormData
) => {
  const { data } = await fileApi.post<Document>(
    'documents',
    createDocumentFormData
  );
  return data;
};

const useCreateDocument = () => {
  const createDocumentMutation = useMutation(
    (createDocumentFormData: DocumentCreateFormData) =>
      createDocumentApi(createDocumentFormData)
  );

  return createDocumentMutation;
};

export default useCreateDocument;
