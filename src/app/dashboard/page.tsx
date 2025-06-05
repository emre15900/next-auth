'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Layout, Menu, Button, Card, Row, Col, Spin, Typography, Statistic } from 'antd';
import {
  LogoutOutlined,
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  WarningOutlined,
  DollarOutlined,
  TeamOutlined,
  RiseOutlined
} from '@ant-design/icons';

const { Header, Content } = Layout;
const { Text } = Typography;

export default function Dashboard() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  const roles = (user?.['https://kayraexport.com/roles'] as string[]) || [];
  const isAdmin = Array.isArray(roles) && roles.includes('admin');

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
            {isAdmin && (
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

      <Content style={{ padding: '24px', margin: '0 auto', width: '100%', maxWidth: '1520px', }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Earnings"
                value={350.4}
                precision={2}
                prefix="$"
                suffix={<Text style={{ fontSize: '12px' }}>+20.1% from last month</Text>}
                valueStyle={{ color: '#1677ff' }}
              />
              <WarningOutlined style={{ fontSize: '24px', color: '#1677ff', position: 'absolute', top: '16px', right: '16px' }} />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Spend this month"
                value={642.39}
                precision={2}
                prefix="$"
                suffix={<Text style={{ fontSize: '12px' }}>+4.75% from last month</Text>}
                valueStyle={{ color: '#52c41a' }}
              />
              <DollarOutlined style={{ fontSize: '24px', color: '#52c41a', position: 'absolute', top: '16px', right: '16px' }} />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="New Tasks"
                value={154}
                suffix={<Text style={{ fontSize: '12px' }}>+12 since last hour</Text>}
                valueStyle={{ color: '#722ed1' }}
              />
              <TeamOutlined style={{ fontSize: '24px', color: '#722ed1', position: 'absolute', top: '16px', right: '16px' }} />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Total Projects"
                value={2935}
                suffix={<Text style={{ fontSize: '12px' }}>+180 this week</Text>}
                valueStyle={{ color: '#eb2f96' }}
              />
              <RiseOutlined style={{ fontSize: '24px', color: '#eb2f96', position: 'absolute', top: '16px', right: '16px' }} />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
          <Col xs={24} lg={16}>
            <Card title="Weekly Revenue">
              <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Text type="secondary">Chart will be implemented here</Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card title="Recent Activity">
              {[1, 2, 3].map((i) => (
                <div key={i} style={{ marginBottom: '16px' }}>
                  <Text strong>Activity {i}</Text>
                  <br />
                  <Text type="secondary">Details about activity {i}</Text>
                </div>
              ))}
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}