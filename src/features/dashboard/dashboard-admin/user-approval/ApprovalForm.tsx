import React from 'react';

import { UserWithAllData } from '@/repository/UserRepository';

import PaymentDetailsForm from './components/PaymentDetailsForm';
import PersonalInformationForm from './components/PersonalInformationForm';
import ServiceAndQualificationsForm from './components/ServiceAndQualificationsForm';

const ApprovalForm = ({ tab, data }: { tab: number, data: UserWithAllData }) => {
  if (tab === 0) {
    return (
      <PersonalInformationForm formData={data} />
    );
  }
  if (tab === 1) {
    return (
      <ServiceAndQualificationsForm formData={data} />
    );
  }
  if (tab === 2) {
    return (
      <PaymentDetailsForm formData={data} />
    );
  }

  throw new Error('Invalid tab value');
};

export default ApprovalForm;