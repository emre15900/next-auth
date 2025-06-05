'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Layout, Menu, Button, Card, Spin, Typography, Descriptions, Avatar } from 'antd';
import { LogoutOutlined, DashboardOutlined, UserOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

export default function Profile() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoading) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#141414' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!user) {
    return null;
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
          <Menu
            mode="horizontal"
            theme="dark"
            style={{ background: 'transparent', marginLeft: '24px' }}
            selectedKeys={['profile']}
          >
            <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
              <Link href="/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="profile" icon={<UserOutlined />}>
              <Link href="/profile">Profile</Link>
            </Menu.Item>
          </Menu>
        </div>
        <Button
          type="primary"
          danger
          icon={<LogoutOutlined />}
          href="/api/auth/logout"
        >
          Sign Out
        </Button>
      </Header>

      <Content style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
        <Card>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <Avatar
              size={100}
              src={user.picture}
              style={{ marginBottom: '16px' }}
            />
            <Title level={2}>{user.name}</Title>
          </div>
          <Descriptions bordered>
            <Descriptions.Item label="Email" span={3}>{user.email}</Descriptions.Item>
            <Descriptions.Item label="Nickname" span={3}>{user.nickname}</Descriptions.Item>
            <Descriptions.Item label="Roles" span={3}>
              {(user['https://kayraexport.com/roles'] as string[] || []).join(', ') || 'No roles assigned'}
            </Descriptions.Item>
            <Descriptions.Item label="Email Verified" span={3}>
              {user.email_verified ? 'Yes' : 'No'}
            </Descriptions.Item>
            <Descriptions.Item label="Last Updated" span={3}>
              {user.updated_at ? new Date(user.updated_at).toLocaleString() : 'Not available'}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Content>
    </Layout>
  );
}