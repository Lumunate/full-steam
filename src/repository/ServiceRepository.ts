import { Prisma, Service } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export async function createService(
  data: Prisma.ServiceCreateInput,
): Promise<Service> {
  return prisma.service.create({
    data,
  });
}

export async function findAllServices(params: {
  skip?: number;
  take?: number;
  cursor?: Prisma.ServiceWhereUniqueInput;
  where?: Prisma.ServiceWhereInput;
  orderBy?: Prisma.ServiceOrderByWithRelationInput;
  include?: Prisma.ServiceInclude;
}): Promise<Service[]> {
  const { skip, take, cursor, where, orderBy, include } = params;

  return prisma.service.findMany({
    skip,
    take,
    cursor,
    where,
    orderBy,
    include,
  });
}

export async function findOneService(
  serviceWhereUniqueInput: Prisma.ServiceWhereUniqueInput,
  include?: Prisma.ServiceInclude,
): Promise<Service | null> {
  return prisma.service.findUnique({
    where: serviceWhereUniqueInput,
    include,
  });
}

export async function updateService(params: {
  where: Prisma.ServiceWhereUniqueInput;
  data: Prisma.ServiceUpdateInput;
}): Promise<Service> {
  const { where, data } = params;

  return prisma.service.update({
    data,
    where,
  });
}

export async function deleteService(
  where: Prisma.ServiceWhereUniqueInput,
): Promise<Service> {
  return prisma.service.delete({
    where,
  });
}
