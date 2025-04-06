import { Child, Gender, Package, PaymentMethod, Service, User, UserRole } from '@prisma/client';

export interface UserWithRelations extends User {
  children?: Child[];
  services?: Service[];
  packages?: Package[];
}

export interface SafeUser extends Omit<User, 'password' | 'paymentCardNumber' | 'paymentCardCvv' | 'bankAccountNumber'> {
  children?: Child[];
  services?: Service[];
  packages?: Package[];
}