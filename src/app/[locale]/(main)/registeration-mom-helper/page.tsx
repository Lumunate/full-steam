import { FlexBox } from '@/components/common/Global.style';
import SectionMainHeading from '@/components/section-main-heading/SectionMainHeading';
import SectionHeading from '@/features/components/section-heading/SectionHeading';
import { SectionDescriptionText } from '@/features/home/Home.style';
import RegsiterationFormMomHelper from '@/features/mom-helper-form/RegisterationFormMomHelper';

export const metadata = {
  title: 'Registeration - Mom Helper',
  icons: {
    icon: '/companyicon.ico',
  },
};

export default function LoginPage() {
  return (
    <FlexBox>
      <SectionHeading text='Register' />
      <SectionMainHeading text='Become a ' span='Mom Helper' />
      <SectionDescriptionText>
        Join our community and help families while earning on your own schedule.
      </SectionDescriptionText>
      <RegsiterationFormMomHelper />
    </FlexBox>
  );
}
