'use client';


import { FlexBox } from '@/components/common/Global.style';
import SectionMainHeading from '@/components/section-main-heading/SectionMainHeading';
import SectionHeading from '@/features/components/section-heading/SectionHeading';
import { SectionDescriptionText } from '@/features/home/Home.style';
import RegsiterationFormMom from '@/features/family/RegisterationForm';

export default function LoginPage() {

  return (<FlexBox>

    <SectionHeading text='Register' />
    <SectionMainHeading text="Join as a " span="Family" />
    <SectionDescriptionText >
    Create your family profile and find the perfect Mom Helper.
    </SectionDescriptionText>

    <RegsiterationFormMom/>
    
  </FlexBox>
  );
}

