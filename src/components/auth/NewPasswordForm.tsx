
// src/components/auth/NewPasswordForm.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const newPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type NewPasswordFormData = z.infer<typeof newPasswordSchema>;

type NewPasswordFormProps = {
  token: string;
};

export default function NewPasswordForm({ token }: NewPasswordFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordFormData>({
    resolver: zodResolver(newPasswordSchema),
  });

  const onSubmit = async (data: NewPasswordFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await axios.post("/api/auth/new-password", {
        token,
        password: data.password,
      });
      
      // Redirect to login page
      router.push("/?success=password-reset");
    } catch (error: any) {
      setSubmitError(error.response?.data?.message || "Failed to reset password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {submitError && (
        <div className="bg-red-50 p-4 rounded-md text-red-800">{submitError}</div>
      )}

      <div>
        <TextField
          label="New Password"
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
        />
      </div>

      <div>
        <TextField
          label="Confirm New Password"
          type="password"
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          fullWidth
        />
      </div>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={isSubmitting}
      >
        {isSubmitting ? "Resetting Password..." : "Reset Password"}
      </Button>
    </form>
  );
}
