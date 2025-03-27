import { Paper, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import zipy from 'zipyai'; 
zipy.init('3731bae4');

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <Paper>
      <Typography variant="h1">{t('title')}</Typography>
      <Typography variant="body1">{t('about')}</Typography>
    </Paper>
  );
}
