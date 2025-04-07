
'use client';
import { Box, styled, TableBody, Typography } from '@mui/material';
import { TableContainer, TableCell, TableRow, Table, TableHead } from '@mui/material';
import Image from 'next/image';

import { AnalysticsHeading } from '@/features/dashboard/dashboard-mom-helper/dashboard-overview/analysics/Analystics.style';
const AccountBalanceBox = styled(Box)({
  display: 'flex',
  gap: '15px',
  alignItems: 'center',
  marginLeft: '27px'
});
const AccountBalanceProfile = styled(Image)({
  borderRadius: '50%',
  overflow: 'hidden',
  objectFit: 'cover'

});
const AccountBalanceEarnigs = styled(Box)({});
const AccountBalanceTypography = styled(Typography)({
  color: '#718EBF',
  fontSize: '14px',
  fontWeight: '400'
});
const AccountBalaceRemaining = styled(Typography)({
  fontSize: '20px',
  fontWeight: 600,
  color: '#232323'
});

interface Transaction {
  transactionId: string;
  receiver: string;
  dateOfTransaction: string;
  status: string;
  amount: string;
}

const tableData: Transaction[] = [
  {
    transactionId: '59217',
    receiver: 'Cody Fisher',
    dateOfTransaction: '13/03/2025',
    status: 'In progress',
    amount: '56',
  },
  {
    transactionId: '59213',
    receiver: 'Cody Fisher',
    dateOfTransaction: '13/03/2025',
    status: 'In progress',
    amount: '56',
  },
  {
    transactionId: '59212',
    receiver: 'Cody Fisher',
    dateOfTransaction: '13/03/2025',
    status: 'In progress',
    amount: '56',
  },
];

export default function DashBoardEarnings() {

  return (
    <>
      <AnalysticsHeading>Earnings</AnalysticsHeading>
      <AccountBalanceBox>
        <AccountBalanceProfile src='/dashboard/earnings/profile-blue.svg' alt='profile icon' height={70} width={70} />
        <AccountBalanceEarnigs>
          <AccountBalanceTypography>
            Account Balance
          </AccountBalanceTypography>
          <AccountBalaceRemaining>
            $50,000
          </AccountBalaceRemaining>
        </AccountBalanceEarnigs>
      </AccountBalanceBox>
      <TableContainer>
        <Table>
          <TableHead>
            {Object.keys(tableData[0] as Transaction ).map((key, index) => (
              <TableCell key={index}>{key.replace('' ,'')}</TableCell> 

            ))}
          </TableHead>
          <TableBody>
            {tableData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {Object.values(row).map((value, valueIndex) => (
                  <TableCell key={valueIndex}>{value}</TableCell> 
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
