import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ApplicationService } from "./application.service";
import pick from "../../../shared/pick";
import { RequestWithUser } from "../../interfaces";
import { applicationFilterableFields, applicationSearchAbleFields } from "./application.constant";

const createApplication = catchAsync(async (req, res) => {
  const user = (req as RequestWithUser)?.user;
  const result = await ApplicationService.createApplicationIntoDB(user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Application added successfully!",
    data: result,
  });
});

const getAllApplications = catchAsync(async (req, res) => {  
    const filters = pick(req.query, applicationFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  
    const result = await ApplicationService.getAllApplicationsFromDB(filters, options);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Applications retrieved successfully!",
      meta: result.meta,
      data: result.data,
    });
  });

const getMyApplications = catchAsync(async (req, res) => {  
    const filters = pick(req.query, applicationSearchAbleFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const user = (req as RequestWithUser)?.user;
  
    const result = await ApplicationService.getMyApplicationsFromDB(filters, options, user);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My all applications retrieved successfully!",
      meta: result.meta,
      data: result.data,
    });
  });

const getAApplication = catchAsync(async (req, res) => {
  const { applicationId } = req.params;
    const user = (req as RequestWithUser)?.user;
  
    const result = await ApplicationService.getAIntoDB(applicationId, user);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "A application retrieved successfully!",
      data: result,
    });
  });

  const updateAApplication = catchAsync(async (req, res) => {
    const { applicationId } = req.params;
    const user = (req as RequestWithUser)?.user;

    const result = await ApplicationService.updateIntoDB(user, applicationId, req.body);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Application updated successfully!",
      data: result,
    });
  });

  const deleteAApplication = catchAsync(async (req, res) => {
    const { applicationId } = req.params;
    const user = (req as RequestWithUser)?.user;
    const result = await ApplicationService.deleteIntoDB(user, applicationId);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Application deleted successfully!",
      data: result,
    });
  });

export const applicationController = {
  createApplication,
  getAllApplications,
  getMyApplications,
  getAApplication,
  updateAApplication,
  deleteAApplication
};
