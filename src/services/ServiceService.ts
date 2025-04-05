import * as ServiceRepository from '@/repository/ServiceRepository';
import { CreateServiceInput } from '@/types/services';
export async function createService(data: CreateServiceInput) {
  const service = await ServiceRepository.createService(data);

  return service;
}
export async function getAllServices() {
  const services = await ServiceRepository.getAllActiveServices();

  return  services ;
}

export async function getServiceById(id: string) {
  const service = await ServiceRepository.findServiceById(id);

  return  service ;
}

export async function findServicesByIds(serviceIds: string[]) {
  return ServiceRepository.findServicesByIds(serviceIds);
}