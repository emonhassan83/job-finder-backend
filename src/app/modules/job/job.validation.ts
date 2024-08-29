import { z } from "zod";

const createJob = z.object({
  body: z.object({
    title: z.string({
      required_error: "Job title is required!",
    }),
    company: z.string({
      required_error: "Job company is required!",
    }),
    description: z.string({
      required_error: "Job description is required!",
    }),
    skills: z.string({
      required_error: "Job skills is required!",
    }),
    salary: z.string({
      required_error: "Job salary is required!",
    }),
    type: z.number({
      required_error: "Job type is required!",
    }),
    category: z.string({
      required_error: "Job category is required!",
    }),
    numberOFOpenions: z.number({
      required_error: "Job number of opinions is required!",
    }),
    location: z.string({
      required_error: "Job location is required!",
    })
  }),
});

const updateJob = z.object({
  body: z.object({
    title: z.string({
      required_error: "Job title is required!",
    }).optional(),
    company: z.string({
      required_error: "Job company is required!",
    }).optional(),
    description: z.string({
      required_error: "Job description is required!",
    }).optional(),
    skills: z.string({
      required_error: "Job skills is required!",
    }).optional(),
    salary: z.string({
      required_error: "Job salary is required!",
    }).optional(),
    type: z.number({
      required_error: "Job type is required!",
    }).optional(),
    category: z.string({
      required_error: "Job category is required!",
    }).optional(),
    numberOFOpenions: z.number({
      required_error: "Job number of opinions is required!",
    }).optional(),
    location: z.string({
      required_error: "Job location is required!",
    }).optional()
  }),
});

export const jobValidation = {
  createJob,
  updateJob,
};
