import express from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/register",
  validateRequest(userValidation.createUser),
  userController.createUser
);

router.get(
  "/users",
  auth( UserRole.ADMIN, UserRole.USER),
  userController.getAllFromDB
);

router.get(
  "/profile",
  auth( UserRole.ADMIN, UserRole.USER),
  userController.getMyProfile
);

router.patch(
  "/:id/change-role",
  auth( UserRole.ADMIN),
  validateRequest(userValidation.updateRole),
  userController.changeUserRole
);

router.put(
  "/profile",
  auth(UserRole.ADMIN, UserRole.USER),
  validateRequest(userValidation.updateUser),
  userController.updateMyProfile
);

router.delete(
  '/soft-deleted/:id',
  auth(UserRole.ADMIN),
  userController.softDelete
);

export const userRoutes = router;
