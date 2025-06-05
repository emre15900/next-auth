'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Layout, Menu, Button, Card, Spin, Typography, Descriptions, Avatar, Tag } from 'antd';
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
              >Profile</a>
            </Link>
            {Array.isArray(user?.['https://kayraexport.com/roles']) && user['https://kayraexport.com/roles'].includes('admin') && (
              <Link href="/admin" legacyBehavior>
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
                >Admin</a>
              </Link>
            )}
          </nav>
        </div>
        <Button type="primary" danger icon={<LogoutOutlined />} href="/api/auth/logout" style={{ borderRadius: 10, fontWeight: 500, height: 40, fontSize: 15, boxShadow: '0 1px 6px rgba(255,0,0,0.10)' }}>
          Sign Out
        </Button>
      </Header>

      <Content style={{ padding: '24px', margin: '0 auto', maxWidth: '1210px', width: '100%' }}>
        <Card>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <Avatar
              size={100}
              src={user.picture}
            />
            <Title level={2}>{user.name}</Title>
          </div>
          <Descriptions bordered>
            <Descriptions.Item label="Email" span={3}>{user.email}</Descriptions.Item>
            <Descriptions.Item label="Nickname" span={3}>{user.nickname}</Descriptions.Item>
            <Descriptions.Item label="Roles" span={3}>
              {Array.isArray(user['https://kayraexport.com/roles']) && user['https://kayraexport.com/roles'].length > 0 ? (
                user['https://kayraexport.com/roles'].map((role: string) => (
                  <Tag key={role} style={{ background: role === 'admin' ? 'navy' : 'green', marginRight: 6, fontWeight: 500, fontSize: 14, borderRadius: 8, padding: '2px 12px' }}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </Tag>
                ))
              ) : (
                <span style={{ color: '#888' }}>No roles assigned</span>
              )}
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