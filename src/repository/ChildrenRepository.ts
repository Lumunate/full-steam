import { Children, Prisma } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export async function createChildren(
  data: Prisma.ChildrenCreateInput,
): Promise<Children> {
  return prisma.children.create({
    data,
  });
}

export async function findAllChildren(params: {
  skip?: number;
  take?: number;
  cursor?: Prisma.ChildrenWhereUniqueInput;
  where?: Prisma.ChildrenWhereInput;
  orderBy?: Prisma.ChildrenOrderByWithRelationInput;
  include?: Prisma.ChildrenInclude;
}): Promise<Children[]> {
  const { skip, take, cursor, where, orderBy, include } = params;

  return prisma.children.findMany({
    skip,
    take,
    cursor,
    where,
    orderBy,
    include,
  });
}

export async function findChildrenByUserId(
  userId: string,
): Promise<Children[]> {
  return prisma.children.findMany({
    where: {
      userId,
    },
  });
}

export async function findOneChild(
  childrenWhereUniqueInput: Prisma.ChildrenWhereUniqueInput,
  include?: Prisma.ChildrenInclude,
): Promise<Children | null> {
  return prisma.children.findUnique({
    where: childrenWhereUniqueInput,
    include,
  });
}

export async function updateChilren(params: {
  where: Prisma.ChildrenWhereUniqueInput;
  data: Prisma.ChildrenUpdateInput;
}): Promise<Children> {
  const { where, data } = params;

  return prisma.children.update({
    data,
    where,
  });
}

export async function deleteChildren(
  where: Prisma.ChildrenWhereUniqueInput,
): Promise<Children> {
  return prisma.children.delete({
    where,
  });
}
