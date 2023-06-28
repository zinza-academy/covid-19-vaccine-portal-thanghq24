import { useEffect, useState } from 'react';

interface UsePaginationPropsType<T> {
  items: T[] | undefined;
  count: number | undefined;
  page: number;
  pageSize: number;
}

interface UsePaginationResult {
  pageOptions: number[];
  emptyRows: number;
  maxPage: number;
}

function usePagination<T>({
  items,
  count,
  page,
  pageSize
}: UsePaginationPropsType<T>): UsePaginationResult {
  const [pageOptions, setPageOptions] = useState([0]);
  const [emptyRows, setEmptyRows] = useState(0);
  const [maxPage, setMaxPage] = useState(0);

  useEffect(() => {
    if (items === undefined || count === undefined) return;

    const maxPage = Math.floor(count / pageSize);

    const getMaxPage = () => {
      setMaxPage(maxPage);
    };

    const getEmptyRowsNumber = () => {
      const emptyRows = pageSize - items.length;
      setEmptyRows(emptyRows);
    };

    const getPageOptions = () => {
      let pageOptions = [];
      for (let i = 0; i <= maxPage; i++) {
        pageOptions.push(i);
      }
      setPageOptions(pageOptions);
    };

    getMaxPage();
    getEmptyRowsNumber();
    getPageOptions();
  }, [items, count, page, pageSize]);

  return { pageOptions, emptyRows, maxPage };
}

export default usePagination;
