import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { JobService } from "./job.service";
import pick from "../../../shared/pick";
import { jobFilterableFields, jobSearchAbleFields } from "./job.constant";
import { RequestWithUser } from "../../interfaces";

const createJob = catchAsync(async (req, res) => {
  const user = (req as RequestWithUser)?.user;
  const result = await JobService.createJobIntoDB(user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Job added successfully!",
    data: result,
  });
});

const getAllJobs = catchAsync(async (req, res) => {  
    const filters = pick(req.query, jobFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  
    const result = await JobService.getAllJobsFromDB(filters, options);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Jobs retrieved successfully!",
      meta: result.meta,
      data: result.data,
    });
  });

const getMyJobs = catchAsync(async (req, res) => {  
    const filters = pick(req.query, jobSearchAbleFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const user = (req as RequestWithUser)?.user;
  
    const result = await JobService.getMyJobsFromDB(filters, options, user);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My all jobs retrieved successfully!",
      meta: result.meta,
      data: result.data,
    });
  });

const getAJob = catchAsync(async (req, res) => {
  const { jobId } = req.params;
    const user = (req as RequestWithUser)?.user;
  
    const result = await JobService.getAIntoDB(jobId, user);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "A job retrieved successfully!",
      data: result,
    });
  });

  const updateAJob = catchAsync(async (req, res) => {
    const { jobId } = req.params;
    const user = (req as RequestWithUser)?.user;

    const result = await JobService.updateIntoDB(user, jobId, req.body);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Job updated successfully!",
      data: result,
    });
  });

  const deleteAJob = catchAsync(async (req, res) => {
    const { jobId } = req.params;
    const user = (req as RequestWithUser)?.user;
    const result = await JobService.deleteIntoDB(user, jobId);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Job deleted successfully!",
      data: result,
    });
  });

export const jobController = {
  createJob,
  getAllJobs,
  getMyJobs,
  getAJob,
  updateAJob,
  deleteAJob
};
