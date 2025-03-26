import * as PackageRepository from '@/repository/PackageRepository';
import {  CreatePackageInput } from '@/types/packages';

export async function getUserPackages(userId: string) {
  const packages = await PackageRepository.findPackagesByUserId(userId);

  return { packages };
}

export async function createPackage(userId: string, data: any) {
  const { name, price, notes, sessionId, serviceIds } = data;
  
  const parsedPrice = typeof price === 'string' 
    ? parseFloat(price) 
    : price;

  const newPackage = await PackageRepository.createPackage({
    name,
    price: parsedPrice,
    userId,
    notes,
    sessionId,
    serviceIds: serviceIds || []
  });
  
  return { package: newPackage };
}

export async function createManyPackages(packages: CreatePackageInput[]) {
  return Promise.all(packages.map(pkg => {
    // Ensure price is a valid number
    const price = typeof pkg.price === 'string' 
      ? parseFloat(pkg.price as unknown as string) 
      : pkg.price;

    return PackageRepository.createPackage({
      ...pkg,
      price: price
    });
  }));
}

export async function getPackageById(packageId: string) {
  const packageData = await PackageRepository.findPackageById(packageId);

  return { package: packageData };
}

export async function updatePackage(packageId: string, userId: string, data: any) {
  const { name, price, notes, sessionId, serviceIds } = data;
  
  // Ensure price is a valid number if provided
  const parsedPrice = price ? (typeof price === 'string' ? parseFloat(price) : price) : undefined;
  
  const updatedPackage = await PackageRepository.updatePackage(packageId, {
    name,
    price: parsedPrice,
    notes,
    sessionId,
    serviceIds
  });
  
  return { package: updatedPackage };
}

export async function deletePackage(packageId: string) {
  await PackageRepository.deletePackage(packageId);

  return { message: 'Package deleted successfully' };
}