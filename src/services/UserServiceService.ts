import * as ServiceRepository from '@/repository/ServiceRepository';

export async function getUserServices(userId: string) {
  const userServices = await ServiceRepository.getUserServices(userId);

  return { userServices };
}

export async function createUserService(userId: string, data: any) {
  const { serviceId, price, notes, sessionId } = data;
  
  const parsedPrice = price ? (typeof price === 'string' ? parseFloat(price) : price) : undefined;
  
  const userService = await ServiceRepository.createUserService({
    userId,
    serviceId,
    price: parsedPrice,
    notes,
    sessionId
  });
  
  return { userService };
}

export async function updateUserService(userId: string, serviceId: string, data: any) {
  const { price, notes, sessionId } = data;
  
  const parsedPrice = price ? (typeof price === 'string' ? parseFloat(price) : price) : undefined;
  
  const updatedService = await ServiceRepository.updateUserService(userId, serviceId, {
    price: parsedPrice,
    notes,
    sessionId
  });
  
  return { userService: updatedService };
}

export async function deleteUserService(userId: string, serviceId: string) {
  await ServiceRepository.deleteUserService(userId, serviceId);

  return { message: 'Service removed successfully' };
}