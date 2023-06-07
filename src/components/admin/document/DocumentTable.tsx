'use client';

import { styled } from '@mui/material/styles';
import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import React, { FC, useState } from 'react';
import EditModal from '@components/admin/document/EditModal';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: 'none'
}));

export interface Document {
  name: string;
  file: File | null;
}

const document: Document = {
  name: 'Giới thiệu nền tảng quản lý tiêm chủng vắc xin phòng Covid - 19',
  file: null
};

const TableHeadCell: FC<{
  label: string;
  width?: string | number | undefined;
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit' | undefined;
}> = ({ label, width, align }) => {
  return (
    <TableCell align={align} width={width}>
      <Typography variant="body1" fontWeight={500}>
        {label}
      </Typography>
    </TableCell>
  );
};

const TableBodyCell: FC<{
  label: string | number;
  width?: string | number | undefined;
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit' | undefined;
}> = ({ label, width, align }) => {
  return (
    <TableCell align={align} width={width}>
      <Typography variant="body2">{label}</Typography>
    </TableCell>
  );
};

const fetchData = () => {
  return new Array<Document>(6).fill(document);
};

interface DocumentTableProps {
  readonly?: boolean;
}

const DocumentTable: FC<DocumentTableProps> = ({ readonly }) => {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [selectDocument, setSelectDocument] = useState<Document | null>(null);

  const handleOpenEditModal = (document: Document) => {
    setSelectDocument(document);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setSelectDocument(null);
    setEditModalOpen(false);
  };

  return (
    <Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell label="STT" align="center" />
              <TableHeadCell label="Tên điểm tiêm" align="center" />
              <TableHeadCell label="Thao tác" align="center" />
            </TableRow>
          </TableHead>
          <TableBody>
            {fetchData().map((document, index) => (
              <StyledTableRow key={index}>
                <TableBodyCell label={index + 1} width={'10%'} align="center" />
                <TableBodyCell label={document.name} align="left" />
                <TableCell align="center" width={'20%'}>
                  <StyledButton variant="text" size="small">
                    <a
                      href="/gioi-thieu.pdf"
                      target="_blank"
                      rel="noopener noreferrer">
                      Download FIle
                    </a>
                  </StyledButton>
                  {readonly ? null : (
                    <StyledButton
                      variant="text"
                      size="small"
                      onClick={() => handleOpenEditModal(document)}>
                      Chỉnh sửa
                    </StyledButton>
                  )}
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {readonly ? null : (
        <EditModal
          editModalOpen={editModalOpen}
          handleCloseEditModal={handleCloseEditModal}
          document={selectDocument}
        />
      )}
    </Stack>
  );
};

export default DocumentTable;
