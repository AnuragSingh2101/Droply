"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";
import {
  Mail,
  Lock,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { signUpSchema } from "@/schemas/signUpSchema";

export default function SignUpForm() {
  const router = useRouter();
  const { signUp, isLoaded, setActive } = useSignUp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    if (!isLoaded) return;
    setIsSubmitting(true);
    setAuthError(null);

    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerifying(true);
    } catch (error: any) {
      console.error("Sign-up error:", error);
      setAuthError(
        error.errors?.[0]?.message ||
          "An error occurred during sign-up. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerificationSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!isLoaded || !signUp) return;

    setIsSubmitting(true);
    setVerificationError(null);

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      } else {
        setVerificationError(
          "Verification could not be completed. Please try again."
        );
      }
    } catch (error: any) {
      setVerificationError(
        error.errors?.[0]?.message ||
          "An error occurred during verification. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (verifying) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <Card className="w-full max-w-md bg-gray-800 border border-cyan-600 shadow-lg">
          <CardHeader className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-cyan-400">
              Verify Your Email
            </h1>
            <p className="text-cyan-200 text-center">
              We've sent a verification code to your email
            </p>
          </CardHeader>

          <Divider className="border-cyan-600" />

          <CardBody>
            {verificationError && (
              <div className="bg-red-800 text-red-300 p-4 rounded-lg mb-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                <p>{verificationError}</p>
              </div>
            )}
            <form onSubmit={handleVerificationSubmit} className="space-y-6">
              <Input
                id="verificationCode"
                type="text"
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full bg-gray-700 text-cyan-100 border-cyan-600 placeholder-cyan-400"
                autoFocus
              />
              <Button
                type="submit"
                color="cyan"
                className="w-full"
                isLoading={isSubmitting}
              >
                {isSubmitting ? "Verifying..." : "Verify Email"}
              </Button>
            </form>

            <p className="text-sm text-cyan-400 text-center mt-4">
              Didn't receive a code?{" "}
              <button
                onClick={async () => {
                  if (signUp) {
                    await signUp.prepareEmailAddressVerification({
                      strategy: "email_code",
                    });
                  }
                }}
                className="font-medium underline hover:text-cyan-300"
              >
                Resend code
              </button>
            </p>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-gray-800 border border-cyan-600 shadow-lg">
        <CardHeader className="flex flex-col items-center">
          <h1 className="text-2xl font-bold text-cyan-400">
            Create Your Account
          </h1>
          <p className="text-cyan-200 text-center">
            Sign up to start managing your images securely
          </p>
        </CardHeader>

        <Divider className="border-cyan-600" />

        <CardBody className="space-y-6">
          {authError && (
            <div className="bg-red-800 text-red-300 p-4 rounded-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <p>{authError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <label
              htmlFor="identifier"
              className="text-sm font-medium text-cyan-300"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              startContent={<Mail className="h-4 w-4 text-cyan-400" />}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              {...register("email")}
              className="w-full bg-gray-700 text-cyan-100 border-cyan-600 placeholder-cyan-400 focus:bg-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500"
            />

            <label
              htmlFor="identifier"
              className="text-sm font-medium text-cyan-300"
            >
              Password
            </label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              startContent={<Lock className="h-4 w-4 text-cyan-400" />}
              endContent={
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                  className="text-cyan-400"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              }
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              {...register("password")}
              className="w-full bg-gray-700 text-cyan-100 border-cyan-600 placeholder-cyan-400 focus:bg-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500"
            />

            <label
              htmlFor="identifier"
              className="text-sm font-medium text-cyan-300"
            >
              Confirm Password
            </label>
            <Input
              id="passwordConfirmation"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              startContent={<Lock className="h-4 w-4 text-cyan-400" />}
              endContent={
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  type="button"
                  className="text-cyan-400"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              }
              isInvalid={!!errors.passwordConfirmation}
              errorMessage={errors.passwordConfirmation?.message}
              {...register("passwordConfirmation")}
              className="w-full bg-gray-700 text-cyan-100 border-cyan-600 placeholder-cyan-400 focus:bg-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500"
            />

            <div className="flex items-start gap-2 text-cyan-300">
              <CheckCircle className="h-5 w-5 text-cyan-400 mt-0.5" />
              <p className="text-sm">
                By signing up, you agree to our Terms of Service and Privacy
                Policy
              </p>
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                isLoading={isSubmitting}
                className="bg-cyan-600 border border-cyan-500 text-white rounded-xl shadow-lg shadow-cyan-800/40 font-semibold transition flex items-center justify-center px-6"
              >
                {isSubmitting ? "Creating account..." : "Create Account"}
              </Button>
            </div>
          </form>
        </CardBody>

        <Divider className="border-cyan-600" />

        <CardFooter className="flex justify-center py-4">
          <p className="text-sm text-cyan-400">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-cyan-300 hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
