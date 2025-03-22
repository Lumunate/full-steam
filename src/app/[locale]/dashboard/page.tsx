import { Paper, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <Paper>
      <Typography variant='h1'>{t('title')}</Typography>
      <Typography variant='body1'>{t('about')}</Typography>
    </Paper>
  );
}
