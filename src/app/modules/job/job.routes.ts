import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { jobController } from "./job.controller";
import { jobValidation } from "./job.validation";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.ADMIN),
  validateRequest(jobValidation.createJob),
  jobController.createJob
);

router.get("/", jobController.getAllJobs);

router.get(
  "/my-jobs",
  auth(UserRole.ADMIN),
  jobController.getMyJobs
);

router.get(
  "/:jobId",
  auth(UserRole.ADMIN, UserRole.USER),
  jobController.getAJob
);

router.put(
  "/:jobId",
  auth(UserRole.ADMIN),
  validateRequest(jobValidation.updateJob),
  jobController.updateAJob
);

router.delete(
  "/:jobId",
  auth(UserRole.ADMIN),
  jobController.deleteAJob
);

export const jobRoutes = router;
