
import { FlexBox } from '@/components/common/Global.style';
import SectionMainHeading from '@/components/section-main-heading/SectionMainHeading';
import SectionHeading from '@/features/components/section-heading/SectionHeading';
import { SectionDescriptionText } from '@/features/home/Home.style';
import LoginForm from '@/features/login/LoginForm';

export default function LoginPage() {

  return (<FlexBox>

    <SectionHeading text='Register' />
    <SectionMainHeading text="Become a " span="Mom Helper" />
    <SectionDescriptionText >
    Join our community and help families while earning on your own schedule.
    </SectionDescriptionText>
    
  </FlexBox>
  );
}
