
import Pagination from 'react-bootstrap/Pagination';

export default function PaginationPage({ pages, funData, res }) {
  const currentPage = res.pageNumber;
  const totalPages = pages.length;
  if(totalPages <= 1){
    return
    
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
        onClick={() => currentPage > 1 && funData(3, currentPage - 1, "")}
        disabled={currentPage === 1}
      />

      {start > 1 && (
        <>
          <Pagination.Item onClick={() => funData(3, 1, "")}>1</Pagination.Item>
          <Pagination.Ellipsis disabled />
        </>
      )}

      {visiblePages.map((page) => (
        <Pagination.Item
          key={page}
          active={currentPage === page}
          onClick={() => funData(3, page, "")}
        >
          {page}
        </Pagination.Item>
      ))}

      {end < totalPages && (
        <>
          <Pagination.Ellipsis disabled />
          <Pagination.Item onClick={() => funData(3, totalPages, "")}>
            {totalPages}
          </Pagination.Item>
        </>
      )}

      <Pagination.Next
        onClick={() => currentPage < totalPages && funData(3, currentPage + 1, "")}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
}
