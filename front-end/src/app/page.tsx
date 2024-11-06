'use client';

import React from 'react';
import {
  Layout,
  Menu,
  Button,
  Typography,
  Card,
  Row,
  Col,
  Space,
  Divider
} from 'antd';
import {
  HomeOutlined,
  AppstoreOutlined,
  TeamOutlined,
  MailOutlined,
  RocketOutlined,
  CheckCircleOutlined,
  StarOutlined
} from '@ant-design/icons';

const { Header, Footer, Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const features = [
  {
    title: 'Powerful Features',
    description: 'Access a wide range of powerful tools and capabilities.',
    icon: <RocketOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
  },
  {
    title: 'Easy Integration',
    description: 'Seamlessly integrate with your existing workflows.',
    icon: <CheckCircleOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
  },
  {
    title: 'Premium Support',
    description: '24/7 support from our dedicated team of experts.',
    icon: <StarOutlined style={{ fontSize: '24px', color: '#faad14' }} />
  }
];

export default function HomePage() {
  return (
    <Layout className="min-h-screen">
      {/* Header */}
      <Header style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '0 50px' }}>
        <Row justify="space-between" align="middle" style={{ height: '100%' }}>
          <Typography.Title level={3} style={{ margin: 0 }}>Logo</Typography.Title>
          <Menu mode="horizontal" defaultSelectedKeys={['home']}>
            <Menu.Item key="home" icon={<HomeOutlined />}>Home</Menu.Item>
            <Menu.Item key="products" icon={<AppstoreOutlined />}>Products</Menu.Item>
            <Menu.Item key="about" icon={<TeamOutlined />}>About</Menu.Item>
            <Menu.Item key="contact" icon={<MailOutlined />}>Contact</Menu.Item>
          </Menu>
        </Row>
      </Header>

      <Content>
        {/* Hero Section */}
        <Row justify="center" align="middle" style={{ padding: '64px 32px', background: '#f0f2f5' }}>
          <Col xs={24} lg={16} style={{ textAlign: 'center' }}>
            <Title level={1}>
              Welcome to <span className="text-blue-500">Our Platform</span>
            </Title>
            <Paragraph style={{ fontSize: '18px', marginBottom: '32px' }}>
              Discover the power of innovation and simplicity combined.
              Our platform provides everything you need to succeed in the digital age.
            </Paragraph>
            <Space size="middle">
              <Button type="primary" size="large">
                Get Started
              </Button>
              <Button size="large">
                Learn More
              </Button>
            </Space>
          </Col>
        </Row>

        {/* Features Section */}
        <div style={{ padding: '64px 32px', background: '#fff' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '48px' }}>
            Our Features
          </Title>
          <Row gutter={[32, 32]} justify="center">
            {features.map((feature, index) => (
              <Col xs={24} md={8} key={index}>
                <Card
                  hoverable
                  style={{ height: '100%' }}
                  bodyStyle={{ padding: '24px', textAlign: 'center' }}
                >
                  {feature.icon}
                  <Title level={4} style={{ marginTop: '16px' }}>
                    {feature.title}
                  </Title>
                  <Paragraph type="secondary">
                    {feature.description}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Statistics Section */}
        <Row justify="center" style={{ padding: '64px 32px', background: '#f0f2f5' }}>
          <Col xs={24} md={18}>
            <Row gutter={[32, 32]} justify="space-around" align="middle">
              <Col>
                <Title level={2}>1M+</Title>
                <Text style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Active Users</Text>
              </Col>
              <Col>
                <Title level={2}>50+</Title>
                <Text style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Countries</Text>
              </Col>
              <Col>
                <Title level={2}>99%</Title>
                <Text style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Satisfaction</Text>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* CTA Section */}
        <Row justify="center" align="middle" style={{ padding: '64px 32px', background: '#fff' }}>
          <Col xs={24} md={16} style={{ textAlign: 'center' }}>
            <Title level={2}>Ready to Get Started?</Title>
            <Paragraph style={{ fontSize: '16px', marginBottom: '24px' }}>
              Join thousands of satisfied users who have already transformed their business.
            </Paragraph>
            <Button type="primary" size="large">
              Start Free Trial
            </Button>
          </Col>
        </Row>
      </Content>

      {/* Footer */}
      <Footer style={{ background: '#001529', padding: '48px 32px' }}>
        <Row gutter={[32, 32]} justify="space-between">
          <Col xs={24} sm={6}>
            <Title level={4} style={{ color: '#fff' }}>About Us</Title>
            <Menu theme="dark" mode="vertical" selectable={false}>
              <Menu.Item>Company</Menu.Item>
              <Menu.Item>Team</Menu.Item>
              <Menu.Item>Careers</Menu.Item>
            </Menu>
          </Col>
          <Col xs={24} sm={6}>
            <Title level={4} style={{ color: '#fff' }}>Products</Title>
            <Menu theme="dark" mode="vertical" selectable={false}>
              <Menu.Item>Features</Menu.Item>
              <Menu.Item>Pricing</Menu.Item>
              <Menu.Item>Roadmap</Menu.Item>
            </Menu>
          </Col>
          <Col xs={24} sm={6}>
            <Title level={4} style={{ color: '#fff' }}>Resources</Title>
            <Menu theme="dark" mode="vertical" selectable={false}>
              <Menu.Item>Documentation</Menu.Item>
              <Menu.Item>Blog</Menu.Item>
              <Menu.Item>Support</Menu.Item>
            </Menu>
          </Col>
          <Col xs={24} sm={6}>
            <Title level={4} style={{ color: '#fff' }}>Contact</Title>
            <Menu theme="dark" mode="vertical" selectable={false}>
              <Menu.Item>Contact Us</Menu.Item>
              <Menu.Item>Partners</Menu.Item>
              <Menu.Item>Support</Menu.Item>
            </Menu>
          </Col>
        </Row>
        <Divider style={{ borderColor: '#ffffff22' }} />
        <Row justify="center">
          <Text style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
            © 2024 Your Company. All rights reserved.
          </Text>
        </Row>
      </Footer>
    </Layout>
  );
}