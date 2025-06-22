import React, { useEffect, useState } from 'react';
import { Table, Dropdown } from 'react-bootstrap';
import { axiosInstance, USERS_URLS } from '../../../../services/urls';
import { FaEllipsisV, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { BsFilter } from 'react-icons/bs';

type User = {
  userName: string;
  isActivated: boolean;
  phoneNumber: string;
  email: string;
  modificationDate: string;
};

type SortField = 'userName' | 'isActivated' | 'phoneNumber' | 'email' | 'modificationDate';
type SortDirection = 'asc' | 'desc' | null;

export default function UsersList() {
  const [rawUsersList, setRawUsersList] = useState<User[]>([]);
  const [usersList, setUsersList] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [nameValue, setNameValue] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const getAllUsers = async (pageSize: number, pageNumber: number, userName?: string) => {
    try {
      const response = await axiosInstance.get(USERS_URLS.GET_USERS, {
        params: {
          pageSize,
          pageNumber,
          userName,
        },
      });

      const data: User[] = response.data.data;

      setRawUsersList(data);
      setTotalResults(response.data.totalNumberOfRecords);
      setTotalPages(response.data.totalNumberOfPages);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      getAllUsers(pageSize, currentPage, nameValue);
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [pageSize, currentPage, nameValue]);

  useEffect(() => {
    let filtered = [...rawUsersList];

     if (statusFilter === 'true') {
      filtered = filtered.filter(user => user.isActivated === true);
    } else if (statusFilter === 'false') {
      filtered = filtered.filter(user => user.isActivated === false);
    }

     if (sortField && sortDirection) {
      filtered.sort((a, b) => {
        let aValue: any = a[sortField];
        let bValue: any = b[sortField];

        // Handle different data types
        if (sortField === 'modificationDate') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        } else if (sortField === 'isActivated') {
          aValue = aValue ? 1 : 0;
          bValue = bValue ? 1 : 0;
        } else if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) {
          return sortDirection === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    setUsersList(filtered);
  }, [rawUsersList, statusFilter, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
       if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection(null);
        setSortField(null);
      } else {
        setSortDirection('asc');
      }
    } else {
       setSortField(field);
      setSortDirection('asc');
    }
  };

const getSortIcon = (field: SortField) => {
  const iconStyle = { fontSize: '18px', color: '#fff' };  

  if (sortField !== field) {
    return <FaSort className="ms-1" style={iconStyle} />;
  }

  if (sortDirection === 'asc') {
    return <FaSortUp className="ms-1" style={iconStyle} />;
  } else if (sortDirection === 'desc') {
    return <FaSortDown className="ms-1" style={iconStyle} />;
  }

  return <FaSort className="ms-1" style={iconStyle} />;
};


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

  return (
    <div className="container my-4">
      <h4 className="mb-4">Users List</h4>

      <div className="d-flex justify-content-start align-items-start mb-3 flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search Fleets"
          className="form-control"
          style={{ maxWidth: '300px' }}
          value={nameValue}
          onChange={(e) => {
            setNameValue(e.target.value);
            setCurrentPage(1);
          }}
        />

        <Dropdown>
          <Dropdown.Toggle
            variant="outline-secondary"
            className="d-flex align-items-center gap-2"
            id="filterDropdown"
          >
            <BsFilter />
            Filter
          </Dropdown.Toggle>

          <Dropdown.Menu className="p-3" style={{ minWidth: '220px' }}>
            <div className="mb-2">
              <label className="form-label mb-1">Status</label>
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                }}
              >
                <option value="">All</option>
                <option value="true">Active</option>
                <option value="false">Not Active</option>
              </select>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="table-responsive">
        <Table striped bordered hover className="text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th 
                className="user-select-none" 
                style={{ cursor: 'pointer' }}
                onClick={() => handleSort('userName')}
              >
                User Name
                {getSortIcon('userName')}
              </th>
              <th 
                className="user-select-none" 
                style={{ cursor: 'pointer' }}
                onClick={() => handleSort('isActivated')}
              >
                Status
                {getSortIcon('isActivated')}
              </th>
              <th 
                className="user-select-none" 
                style={{ cursor: 'pointer' }}
                onClick={() => handleSort('phoneNumber')}
              >
                Phone Number
                {getSortIcon('phoneNumber')}
              </th>
              <th 
                className="user-select-none" 
                style={{ cursor: 'pointer' }}
                onClick={() => handleSort('email')}
              >
                Email
                {getSortIcon('email')}
              </th>
              <th 
                className="user-select-none" 
                style={{ cursor: 'pointer' }}
                onClick={() => handleSort('modificationDate')}
              >
                Date Created
                {getSortIcon('modificationDate')}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersList.map((user, index) => (
              <tr key={index}>
                <td>{user.userName}</td>
                <td>
                  <span
                    className="badge"
                    style={{
                      backgroundColor: user.isActivated ? '#009247' : '#b07676',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      color: 'white',
                      fontWeight: 500,
                    }}
                  >
                    {user.isActivated ? 'Active' : 'Not Active'}
                  </span>
                </td>
                <td>{user.phoneNumber}</td>
                <td>{user.email}</td>
                <td>{user.modificationDate}</td>
                <td>
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      variant="light"
                      className="border-0 shadow-none"
                      style={{ background: 'transparent' }}
                    >
                      <FaEllipsisV />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>Block</Dropdown.Item>
                      <Dropdown.Item>View</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

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
            <option value={25}>25</option>
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
    </div>
  );
}