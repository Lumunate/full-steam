import { Service } from '../services';
import { Session } from '../sessions';

export interface PackageService {
  id: string;
  packageId: string;
  serviceId: string;
  service: Service;
}

export interface Package {
  id: string;
  name: string;
  price: number;
  userId: string;
  notes?: string;
  sessionId?: string;
  session?: Session;
  packageServices: PackageService[];
  createdAt: string;
  updatedAt: string;
}

export interface CreatePackageInput {
  name: string;
  price: number;
  userId: string;
  notes?: string;
  sessionId?: string;
  serviceIds: string[];
}