import * as ServiceRepository from '@/repository/ServiceRepository';
import {  CreateUserServiceInput } from '@/types/services';

export async function getUserServices(userId: string) {
  const userServices = await ServiceRepository.getUserServices(userId);

  return  userServices ;
}

export async function createUserService(userId: string, data: CreateUserServiceInput) {
  const { serviceId, price, notes, sessionId } = data;
  
  const parsedPrice = price ? (typeof price === 'string' ? parseFloat(price) : price) : undefined;
  
  const userService = await ServiceRepository.createUserService({
    userId,
    serviceId,
    price: parsedPrice,
    notes,
    sessionId
  });
  
  return  userService ;
}

export async function updateUserService(userId: string, serviceId: string, data: Partial<CreateUserServiceInput>) {
  const { price, notes, sessionId } = data;
  
  const parsedPrice = parseFloat(String(price));
  
  const updatedService = await ServiceRepository.updateUserService(userId, serviceId, {
    price: parsedPrice,
    notes,
    sessionId
  });
  
  return updatedService;
}

export async function deleteUserService(userId: string, serviceId: string) {
  const deletedService = await ServiceRepository.deleteUserService(userId, serviceId);

  return deletedService;
}