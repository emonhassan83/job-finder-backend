import { z } from "zod";
import { ApplicationStatus } from "./application.constant";

const createApplication = z.object({
  body: z.object({
    userId: z.string({
      required_error: "User id is required!",
    }),
    jobId: z.string({
      required_error: "Job id is required!",
    }),
    resumeUrl: z.string({
      required_error: "Application resumeUrl is required!",
    }),
    coverLetter: z
      .string({
        required_error: "Application coverLetter is required!",
      })
      .optional(),
    notes: z
      .string({
        required_error: "Application notes must be a string!",
      })
      .optional(),
  }),
});

const updateApplication = z.object({
  body: z.object({
    resumeUrl: z
      .string({
        required_error: "Application resumeUrl is required!",
      })
      .optional(),
      coverLetter: z
      .string({
        required_error: "Application coverLetter is required!",
      })
      .optional(),
    notes: z
      .string({
        required_error: "Application notes must be a string!",
      })
      .optional(),
    status: z
      .enum([...(ApplicationStatus as [string, ...string[]])], {
        required_error: "Application status is required!",
      })
      .optional(),
  }),
});

export const applicationValidation = {
  createApplication,
  updateApplication,
};
