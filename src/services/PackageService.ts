import * as PackageRepository from '@/repository/PackageRepository';
import {  CreatePackageInput, CreatePackageInputFields } from '@/types/packages';
export async function getUserPackages(userId: string) {
  const packages = await PackageRepository.findPackagesByUserId(userId);

  return  packages ;
}
export async function createPackage(userId: string, data: CreatePackageInputFields) {
  const { name, price, notes, sessionId, serviceIds } = data;
  const parsedPrice = parseFloat(String(price));
  const newPackage = await PackageRepository.createPackage({
    name,
    price: parsedPrice,
    userId,
    notes,
    sessionId,
    serviceIds: serviceIds || []
  });

  return  newPackage ;
}
export async function createManyPackages(packages: CreatePackageInput[]) {
  return Promise.all(packages.map(pkg => {
    const parsedPrice = parseFloat(String(pkg.price));
    
    return PackageRepository.createPackage({
      ...pkg,
      price: parsedPrice
    });
  }));
}
export async function getPackageById(packageId: string) {
  const packageData = await PackageRepository.findPackageById(packageId);

  return  packageData ;
}
export async function updatePackage(packageId: string, userId: string, data: CreatePackageInputFields) {
  const { name, price, notes, sessionId, serviceIds } = data;
  
  const parsedPrice =  parseFloat(String(price));
  
  const updatedPackage = await PackageRepository.updatePackage(packageId, {
    name,
    price: parsedPrice,
    notes,
    sessionId,
    serviceIds
  });

  return  updatedPackage ;
}
export async function deletePackage(packageId: string) {
  const deletedPackage = await PackageRepository.deletePackage(packageId);

  return deletedPackage;
}