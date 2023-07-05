import { useMutation } from '@tanstack/react-query';
import { fileApi } from '../axios';
import { Document, DocumentUpdateFormData } from './types';

const updateDocumentApi = async (
  id: number | undefined,
  updateDocumentFormData: DocumentUpdateFormData
) => {
  const { data } = await fileApi.patch<Document>(
    'documents/' + id,
    updateDocumentFormData
  );
  return data;
};

const useUpdateDocument = () => {
  const updateDocumentMutation = useMutation(
    (variables: {
      id: number | undefined;
      updateDocumentFormData: DocumentUpdateFormData;
    }) => updateDocumentApi(variables.id, variables.updateDocumentFormData)
  );

  return updateDocumentMutation;
};

export default useUpdateDocument;
