import { prisma } from '@/lib/prisma';
import {  CreatePackageInput } from '@/types/packages';

export async function createPackage(data: CreatePackageInput) {
  const { serviceIds, ...packageData } = data;
  
  return prisma.package.create({
    data: {
      ...packageData,
      packageServices: {
        create: serviceIds.map(serviceId => ({
          serviceId
        }))
      }
    },
    include: {
      packageServices: {
        include: {
          service: true
        }
      },
      session: true
    }
  });
}

export async function findPackagesByUserId(userId: string) {
  return prisma.package.findMany({
    where: { userId },
    include: {
      packageServices: {
        include: {
          service: true
        }
      },
      session: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function findPackageById(id: string) {
  return prisma.package.findUnique({
    where: { id },
    include: {
      packageServices: {
        include: {
          service: true
        }
      },
      session: true
    }
  });
}

export async function updatePackage(id: string, data: Partial<CreatePackageInput>) {
  const { serviceIds, ...packageData } = data;
  
  if (serviceIds) {
    await prisma.packageService.deleteMany({
      where: { packageId: id }
    });
    
    await Promise.all(
      serviceIds.map(serviceId => 
        prisma.packageService.create({
          data: {
            packageId: id,
            serviceId
          }
        })
      )
    );
  }
  
  return prisma.package.update({
    where: { id },
    data: packageData,
    include: {
      packageServices: {
        include: {
          service: true
        }
      },
      session: true
    }
  });
}

export async function deletePackage(id: string) {
  return prisma.package.delete({
    where: { id },
    include: {
      packageServices: {
        include: {
          service: true
        }
      },
      session: true
    }
  });
}
export async function deleteManyPackages(packageIds: string[]) {
  return prisma.package.deleteMany({
    where: {
      id: {
        in: packageIds
      }
    }
  });
}
export async function deleteAllPackages(userId: string) {
  return prisma.package.deleteMany({
    where: { userId }
  });
}