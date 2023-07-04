import { useMutation } from '@tanstack/react-query';
import api from '../axios';
import { Document, DocumentUpdateFormData } from './types';

const updateDocumentApi = async (
  id: number,
  updateDocumentFormData: DocumentUpdateFormData
) => {
  const { data } = await api.patch<Document>(
    'documents/' + id,
    updateDocumentFormData
  );
  return data;
};

const useUpdateDocument = async () => {
  const updateDocumentMutation = useMutation(
    (variables: {
      id: number;
      updateDocumentFormData: DocumentUpdateFormData;
    }) => updateDocumentApi(variables.id, variables.updateDocumentFormData)
  );

  return updateDocumentMutation;
};

export default useUpdateDocument;
