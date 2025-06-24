
import Pagination from 'react-bootstrap/Pagination';
import { paginationPageProps } from '../../../../interfaces/interface';

export default function PaginationPage({ pages, funData, pageData }:paginationPageProps) {
  if(pageData === null) return null;
  const currentPage = pageData.pageNumber;
  const totalPages = pages.length;
  const pageSize = 5;
  if(totalPages <= 1){
    return null
  }

  const maxVisiblePages = 5;

  let start = 1;
  let end = maxVisiblePages;

  if (currentPage > Math.floor(maxVisiblePages / 2)) {
    start = currentPage - Math.floor(maxVisiblePages / 2);
    end = start + maxVisiblePages - 1;
  }

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(end - maxVisiblePages + 1, 1);
  }

  const visiblePages = [];
  for (let i = start; i <= end; i++) {
    visiblePages.push(i);
  }
  
  return (
    <Pagination className='m-3 d-flex justify-content-center'>

      <Pagination.Prev
        onClick={() => currentPage > 1 && funData(currentPage - 1, pageSize,  "")}
        disabled={currentPage === 1}
      />

      {start > 1 && (
        <>
          <Pagination.Item onClick={() => funData(1, pageSize,  "")}>1</Pagination.Item>
          <Pagination.Ellipsis disabled />
        </>
      )}

      {visiblePages.map((page) => (
        <Pagination.Item
          key={page}
          active={currentPage === page}
          onClick={() => funData(page, pageSize,  "")}
        >
          {page}
        </Pagination.Item>
      ))}

      {end < totalPages && (
        <>
          <Pagination.Ellipsis disabled />
          <Pagination.Item onClick={() => funData(totalPages, pageSize,  "")}>
            {totalPages}
          </Pagination.Item>
        </>
      )}

      <Pagination.Next
        onClick={() => currentPage < totalPages && funData( currentPage + 1, pageSize, "")}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
}

