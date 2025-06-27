
import { useEffect, useState } from 'react';

interface TPagination{
  totalPages:number, totalResults: number,getAllData:any
}
export default function PaginationTest({totalPages ,totalResults ,getAllData}:TPagination){
  
  
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setPageSize(parseInt(e.target.value));
      setCurrentPage(1);
    };
    const handlePrev = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
  
    const handleNext = () => {
      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  
    };
   useEffect(() => {
        getAllData(currentPage,pageSize, "");
    }, [pageSize, currentPage]);
  return(
    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 my-3">
        <div className="d-flex align-items-center gap-2">
          <span>Showing</span>
          <select
            className="form-select"
            style={{ width: '80px' }}
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
          </select>
          <span>of {totalResults} Results</span>
        </div>
        <div className="d-flex align-items-center gap-3">
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button className="btn btn-outline-dark px-3" onClick={handlePrev} disabled={currentPage === 1}>
            &#x276E;
          </button>
          <button className="btn btn-outline-dark px-3" onClick={handleNext} disabled={currentPage === totalPages}>
            &#x276F;
          </button>
        </div>
      </div>
  )
}

