'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';

import { Layout, Row, Col, Form, Input, Button, Typography, Spin, Space } from 'antd';
import { Icon } from '@iconify/react';
import { Hero } from '@/components/Hero';
import { LoginOutlined } from '@ant-design/icons';


const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

export default function Home() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #4f46e5 0%, #8b5cf6 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Spin
          size="large"
          tip="Yükleniyor..."
          style={{ color: 'white' }}
        />
      </div>
    );
  }

  const onFinish = (values: any) => {
    router.push('/api/auth/login');
  };

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#141414' }}>
        <Spin size="large" />
      </div>
    );
  }


  return (
    <Layout style={{ minHeight: '100vh', background: '#141414' }}>
      <Header style={{ background: '#1f1f1f', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{
          fontSize: '20px',
          fontWeight: 'bold',
          background: 'linear-gradient(to right, #1677ff, #7A29DC)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Kayra Export
        </Text>
        <Button
          type="primary"
          icon={<LoginOutlined />}
          href="/api/auth/login"
        >
          Sign In
        </Button>
      </Header>

      <Content style={{
        padding: '48px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <Space direction="vertical" size="large">
          <Title style={{
            background: 'linear-gradient(to right, #1677ff, #7A29DC)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Welcome to Kayra Export
          </Title>
          <Text style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.85)' }}>
            A powerful admin dashboard built with Next.js 14 and Ant Design
          </Text>
          <Button
            type="primary"
            size="large"
            icon={<LoginOutlined />}
            href="/api/auth/login"
          >
            Get Started
          </Button>
        </Space>
      </Content>
    </Layout>
  );
}
