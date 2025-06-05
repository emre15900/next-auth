'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Layout, Button, Card, Spin, Typography, Table, message, Tag, Input, Space } from 'antd';
import {
  LogoutOutlined,
  SearchOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';

const { Header, Content } = Layout;
const { Text, Title } = Typography;

export default function AdminPage() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  const roles = (user?.['https://kayraexport.com/roles'] as string[]) || [];
  const isAdmin = Array.isArray(roles) && roles.includes('admin');

  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = React.useRef<any>(null);

  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value: boolean | import('react').Key, record: any) => {
      if (typeof value !== 'string' && typeof value !== 'number') return false;
      return record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toString().toLowerCase())
        : false;
    },
    onFilterDropdownOpenChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text: string) =>
      searchedColumn === dataIndex ? (
        <span style={{ background: '#1677ff22', padding: 2, borderRadius: 4 }}>{text}</span>
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys: string[], confirm: any, dataIndex: string) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: any) => {
    clearFilters();
    setSearchText('');
  };

  const columns: ColumnsType<any> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      ...getColumnSearchProps('name'),
      ellipsis: true,
      width: 180,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      ...getColumnSearchProps('email'),
      ellipsis: true,
      width: 220,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      filters: [
        { text: 'Admin', value: 'admin' },
        { text: 'User', value: 'user' },
      ],
      onFilter: (value: boolean | import('react').Key, record: any) => {
        if (typeof value !== 'string' && typeof value !== 'number') return false;
        return record.role === value.toString();
      },
      render: (role: string) => (
        <Tag color={role === 'admin' ? 'geekblue' : 'green'} style={{ fontWeight: 500, fontSize: 14, borderRadius: 8, padding: '2px 12px' }}>
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </Tag>
      ),
      width: 120,
    },
  ];

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/login');
      } else if (!isAdmin) {
        router.push('/unauthorized');
      }
    }
  }, [user, isLoading, router, roles, isAdmin]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!isAdmin) {
          return;
        }

        setLoading(true);
        const res = await fetch('/api/users');
        if (!res.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await res.json();
        setUserList(data.users);
      } catch (err) {
        console.error('Failed to fetch users:', err);
        message.error('Failed to load users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  if (isLoading || loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#141414' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh', background: '#141414' }}>
      <Header style={{ background: '#18181c', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(0,0,0,0.25)' }}>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Text style={{
            fontSize: '22px',
            fontWeight: 700,
            background: 'linear-gradient(to right, #1677ff, #7A29DC)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginRight: 40,
            letterSpacing: 1
          }}>
            Kayra Export
          </Text>
          <nav style={{ display: 'flex', gap: 12, flex: 1 }}>
            <Link href="/dashboard" legacyBehavior>
              <a style={{
                color: '#fff',
                fontWeight: 500,
                padding: '8px 28px',
                borderRadius: 12,
                background: 'rgba(36,36,36,0.7)',
                transition: 'background 0.2s, color 0.2s',
                textDecoration: 'none',
                fontSize: 16,
                display: 'flex',
                alignItems: 'center',
                height: 44,
                boxShadow: '0 1px 4px rgba(0,0,0,0.10)',
                border: '1px solid #23232b',
                cursor: 'pointer'
              }}
                onMouseOver={e => e.currentTarget.style.background = '#23232b'}
                onMouseOut={e => e.currentTarget.style.background = 'rgba(36,36,36,0.7)'}
              >Dashboard</a>
            </Link>
            <Link href="/profile" legacyBehavior>
              <a style={{
                color: '#fff',
                fontWeight: 500,
                padding: '8px 28px',
                borderRadius: 12,
                background: 'rgba(36,36,36,0.7)',
                transition: 'background 0.2s, color 0.2s',
                textDecoration: 'none',
                fontSize: 16,
                display: 'flex',
                alignItems: 'center',
                height: 44,
                boxShadow: '0 1px 4px rgba(0,0,0,0.10)',
                border: '1px solid #23232b',
                cursor: 'pointer'
              }}
                onMouseOver={e => e.currentTarget.style.background = '#23232b'}
                onMouseOut={e => e.currentTarget.style.background = 'rgba(36,36,36,0.7)'}
              >Profile</a>
            </Link>
            <Link href="/admin" legacyBehavior>
              <a style={{
                color: '#fff',
                fontWeight: 600,
                padding: '8px 28px',
                borderRadius: 12,
                background: 'linear-gradient(90deg, #1677ff 0%, #7A29DC 100%)',
                boxShadow: '0 2px 8px rgba(22,119,255,0.10)',
                textDecoration: 'none',
                fontSize: 16,
                display: 'flex',
                alignItems: 'center',
                height: 44,
                border: 'none',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s'
              }}
                onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(22,119,255,0.18)'}
                onMouseOut={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(22,119,255,0.10)'}
              >Admin</a>
            </Link>
          </nav>
        </div>
        <Button type="primary" danger icon={<LogoutOutlined />} href="/api/auth/logout" style={{ borderRadius: 10, fontWeight: 500, height: 40, fontSize: 15, boxShadow: '0 1px 6px rgba(255,0,0,0.10)' }}>
          Sign Out
        </Button>
      </Header>

      <Content style={{ padding: '32px', maxWidth: '1220px', margin: '0 auto', width: '100%' }}>
        <Card
          style={{
            background: 'linear-gradient(135deg, #18181c 60%, #23233a 100%)',
            color: '#fff',
            boxShadow: '0 4px 24px rgba(0,0,0,0.45)',
            border: '1px solid #23232b',
            borderRadius: 18,
            overflow: 'hidden',
            marginBottom: 32
          }}
          bodyStyle={{ background: 'transparent', color: '#fff', padding: 32 }}
        >
          <Title level={4} style={{ marginBottom: '28px', color: '#fff', fontWeight: 700, letterSpacing: 0.5 }}>User Management</Title>
          <Table
            dataSource={userList}
            columns={columns}
            pagination={{ pageSize: 10, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 50], showQuickJumper: true }}
            rowKey="id"
            style={{ background: 'transparent', color: '#fff', borderRadius: 12 }}
            bordered
            size="middle"
            tableLayout="auto"
            rowClassName={() => 'dark-row'}
            scroll={{ x: 600, y: 400 }}
            sticky
            showHeader
            components={{
              header: {
                cell: (props: any) => (
                  <th
                    {...props}
                    style={{
                      ...props.style,
                      background: 'rgba(36,36,48,0.95)',
                      color: '#fff',
                      borderBottom: '1px solid #333',
                      fontWeight: 600,
                      fontSize: 15
                    }}
                  />
                )
              },
              body: {
                cell: (props: any) => (
                  <td
                    {...props}
                    style={{
                      ...props.style,
                      background: 'rgba(24,24,28,0.95)',
                      color: '#fff',
                      borderBottom: '1px solid #23232b',
                      fontSize: 15
                    }}
                  />
                )
              }
            }}
          />
        </Card>
      </Content>
    </Layout>
  );
}
