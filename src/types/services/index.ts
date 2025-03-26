import { Session } from '../sessions';

export interface Service {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
}

export interface UserService {
  id: string;
  userId: string;
  serviceId: string;
  price: number;
  notes?: string;
  sessionId?: string;
  service: Service;
  session?: Session;
  createdAt: string;
}

export interface CreateUserServiceInput {
  userId: string;
  serviceId: string;
  price?: number;
  notes?: string;
  sessionId?: string;
}