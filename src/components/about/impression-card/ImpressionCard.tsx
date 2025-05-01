
import {
  ImpressionCardContainer,
  ImpressionCardText,
  ImpressionImage
} from './ImpressionCard.style';

interface ImpressionCardProps {
  imageUrl: string;
  text: string;
}

const ImpressionCard: React.FC<ImpressionCardProps> = ({ imageUrl, text }) => {
  return (
    <ImpressionCardContainer>
      <ImpressionImage src={imageUrl} width={75} height={75} alt={text} />
      <ImpressionCardText>{text}</ImpressionCardText>
    </ImpressionCardContainer>
  );
};

export default ImpressionCard;
