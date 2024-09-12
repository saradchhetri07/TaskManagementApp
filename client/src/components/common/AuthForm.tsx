import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ToastContainer } from "react-toastify";

interface AuthFormProps {
  onSubmit: (data: FieldValues) => void;
  formType: "login" | "signup";
}

const baseSchema = {
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
};

const loginSchema = z.object(baseSchema);

const signupSchema = z
  .object({
    ...baseSchema,
    name: z.string().min(1, { message: "Name is required" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, formType }) => {
  const schema = formType === "login" ? loginSchema : signupSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ margin: "2rem" }}>
      {formType === "signup" && (
        <div className="mb-3">
          <input
            {...register("name")}
            className="form-control"
            id="name"
            type="text"
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-danger">{errors.name.message as string}</p>
          )}
        </div>
      )}

      <div className="mb-3">
        <input
          {...register("email")}
          className="form-control"
          id="email"
          type="text"
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="text-danger">{errors.email.message as string}</p>
        )}
      </div>

      <div className="mb-3">
        <input
          {...register("password")}
          className="form-control"
          id="password"
          type="password"
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="text-danger">{errors.password.message as string}</p>
        )}
      </div>

      {formType === "signup" && (
        <div className="mb-3">
          <input
            {...register("confirmPassword")}
            className="form-control"
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <p className="text-danger">
              {errors.confirmPassword.message as string}
            </p>
          )}
        </div>
      )}

      <button type="submit" className="btn btn-dark">
        {formType === "login" ? "Login" : "Sign Up"}
      </button>
      <ToastContainer />
    </form>
  );
};

export default AuthForm;
