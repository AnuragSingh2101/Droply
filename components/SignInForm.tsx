"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Mail, Lock, AlertCircle, Eye, EyeOff } from "lucide-react";
import { signInSchema } from "@/schemas/signInSchema";

export default function SignInForm() {
  const router = useRouter();
  const { signIn, isLoaded, setActive } = useSignIn();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    if (!isLoaded) return;

    setIsSubmitting(true);
    setAuthError(null);

    try {
      const result = await signIn.create({
        identifier: data.identifier,
        password: data.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      } else {
        console.error("Sign-in incomplete:", result);
        setAuthError("Sign-in could not be completed. Please try again.");
      }
    } catch (error: any) {
      console.error("Sign-in error:", error);
      setAuthError(
        error.errors?.[0]?.message ||
          "An error occurred during sign-in. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <Card className="w-full max-w-md border border-cyan-600 bg-gray-800 shadow-lg shadow-cyan-900/50 rounded-lg">
        <CardHeader className="flex flex-col gap-1 items-center pb-2">
          <h1 className="text-3xl font-extrabold text-cyan-400">
            Welcome Back
          </h1>
          <p className="text-cyan-200 text-center">
            Sign in to access your secure cloud storage
          </p>
        </CardHeader>

        <Divider className="border-cyan-600" />

        <CardBody className="py-6">
          {authError && (
            <div className="bg-red-800 text-red-300 p-4 rounded-lg mb-6 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p>{authError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="identifier"
                className="text-sm font-medium text-cyan-300"
              >
                Email
              </label>
              <Input
                id="identifier"
                type="email"
                placeholder="your.email@example.com"
                startContent={<Mail className="h-4 w-4 text-cyan-400" />}
                isInvalid={!!errors.identifier}
                errorMessage={errors.identifier?.message}
                {...register("identifier")}
                className="w-full bg-gray-700 text-cyan-100 border border-cyan-600 placeholder-cyan-300 focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-cyan-300"
                >
                  Password
                </label>
              </div>
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
                    className="text-cyan-400 hover:text-cyan-300"
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
                className="w-full bg-gray-700 text-cyan-100 border border-cyan-600 placeholder-cyan-400 focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button
                type="submit"
                isLoading={isSubmitting}
                className="bg-cyan-600 border border-cyan-500 text-white rounded-xl shadow-lg shadow-cyan-800/40 font-semibold transition flex items-center justify-center px-6"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </div>
          </form>
        </CardBody>

        <Divider className="border-cyan-600" />

        <CardFooter className="flex justify-center py-4">
          <p className="text-sm text-cyan-400">
            Don't have an account?{" "}
            <Link
              href="/sign-up"
              className="text-cyan-300 hover:underline font-semibold"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
