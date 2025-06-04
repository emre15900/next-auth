'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';

import { Layout, Row, Col, Form, Input, Button, Typography, Spin, Space } from 'antd';
import { Icon } from '@iconify/react';

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

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          backgroundColor: '#0f172a',
          padding: '0 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
          <Icon
            icon="mdi:code-tags"
            style={{ fontSize: 28, marginRight: 8, color: '#8b5cf6' }}
          />
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
              letterSpacing: 1,
            }}
          >
            Template DSGN
          </Text>
        </div>

        <Space
          size="large"
          style={{ display: 'flex', alignItems: 'center' }}
          wrap
        >
          <a
            href="#about"
            style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14 }}
          >
            About
          </a>
          <a
            href="#download"
            style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14 }}
          >
            Download
          </a>
          <a
            href="#pricing"
            style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14 }}
          >
            Pricing
          </a>
          <a
            href="#features"
            style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14 }}
          >
            Features
          </a>
          <a
            href="#contact"
            style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14 }}
          >
            Contact
          </a>
          <Button
            type="primary"
            size="small"
            style={{
              backgroundColor: '#8b5cf6',
              borderColor: '#8b5cf6',
            }}
            onClick={() => router.push('/api/auth/login')}
          >
            Sign In
          </Button>
          <Icon
            icon="mdi:menu"
            style={{
              fontSize: 24,
              color: 'white',
              marginLeft: 12,
              cursor: 'pointer',
            }}
          />
        </Space>
      </Header>

      <Content style={{ padding: 0, margin: 0 }}>
        <Row style={{ minHeight: 'calc(100vh - 64px)' }}>
          <Col
            xs={24}
            md={12}
            style={{
              backgroundColor: '#111827',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem 1rem',
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: 360,
                backgroundColor: '#1f2937',
                borderRadius: 8,
                padding: '2rem',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <Icon
                  icon="mdi:account-circle-outline"
                  style={{ fontSize: 48, color: '#8b5cf6' }}
                />
                <Title
                  level={2}
                  style={{ color: 'white', margin: '0.5rem 0 0' }}
                >
                  Hoş Geldiniz
                </Title>
                <Text style={{ color: '#9ca3af' }}>
                  Lütfen giriş bilgilerinizi girin
                </Text>
              </div>

              <Form
                name="loginForm"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: 'Kullanıcı adı gerekli' },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Username"
                    style={{
                      backgroundColor: '#374151',
                      borderColor: '#4b5563',
                      color: 'white',
                      borderRadius: 4,
                    }}
                    prefix={
                      <Icon
                        icon="mdi:account-outline"
                        style={{ color: '#9ca3af', fontSize: 20 }}
                      />
                    }
                  />
                </Form.Item>

                {/* Şifre */}
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Şifre gerekli' }]}
                >
                  <Input.Password
                    size="large"
                    placeholder="Password"
                    style={{
                      backgroundColor: '#374151',
                      borderColor: '#4b5563',
                      color: 'white',
                      borderRadius: 4,
                    }}
                    prefix={
                      <Icon
                        icon="mdi:lock-outline"
                        style={{ color: '#9ca3af', fontSize: 20 }}
                      />
                    }
                  />
                </Form.Item>

                <Form.Item>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Form.Item
                      name="remember"
                      valuePropName="checked"
                      noStyle
                    >
                      <Input
                        type="checkbox"
                        style={{ marginRight: 8 }}
                      />
                    </Form.Item>
                    <Text style={{ color: '#9ca3af', fontSize: 14 }}>
                      Remember me
                    </Text>

                    <a
                      href="#forgot"
                      style={{
                        color: '#8b5cf6',
                        fontSize: 14,
                        textDecoration: 'underline',
                      }}
                    >
                      Forgot your password?
                    </a>
                  </div>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    size="large"
                    style={{
                      backgroundColor: '#ec4899',
                      borderColor: '#ec4899',
                      fontWeight: 600,
                      borderRadius: 4,
                    }}
                  >
                    LOGIN
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>

          <Col
            xs={0}
            md={12}
            style={{
              position: 'relative',
              backgroundColor: '#0e0e2c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background:
                  'radial-gradient(circle at 40% 30%, rgba(139,92,246,0.4), transparent 60%), ' +
                  'radial-gradient(circle at 60% 70%, rgba(99,102,241,0.45), transparent 60%), ' +
                  '#0e0e2c',
                filter: 'blur(80px)',
                zIndex: 0,
              }}
            />

            <div
              style={{
                position: 'relative',
                zIndex: 1,
                textAlign: 'center',
                maxWidth: 400,
                color: 'white',
                padding: '2rem',
              }}
            >
              <Title
                level={1}
                style={{
                  color: 'white',
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                }}
              >
                Welcome.
              </Title>
              <Paragraph
                style={{
                  color: '#cbd5e1',
                  fontSize: '1.125rem',
                  lineHeight: 1.6,
                  marginBottom: '2rem',
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Duis vehicula, urna quis fermentum aliquet, purus orci suscipit mi,
                vitae aliquam neque ligula sit amet risus.
              </Paragraph>
              <Text style={{ color: '#9ca3af', fontSize: 14 }}>
                Not a member?{' '}
                <a
                  href="/api/auth/signup"
                  style={{
                    color: '#8b5cf6',
                    fontWeight: 500,
                    textDecoration: 'underline',
                  }}
                >
                  Sign up here
                </a>
              </Text>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
