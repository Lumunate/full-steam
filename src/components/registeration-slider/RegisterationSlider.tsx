'use client';

import { usePathname } from 'next/navigation';

import {
  SliderBox,
  Slider,
  SliderCircle,
  SliderTypography,
  SliderLine,
  SelectedTypography,
} from './RegisterationSlider.style';
interface RegisterationSliderProps {
  highlight: number;
}

const sliderDetailsMomHelper = [
  'Personal Information',
  'Qualification',
  'Payment Details',
];
const sliderDetailsMom = [
  'Personal Information',
  'Services Needed',
  'Payment Details',
];

const RegisterationSlider: React.FC<RegisterationSliderProps> = ({
  highlight,
}) => {

  const pathname = usePathname();
  const isMomPage = pathname.includes('registeration-mom');

  return (
    <SliderBox>
      {(isMomPage ? sliderDetailsMom : sliderDetailsMomHelper).map((slider, index) => (
        <>
          {highlight === index + 1 ? (
            <Slider key={index}>
              <SliderCircle select>
                <SelectedTypography select>{index + 1}</SelectedTypography>
              </SliderCircle>
              <SliderTypography>{slider}</SliderTypography>
            </Slider>
          ) : (
            <Slider key={index}>
              <SliderCircle>
                <SelectedTypography>{index + 1}</SelectedTypography>
              </SliderCircle>
              <SliderTypography>{slider}</SliderTypography>
            </Slider>
          )}
        </>
      ))}
      <SliderLine />
    </SliderBox>
  );
};

export default RegisterationSlider;
