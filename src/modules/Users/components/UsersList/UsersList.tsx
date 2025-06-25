import React, { useEffect, useState } from 'react';
import { Table, Input, Select, Dropdown, Menu, Modal, Button, Card, Avatar } from 'antd';
import { FaChevronLeft, FaChevronRight, FaEllipsisV, FaUser } from 'react-icons/fa';
import { axiosInstance, USERS_URLS } from '../../../../services/urls';
import './UsersListAntD.css';

const { Option } = Select;
const { Search } = Input;

type User = {
  id: number;
  userName: string;
  isActivated: boolean;
  phoneNumber: string;
  email: string;
  modificationDate: string;
};

export default function UsersListAntD() {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const [nameValue, setNameValue] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const getAllUsers = async (pageSize: number, pageNumber: number, userName?: string) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(USERS_URLS.GET_USERS, {
        params: { pageSize, pageNumber, userName },
      });
      const data: User[] = response.data.data.map((user: User) => ({
        ...user,
        key: user.id,
      }));
      setUsersList(data);
      setTotalResults(response.data.totalNumberOfRecords);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      getAllUsers(pageSize, currentPage, nameValue);
    }, 400);
    return () => clearTimeout(delay);
  }, [pageSize, currentPage, nameValue]);

  const handleBlockUser = async () => {
    if (!selectedUser) return;
    try {
      await axiosInstance.put(USERS_URLS.UPDATE_USER_STATUS(selectedUser.id));
      setIsBlockModalVisible(false);
      getAllUsers(pageSize, currentPage, nameValue);
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  };

  const columns = [
    {
      title: 'User Name',
      dataIndex: 'userName',
      sorter: (a: User, b: User) => a.userName.localeCompare(b.userName),
    },
    {
      title: 'Status',
      dataIndex: 'isActivated',
      filters: [
        { text: 'Active', value: 'true' },
        { text: 'Not Active', value: 'false' },
      ],
      onFilter: (value: string, record: User) => String(record.isActivated) === value,
      render: (isActivated: boolean) => (
        <span className={`badge badge-animated ${isActivated ? 'badge-active' : 'badge-inactive'}`}>
          {isActivated ? 'Active' : 'Not Active'}
        </span>
      ),
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      sorter: (a: User, b: User) => a.phoneNumber.localeCompare(b.phoneNumber),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a: User, b: User) => a.email.localeCompare(b.email),
    },
    {
      title: 'Date Created',
      dataIndex: 'modificationDate',
      sorter: (a: User, b: User) => new Date(a.modificationDate).getTime() - new Date(b.modificationDate).getTime(),
    },
    {
      title: 'Actions',
      render: (_: any, user: User) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item onClick={() => { setSelectedUser(user); setIsBlockModalVisible(true); }}>
                {user.isActivated ? 'Block' : 'Unblock'}
              </Menu.Item>
              <Menu.Item onClick={() => { setSelectedUser(user); setIsModalVisible(true); }}>
                View
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <a onClick={(e) => e.preventDefault()}>
            <FaEllipsisV style={{ fontSize: '16px' }} />
          </a>
        </Dropdown>
      ),
    },
  ];

  const UserCard = ({ user }: { user: User }) => (
    <Card style={{ marginBottom: 16, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex' }}>
          <Avatar size={48} icon={<FaUser />} style={{ backgroundColor: '#1890ff', marginRight: 12 }} />
          <div>
            <h4 style={{ margin: 0 }}>{user.userName}</h4>
            <div style={{ fontSize: '12px', color: '#666' }}>
              <div>Email: {user.email}</div>
              <div>Phone: {user.phoneNumber}</div>
            </div>
            <span className={`badge badge-animated ${user.isActivated ? 'badge-active' : 'badge-inactive'}`}>
              {user.isActivated ? 'Active' : 'Not Active'}
            </span>
          </div>
        </div>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item onClick={() => { setSelectedUser(user); setIsBlockModalVisible(true); }}>
                {user.isActivated ? 'Block' : 'Unblock'}
              </Menu.Item>
              <Menu.Item onClick={() => { setSelectedUser(user); setIsModalVisible(true); }}>
                View
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button type="text" icon={<FaEllipsisV />} />
        </Dropdown>
      </div>
    </Card>
  );

  const filteredUsers = statusFilter
    ? usersList.filter((u) => String(u.isActivated) === statusFilter)
    : usersList;

  return (
    <div className="container my-4">
      <h4 className="mb-4">Users List</h4>

      <div className="d-flex flex-column flex-md-row gap-3 mb-3">
        <Search
          placeholder="Search Users"
          value={nameValue}
          onChange={(e) => {
            setNameValue(e.target.value);
            setCurrentPage(1);
          }}
          style={{ maxWidth: isMobile ? '100%' : '300px', width: '100%' }}
          allowClear
        />

        <Select
          placeholder="Filter by Status"
          onChange={(value) => setStatusFilter(value)}
          value={statusFilter || undefined}
          style={{ minWidth: isMobile ? '100%' : '220px', width: '100%' }}
          allowClear
        >
          <Option value="">All</Option>
          <Option value="true">Active</Option>
          <Option value="false">Not Active</Option>
        </Select>
      </div>


      {isMobile ? (
        <div>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>
          ) : (
            <>
              {filteredUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
             
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '8px' }}>
                <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} size="small">Previous</Button>
                <span>{currentPage} / {Math.ceil(totalResults / pageSize)}</span>
                <Button disabled={currentPage >= Math.ceil(totalResults / pageSize)} onClick={() => setCurrentPage(currentPage + 1)} size="small">Next</Button>
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          <Table
            className="custom-table zebra-rows"
            columns={columns}
            dataSource={filteredUsers}
            loading={loading}
            pagination={false}
            bordered
            rowClassName={(_, index) => index % 2 === 0 ? 'zebra-row-light' : 'zebra-row-dark'}
            scroll={{ x: 'max-content' }}
          />

          <div style={{ display: 'flex', justifyContent: 'End', alignItems: 'center', marginTop: 24, gap: 16 }}>
            <span>
              Showing{' '}
              <Select
                size="small"
                value={pageSize}
                onChange={(value) => {
                  setPageSize(value);
                  setCurrentPage(1);
                }}
                style={{ width: 70 }}
              >
                <Option value={10}>10</Option>
                <Option value={25}>25</Option>
                <Option value={50}>50</Option>
              </Select>{' '}
              of {totalResults} Results
            </span>

            <span>
              Page {currentPage} of {Math.ceil(totalResults / pageSize)}
            </span>

            <Button
              type="text"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              icon={<FaChevronLeft />}
            />

            <Button
              type="text"
              disabled={currentPage >= Math.ceil(totalResults / pageSize)}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              icon={<FaChevronRight />}
            />
          </div>
        </>
      )}

       <Modal
        title="  User Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={<Button type="primary" onClick={() => setIsModalVisible(false)}>Close</Button>}
      >
        {selectedUser && (
          <div style={{ lineHeight: '2', paddingTop: '10px' }}>
            <p><strong>Name:</strong> {selectedUser.userName}</p>
            <p><strong>Status:</strong> {selectedUser.isActivated ? 'Active' : 'Not Active'}</p>
            <p><strong>Phone:</strong> {selectedUser.phoneNumber}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Date Created:</strong> {selectedUser.modificationDate}</p>
          </div>
        )}
      </Modal>

       <Modal
        title="  Confirm Action"
        visible={isBlockModalVisible}
        onCancel={() => setIsBlockModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsBlockModalVisible(false)}>Cancel</Button>,
          <Button key="confirm" type="primary" danger onClick={handleBlockUser}>
            {selectedUser?.isActivated ? 'Block' : 'Unblock'}
          </Button>,
        ]}
      >
        <p style={{ marginTop: '10px' }}>
          Are you sure you want to <strong>{selectedUser?.isActivated ? 'Block' : 'Unblock'}</strong> this user?
        </p>
      </Modal>
    </div>
  );
}
