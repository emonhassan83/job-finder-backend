import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { applicationValidation } from "./application.validation";
import { applicationController } from "./application.controller";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.USER),
  validateRequest(applicationValidation.createApplication),
  applicationController.createApplication
);

router.get("/", auth(UserRole.ADMIN), applicationController.getAllApplications);

router.get(
  "/my-applications",
  auth(UserRole.USER),
  applicationController.getMyApplications
);

router.get(
  "/:applicationId",
  auth(UserRole.ADMIN, UserRole.USER),
  applicationController.getAApplication
);

router.put(
  "/:applicationId",
  auth(UserRole.ADMIN, UserRole.USER),
  validateRequest(applicationValidation.updateApplication),
  applicationController.updateAApplication
);

router.delete(
  "/:applicationId",
  auth(UserRole.ADMIN, UserRole.USER),
  applicationController.deleteAApplication
);

export const applicationRoutes = router;
