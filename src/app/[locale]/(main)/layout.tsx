import { Box } from '@mui/material';

import Footer from '@/features/footer/Footer';
import Navbar from '@/features/navbar/Navbar';
export const metadata = {
  title: 'FullSt3amAhead',
  description: 'Generated by create next app',
  icons: {
    icon: '/companyicon.ico',
  }
};

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
     
      <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </Box>
    </>
  );
}
