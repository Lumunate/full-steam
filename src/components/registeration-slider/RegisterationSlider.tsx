'use client';

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

const sliderDetails = [
  'Personal Information',
  'Qualification',
  'Payment Details',
];

const RegisterationSlider: React.FC<RegisterationSliderProps> = ({
  highlight,
}) => {
  return (
    <SliderBox>
      {sliderDetails.map((slider, index) => (
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
