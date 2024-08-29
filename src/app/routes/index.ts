import express from "express";
import { userRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { jobRoutes } from "../modules/job/job.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/jobs",
    route: jobRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
