'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Layout, Menu, Button, Card, Spin, Typography, Table } from 'antd';
import {
  LogoutOutlined,
  DashboardOutlined,
  UserOutlined,
  SettingOutlined
} from '@ant-design/icons';

const { Header, Content } = Layout;
const { Text, Title } = Typography;

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Role', dataIndex: 'role', key: 'role' },
];

export default function AdminPage() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  const roles = (user?.['https://kayraexport.com/roles'] as string[]) || [];

  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/');
      } else if (!roles.includes('admin')) {
        router.push('/unauthorized');
      }
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/users');
        const data = await res.json();
        setUserList(data.users);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setLoading(false);
      }
    };

    if (roles.includes('admin')) {
      fetchUsers();
    }
  }, [roles]);

  if (isLoading || loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#141414' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh', background: '#141414' }}>
      <Header style={{ background: '#1f1f1f', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Text style={{
            fontSize: '20px',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #1677ff, #7A29DC)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Admin Panel
          </Text>
          <Menu mode="horizontal" theme="dark" style={{ background: 'transparent', marginLeft: '24px' }} selectedKeys={['admin']}>
            <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
              <Link href="/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="profile" icon={<UserOutlined />}>
              <Link href="/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item key="admin" icon={<SettingOutlined />}>
              <Link href="/admin">Admin</Link>
            </Menu.Item>
          </Menu>
        </div>
        <Button type="primary" danger icon={<LogoutOutlined />} href="/api/auth/logout">
          Sign Out
        </Button>
      </Header>

      <Content style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <Card>
          <Title level={4} style={{ marginBottom: '24px' }}>User Management</Title>
          <Table dataSource={userList} columns={columns} pagination={{ pageSize: 10 }} rowKey="id" />
        </Card>
      </Content>
    </Layout>
  );
}
