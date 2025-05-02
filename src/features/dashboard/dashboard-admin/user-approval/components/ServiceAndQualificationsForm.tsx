'use client';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Box, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';

import { BorderBox, BorderBoxInternal, CertificateBoxWrapper, CertificateStyledInputLabel, CertificateUploadBox, CheckBorderBox, CheckBoxContainer, CustomTableCell, StyledCheckBoxLabel, StyledInputFieldCheckBox, StyledInputLabel } from '@/components/form/Froms.style';
import { UserWithAllData } from '@/repository/UserRepository';

const ServiceAndQualificationsForm = ({ formData }: { formData: UserWithAllData }) => {
  const { userServices: services, packages } = formData;

  return (
    <>
      <BorderBox>
        <BorderBoxInternal>
          <Box sx={{ padding: '18px 12px' }}>
            {services.length === 0 ? (
              <Box sx={{ p: 2, textAlign: 'center' }}>No services available</Box>
            ) : (
              services.map((service, index) => (
                <CheckBorderBox key={service.id} index={index}>
                  <CheckBoxContainer>
                    <Checkbox
                      disabled
                      icon={<CheckBoxOutlineBlankIcon />}
                      checkedIcon={<CheckBoxIcon sx={{ color: '#005782' }} />}
                      checked
                    />
                    <StyledCheckBoxLabel>{service.service.name}</StyledCheckBoxLabel>
                  </CheckBoxContainer>

                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: '11px' }}>
                    <StyledInputFieldCheckBox
                      disabled
                      disableUnderline
                      type="number"
                      value={service.price || ''}
                      inputProps={{ min: 0 }}
                    />
                    <StyledInputFieldCheckBox
                      disabled
                      disableUnderline
                      type="text"
                      value={service.session?.duration || '1 hr'}
                      inputProps={{ min: 0 }}
                    />
                  </Box>
                </CheckBorderBox>
              ))
            )}
          </Box>

        </BorderBoxInternal >
      </BorderBox >

      {/* Improved Packages Section with single input */}
      <BorderBox >
        {packages.length > 0 && (
          <Box mt={3}>
            <StyledInputLabel>Your Packages</StyledInputLabel>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <CustomTableCell>Package Name</CustomTableCell>
                    <CustomTableCell>Included Services</CustomTableCell>
                    <CustomTableCell>Price ($)</CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {packages.map((pkg, index) => (
                    <TableRow key={index}>
                      <TableCell>{pkg.name}</TableCell>
                      <TableCell>
                        {pkg.packageServices.map((service) => service.service.name).join(', ')}
                      </TableCell>
                      <TableCell>{pkg.price?.toString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </BorderBox >

      <CertificateBoxWrapper>
        <CertificateStyledInputLabel>
                    Government Issued ID
        </CertificateStyledInputLabel>
        <CertificateUploadBox
          style={{ cursor: formData.governmentIdDocumentUrl ? 'alias' : 'not-allowed' }}
          onClick={() => {
            if (formData.governmentIdDocumentUrl) {
              window.open(formData.governmentIdDocumentUrl, '_blank');
            }
          }}
        >
          <StyledCheckBoxLabel>
            {formData.governmentIdDocumentUrl ? 'Document Uploaded ✓' : 'Not Uploaded'}
          </StyledCheckBoxLabel>
        </CertificateUploadBox>
      </CertificateBoxWrapper>

      <CertificateBoxWrapper>
        <CertificateStyledInputLabel>
                    Police Vulnerable Sector Check
        </CertificateStyledInputLabel>
        <CertificateUploadBox
          style={{ cursor: formData.policeCheckDocumentUrl ? 'alias' : 'not-allowed' }}
          onClick={() => {
            if (formData.policeCheckDocumentUrl) {
              window.open(formData.policeCheckDocumentUrl, '_blank');
            }
          }}
        >
          <StyledCheckBoxLabel>
            {formData.policeCheckDocumentUrl ? 'Document Uploaded ✓' : 'Not Uploaded'}
          </StyledCheckBoxLabel>
        </CertificateUploadBox>
      </CertificateBoxWrapper>

      <CertificateBoxWrapper>
        <CertificateStyledInputLabel>
                    First Aid Certification
        </CertificateStyledInputLabel>
        <CertificateUploadBox
          style={{ cursor: formData.firstAidCertificate ? 'alias' : 'not-allowed' }}
          onClick={() => {
            if (formData.firstAidCertificate) {
              window.open(formData.firstAidCertificate, '_blank');
            }
          }}
        >
          <StyledCheckBoxLabel>
            {formData.firstAidCertificate ? 'Document Uploaded ✓' : 'Not Uploaded'}
          </StyledCheckBoxLabel>
        </CertificateUploadBox>
      </CertificateBoxWrapper>
    </>
  );
};

export default ServiceAndQualificationsForm;