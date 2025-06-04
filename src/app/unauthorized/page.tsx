'use client';

import { Layout, Result, Button } from 'antd';
import Link from 'next/link';

const { Content } = Layout;

export default function UnauthorizedPage() {
    return (
        <Layout style={{ minHeight: '100vh', background: '#141414' }}>
            <Content style={{
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Result
                    status="403"
                    title="Unauthorized Access"
                    subTitle="You do not have permission to access this page."
                    extra={[
                        <Link href="/dashboard" key="dashboard">
                            <Button type="primary" size='large'>
                                Back to Dashboard
                            </Button>
                        </Link>
                    ]}
                />
            </Content>
        </Layout>
    );
} 