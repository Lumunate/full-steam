import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';
export interface RegistrationAcknowledgmentHelperProps {
    firstName: string;
    email: string;
    isApproved?: boolean;
  }
const RegistrationAcknowledgmentHelper = (props: RegistrationAcknowledgmentHelperProps) => {
  const {
    firstName = 'there',
    email = 'user@example.com',
    isApproved = false,
  } = props;
  const baseUrl = 'https://fullsteamahead.example.com';

  return (
    <Html>
      <Head />
      <Preview>Welcome to Full Steam Ahead - Your Mom Helper Registration</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to Full Steam Ahead!</Heading>
          <Section style={box}>
            <Text style={paragraph}>
                Dear {firstName},
            </Text>
            <Text style={paragraph}>
                Thank you for registering as a Mom Helper with Full Steam Ahead. We are delighted to welcome you to our community of dedicated caregivers who make a meaningful difference in families lives.
            </Text>
            {isApproved ? (
              <Text style={paragraph}>
                  Your account has been <strong>approved</strong> and is now active. You can log in immediately to complete your profile and begin connecting with families in need of your services.
              </Text>
            ) : (
              <Text style={paragraph}>
                  We are currently verifying your submitted documents and credentials. Your account will remain pending until this verification process is complete, which typically takes 1-3 business days. Once approved, you will be notified and can begin using all features of your Mom Helper dashboard.
              </Text>
            )}
            <Text style={paragraph}>
                Next steps:
            </Text>
            <Text style={listItem}>
                1. Complete your profile with detailed information about your qualifications, experience, and availability
            </Text>
            <Text style={listItem}>
                2. Set your service rates and create service packages that highlight your unique offerings
            </Text>
            <Text style={listItem}>
                3. Configure your availability calendar to ensure families can book your services at convenient times
            </Text>
            <Text style={paragraph}>
                You can access your account at any time using your registered email address: <strong>{email}</strong>
            </Text>
            <Section style={btnContainer}>
              <Link style={button} href={baseUrl + '/login'}>
                  Access Your Dashboard
              </Link>
            </Section>
            <Text style={paragraph}>
                If you have any questions during this process, our support team is available at support@fullsteamahead.example.com to assist you.
            </Text>
            <Text style={paragraph}>
                We look forward to your contribution to our community of exceptional caregivers.
            </Text>
            <Text style={paragraph}>
                Warm regards,
              <br />
                The Full Steam Ahead Team
            </Text>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
              © {new Date().getFullYear()} Full Steam Ahead. All rights reserved.
            <br />
              Cambridge, UK
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default RegistrationAcknowledgmentHelper;
const main = {
  backgroundColor: '#f5f5f5',
  fontFamily: '"Urbanist", sans-serif',
  padding: '20px 0',
};
const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 30px',
  maxWidth: '600px',
  borderRadius: '8px',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
};
const box = {
  padding: '20px',
};
const h1 = {
  color: '#00BCD4',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '15px 0',
  padding: '0',
  textAlign: 'center' as const,
};
const paragraph = {
  color: '#404040',
  fontSize: '16px',
  lineHeight: '1.5',
  margin: '16px 0',
};
const listItem = {
  color: '#404040',
  fontSize: '16px',
  lineHeight: '1.5',
  margin: '8px 0',
};
const btnContainer = {
  textAlign: 'center' as const,
  margin: '26px 0',
};
const button = {
  backgroundColor: '#00BCD4',
  borderRadius: '4px',
  color: '#fff',
  display: 'inline-block',
  fontSize: '16px',
  fontWeight: 'bold',
  padding: '12px 24px',
  textDecoration: 'none',
  textAlign: 'center' as const,
};
const hr = {
  borderColor: '#e6e6e6',
  margin: '30px 0',
};
const footer = {
  color: '#888888',
  fontSize: '14px',
  lineHeight: '1.5',
  textAlign: 'center' as const,
  margin: '20px 0',
};