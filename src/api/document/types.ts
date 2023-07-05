export interface FileData {
  id: number;
  path: string;
}

export interface Document {
  id: number;
  name: string;
  file: FileData;
}

export interface DocumentCreateFormData {
  name: string;
  file: File | null;
}

export interface DocumentUpdateFormData extends DocumentCreateFormData {}
