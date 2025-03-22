'use client';

import Image from 'next/image';

import { ImpressionCardContainer , ImpressionCardText} from './ImpressionCard.style';

interface ImpressionCardProps {
 imageUrl: string;
 text: string; 
}

const ImpressionCard: React.FC<ImpressionCardProps> = ({ 
  imageUrl,
  text
}) => {
  return (
    <ImpressionCardContainer>
      <Image src={imageUrl} width={75} height={75} alt={text} />
      <ImpressionCardText>
        {text}
      </ImpressionCardText>

    </ImpressionCardContainer>
  );
};

export default ImpressionCard;
