import { Application, Job, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { IPaginationOptions, IUser } from "../../interfaces";
import { applicationSearchAbleFields } from "./application.constant";

const createApplicationIntoDB = async (userData: IUser, applicationData: any): Promise<Application> => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId,
      isDeleted: false,
    },
  });

  const result = await prisma.application.create({
    data: applicationData,
  });

  return result;
};

const getAllApplicationsFromDB = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.ApplicationWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: applicationSearchAbleFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.ApplicationWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // console.dir(whereConditions, { depth: Infinity });

  const result = await prisma.application.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "asc",
          },
    include: {
      user: true,
      job: true,
    },
  });

  const total = await prisma.application.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getMyApplicationsFromDB = async (
  params: any,
  options: IPaginationOptions,
  userData: IUser
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.ApplicationWhereInput[] = [];

  if (userData?.role) {
    andConditions.push({
      user: {
        id: userData.userId,
      },
    });
  }

  if (params.searchTerm) {
    andConditions.push({
      OR: applicationSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.ApplicationWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // console.dir(whereConditions, {depth: Infinity});

  const result = await prisma.application.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "asc",
          },
    include: {
      user: true,
      job: true,
    },
  });

  const total = await prisma.application.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getAIntoDB = async (applicationId: string, userData: IUser) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId,
      isDeleted: false,
    },
  });

  await prisma.application.findUniqueOrThrow({
    where: {
      id: applicationId,
    },
  });

  const result = await prisma.application.findUnique({
    where: {
      id: applicationId,
    },
    include: {
      user: true,
      job: true,
    },
  });

  return result;
};

const updateIntoDB = async (
  userData: IUser,
  applicationId: string,
  data: Partial<Application>
): Promise<Application> => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId,
      isDeleted: false,
    },
  });

  await prisma.application.findUniqueOrThrow({
    where: {
      id: applicationId,
    },
  });

  const result = await prisma.application.update({
    where: {
      id: applicationId,
    },
    data,
    include: {
      user: true,
    },
  });

  return result;
};

const deleteIntoDB = async (userData: IUser, applicationId: string): Promise<Application> => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId,
      isDeleted: false,
    },
  });

  await prisma.application.findUniqueOrThrow({
    where: {
      id: applicationId,
    },
  });

  return await prisma.$transaction(async (transactionClient) => {
    const deleteApplication = await transactionClient.application.delete({
      where: {
        id: applicationId,
      },
    });
    return deleteApplication;
  });
};

export const ApplicationService = {
  createApplicationIntoDB,
  getAllApplicationsFromDB,
  getMyApplicationsFromDB,
  getAIntoDB,
  updateIntoDB,
  deleteIntoDB,
};
