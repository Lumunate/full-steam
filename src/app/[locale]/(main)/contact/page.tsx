import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Image from 'next/image';

import { AppContentWrapper } from '@/components/common/Global.style';
import ContactForm from '@/features/contact/ContactForm';

import {
  ContactContainer,
  ContactHeadingTypography,
  ContactParaTypography,
  ContactLinksHead,
  ContactStyledLinkOne,
  ContactIconHead,
} from '../../../../features/contact/Contact.style';

export default function ContactPage() {
  return (
    <ContactContainer>
      <AppContentWrapper>
        <Grid container columns={24} columnSpacing={2} sx={{ px: { xs: '0', lg: '40px' } }}>
          <Grid size={{ xs: 24, md: 12 }} sx={{ mt: { xs: '0', lg: '80px' } }}>
            <Box sx={{ mb: { xs: '30px', lg: '100px' }, position: 'relative' }}>
              <ContactHeadingTypography variant="h1">CONTACT US</ContactHeadingTypography>
              <ContactParaTypography variant="body1">
                We&apos;d love to hear from you. Contact us directly or use the form below. We&apos;ll be in touch.
              </ContactParaTypography>
              <ContactIconHead>
                <Image src={'/arrow.svg'} width={26} height={21} alt="icon" loading="lazy" />
              </ContactIconHead>
            </Box>
            <ContactLinksHead>
              <Box sx={{ mb: '20px' }}>
                <ContactStyledLinkOne href={'tel:support@fullst3am.com'}>+1 234-567-890</ContactStyledLinkOne>
                <ContactStyledLinkOne href={'mailto:support@fullst3am.com'}>
                  <Image src={'/footer/sms.svg'} width={20} height={20} alt="email" loading="lazy" style={{marginRight: '12px'}} />
                  support@fullst3am.com</ContactStyledLinkOne>
              </Box>
              <ContactStyledLinkOne
                sx={{
                  '&:hover': {
                    textDecoration: 'none',
                  },
                }}
                href={'#'}
              >
                Cambridge, UK
              </ContactStyledLinkOne>
            </ContactLinksHead>
          </Grid>
          <Grid size={{ xs: 24, md: 12 }}>
            <ContactForm />
          </Grid>
        </Grid>
      </AppContentWrapper>
    </ContactContainer>
  );
}
