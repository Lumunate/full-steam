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
export interface RegistrationAcknowledgmentUserProps {
    firstName: string;
    email: string;
  }
const RegistrationAcknowledgmentUser = (props: RegistrationAcknowledgmentUserProps) => {
  const {
    firstName = 'there',
    email = 'user@example.com',
  } = props;
  const baseUrl = 'https://fullsteamahead.example.com';

  return (
    <Html>
      <Head />
      <Preview>Welcome to Full Steam Ahead - Your Family Account is Ready</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to Full Steam Ahead!</Heading>
          <Section style={box}>
            <Text style={paragraph}>
                Dear {firstName},
            </Text>
            <Text style={paragraph}>
                Thank you for creating your family account with Full Steam Ahead. We are delighted to welcome you to our platform dedicated to connecting families with qualified caregivers.
            </Text>
            <Text style={paragraph}>
                Your account has been <strong>successfully created</strong> and is ready for immediate use. You now have full access to our platform features, allowing you to find the perfect Mom Helper for your family  unique needs.
            </Text>
            <Text style={paragraph}>
                Here are some ways to get started:
            </Text>
            <Text style={listItem}>
                1. Complete your family profile with information about your children, household, and specific caregiving needs
            </Text>
            <Text style={listItem}>
                2. Browse our network of vetted Mom Helpers, filtering by availability, skills, and experience
            </Text>
            <Text style={listItem}>
                3. Schedule interviews and book services directly through our secure platform
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
                Our support team is available to assist you with any questions or concerns at support@fullsteamahead.example.com.
            </Text>
            <Text style={paragraph}>
                We look forward to helping your family thrive with the right support.
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

export default RegistrationAcknowledgmentUser;
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
  color: '#8BC34A',
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
  backgroundColor: '#8BC34A',
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