export interface File {
  id: number;
}

export interface FileWithBuffer extends File {
  fileContent: {
    type: string;
    data: Buffer;
  };
}

export interface Document {
  id: number;
  name: string;
  file: File | FileWithBuffer;
}

export interface DocumentCreateFormData {
  name: string;
  file: File;
}

export interface DocumentUpdateFormData extends DocumentCreateFormData {
  id: number;
}
