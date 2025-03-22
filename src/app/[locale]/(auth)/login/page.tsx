
import { FlexBox } from '@/components/common/Global.style';
import SectionMainHeading from '@/components/section-main-heading/SectionMainHeading';
import SectionHeading from '@/features/components/section-heading/SectionHeading';
import { SectionDescriptionText } from '@/features/home/Home.style';
import LoginForm from '@/features/login/LoginForm';

export default function LoginPage() {

  return (<FlexBox>

    <SectionHeading text='Login' />
    <SectionMainHeading text="Welcome Back" />
    <SectionDescriptionText >
    Log in to your Full Steam Ahead account
    </SectionDescriptionText>
    <LoginForm />
  </FlexBox>
  );
}
