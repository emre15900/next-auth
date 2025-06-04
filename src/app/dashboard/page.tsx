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
  WarningOutlined,
  DollarOutlined,
  TeamOutlined,
  RiseOutlined
} from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

export default function Dashboard() {
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
            selectedKeys={['dashboard']}
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

      <Content style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
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