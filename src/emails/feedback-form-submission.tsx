import { Feedback } from '@prisma/client';
import { Body, Container, Head, Heading, Html, Img, Preview, Section, Text } from '@react-email/components';
import React from 'react';

export type NewFeedbackNotificationProps = Feedback;

const NewFeedbackNotificationTemplate = ({
  name,
  lastName,
  relation,
  sessionDate,
  experience,
  feedback,
  id,
  createdAt,
}: NewFeedbackNotificationProps) => {
  const fullName = `${name} ${lastName}`;

  const formattedSubmissionTime = new Date(createdAt).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const formattedSessionDate = sessionDate
    ? new Date(sessionDate).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    : 'Not specified';

  // Function to determine experience color
  const getExperienceColor = (exp: string) => {
    switch (exp?.toLowerCase()) {
    case 'excellent':
      return '#2da44e';
    case 'good':
      return '#4b9c3f';
    case 'average':
      return '#d29922';
    case 'poor':
      return '#cf222e';
    default:
      return '#555555';
    }
  };

  return (
    <Html>
      <Head />
      <Preview>
        Service Feedback from {fullName} - {relation}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={imgSection}>
            <Img
              src={`https://res.cloudinary.com/dtra3fmqb/image/upload/v1743850449/211994244-removebg_y7cir3.svg`}
              width="200"
              height="90"
              alt="Full Steam Ahead"
              style={img}
            />
          </Section>

          <Section style={alertSection}>
            <Text style={alertText}>Feedback Received</Text>
          </Section>

          <Text style={paragraph}>A new feedback submission has been received for the following service:</Text>

          <Section style={detailsSection}>
            <Heading as="h3" style={subheading}>
              Service Details:
            </Heading>
            <div style={detailsContainer}>
              <Text style={detailItem}>
                <strong>Service Type:</strong> {relation}
              </Text>
              <Text style={detailItem}>
                <strong>Client Name:</strong> {fullName}
              </Text>
              <Text style={detailItem}>
                <strong>Service Date:</strong> {formattedSessionDate}
              </Text>
              <Text style={detailItem}>
                <strong>Submission Time:</strong> {formattedSubmissionTime}
              </Text>
              <Text style={detailItem}>
                <strong>Reference ID:</strong> {id}
              </Text>
            </div>
          </Section>

          <Section style={experienceSection}>
            <Heading as="h3" style={subheading}>
              Overall Experience:
            </Heading>
            <Text
              style={{
                ...experienceText,
                color: getExperienceColor(experience),
              }}
            >
              {experience?.toUpperCase()}
            </Text>
          </Section>

          <Section style={feedbackSection}>
            <Heading as="h3" style={subheading}>
              Feedback Content:
            </Heading>
            <Text style={feedbackText}>{feedback}</Text>
          </Section>

          <Section style={statsSection}>
            <Text style={statsText}>
              This feedback affects our caregivers overall rating. Service ratings will be updated in the dashboard.
            </Text>
          </Section>

          <Section style={recommendationSection}>
            {experience === '1' ||
              (experience === '2' && (
                <Text style={urgentText}>⚠️ This feedback requires immediate attention due to poor rating.</Text>
              ))}
          </Section>

          <Text style={footer}>This is an automated notification from Full Steam Ahead feedback system. Feedback ID: {id}</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default NewFeedbackNotificationTemplate;

const main = {
  backgroundColor: '#f4f6f8',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  padding: '20px',
};

const imgSection = {
  marginTop: 32,
  marginBottom: 10,
  textAlign: 'center' as const,
};

const img = {
  margin: '0 auto',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  maxWidth: '600px',
};

const alertSection = {
  backgroundColor: '#00BCD4',
  padding: '12px',
  borderRadius: '5px',
  marginBottom: '24px',
  textAlign: 'center' as const,
};

const alertText = {
  color: '#ffffff',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0',
};

const subheading = {
  fontSize: '18px',
  lineHeight: '1.3',
  fontWeight: '600',
  color: '#333333',
  marginBottom: '15px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#555',
  marginBottom: '20px',
};

const detailsSection = {
  backgroundColor: '#f9f9f9',
  padding: '20px',
  borderRadius: '8px',
  marginBottom: '24px',
  border: '1px solid #e1e4e8',
};

const detailsContainer = {
  marginTop: '10px',
};

const detailItem = {
  fontSize: '15px',
  lineHeight: '24px',
  color: '#555',
  marginBottom: '8px',
};

const experienceSection = {
  backgroundColor: '#f9f9f9',
  padding: '20px',
  borderRadius: '8px',
  marginBottom: '24px',
  border: '1px solid #e1e4e8',
  textAlign: 'center' as const,
};

const experienceText = {
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0',
};

const feedbackSection = {
  backgroundColor: '#f9f9f9',
  padding: '20px',
  borderRadius: '8px',
  marginBottom: '24px',
  border: '1px solid #e1e4e8',
};

const feedbackText = {
  fontSize: '15px',
  lineHeight: '24px',
  color: '#555',
  marginBottom: '0',
  whiteSpace: 'pre-wrap',
};

const statsSection = {
  backgroundColor: '#f8f9fa',
  padding: '12px',
  borderRadius: '5px',
  marginBottom: '12px',
};

const statsText = {
  fontSize: '14px',
  lineHeight: '20px',
  color: '#666',
  margin: '0',
  textAlign: 'center' as const,
};

const recommendationSection = {
  marginBottom: '24px',
};

const urgentText = {
  fontSize: '14px',
  lineHeight: '20px',
  color: '#cf222e',
  margin: '0',
  textAlign: 'center' as const,
  backgroundColor: '#ffebe9',
  padding: '12px',
  borderRadius: '5px',
  border: '1px solid #ff9999',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  marginTop: '24px',
  textAlign: 'center' as const,
};