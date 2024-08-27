import { UserRole } from "@prisma/client";
import { z } from "zod";

const createUser = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required!",
    }),
    email: z.string({
      required_error: "Email is required!",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
    contactNumber: z.string({
      required_error: "Contact number is required!",
    }),
    address: z.string({
      required_error: "Address is required",
    }),
  }),
});

const updateUser = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required!",
      })
      .optional(),
    email: z
      .string({
        required_error: "Email is required!",
      })
      .optional(),
    profilePhoto: z
      .string({
        required_error: "Profile photo is required!",
      })
      .optional(),
    contactNumber: z
      .string({
        required_error: "Contact number is required!",
      })
      .optional(),
    address: z
      .string({
        required_error: "Address is required",
      })
      .optional(),
  }),
});

const updateRole = z.object({
  body: z.object({
    role: z.enum([ UserRole.ADMIN, UserRole.USER]),
  }),
});

export const userValidation = {
  createUser,
  updateUser,
  updateRole,
};
