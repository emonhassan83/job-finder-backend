import { Job, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { IPaginationOptions, IUser } from "../../interfaces";
import { jobSearchAbleFields } from "./job.constant";

const createJobIntoDB = async (userData: IUser, jobData: any): Promise<Job> => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId,
      isDeleted: false,
    },
  });

  await prisma.job.findUniqueOrThrow({
    where: {
      id: jobData?.jobId,
    },
  });

  const result = await prisma.job.create({
    data: jobData,
  });

  return result;
};

const getAllJobsFromDB = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.JobWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: jobSearchAbleFields.map((field) => ({
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

  const whereConditions: Prisma.JobWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // console.dir(whereConditions, { depth: Infinity });

  const result = await prisma.job.findMany({
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
    },
  });

  const total = await prisma.job.count({
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

const getMyJobsFromDB = async (
  params: any,
  options: IPaginationOptions,
  userData: IUser
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.JobWhereInput[] = [];

  if (userData?.role) {
    andConditions.push({
      user: {
        id: userData.userId,
      },
    });
  }

  if (params.searchTerm) {
    andConditions.push({
      OR: jobSearchAbleFields.map((field) => ({
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

  const whereConditions: Prisma.JobWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // console.dir(whereConditions, {depth: Infinity});

  const result = await prisma.job.findMany({
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
    },
  });

  const total = await prisma.job.count({
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

const getAIntoDB = async (jobId: string, userData: IUser) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId,
      isDeleted: false,
    },
  });

  await prisma.job.findUniqueOrThrow({
    where: {
      id: jobId,
    },
  });

  const result = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
    include: {
      user: true,
    },
  });

  return result;
};

const updateIntoDB = async (
  userData: IUser,
  jobId: string,
  data: Partial<Job>
): Promise<Job> => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId,
      isDeleted: false,
    },
  });

  await prisma.job.findUniqueOrThrow({
    where: {
      id: jobId,
    },
  });

  const result = await prisma.job.update({
    where: {
      id: jobId,
    },
    data,
    include: {
      user: true,
    },
  });

  return result;
};

const deleteIntoDB = async (userData: IUser, jobId: string): Promise<Job> => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId,
      isDeleted: false,
    },
  });

  await prisma.job.findUniqueOrThrow({
    where: {
      id: jobId,
    },
  });

  return await prisma.$transaction(async (transactionClient) => {
    const deleteJob = await transactionClient.job.delete({
      where: {
        id: jobId,
      },
    });

    //* delete job applications
    await transactionClient.application.deleteMany({
      where: {
        jobId: jobId,
      },
    });
    
    return deleteJob;
  });
};

export const JobService = {
  createJobIntoDB,
  getAllJobsFromDB,
  getMyJobsFromDB,
  getAIntoDB,
  updateIntoDB,
  deleteIntoDB,
};
