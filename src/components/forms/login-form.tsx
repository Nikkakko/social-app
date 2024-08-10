"use client";
import { loginAction } from "@/app/_actions/auth";
import { LoginInput, loginSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = ({}) => {
  const [error, setError] = React.useState<string>();
  const [isPending, stratTransition] = React.useTransition();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginInput) {
    setError(undefined);
    stratTransition(async () => {
      const { error } = await loginAction(data);
      if (error) {
        setError(error);
      }
    });
  }

  const isLoading = form.formState.isSubmitting || isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {error && <p className="text-destructive text-center">{error}</p>}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Username" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" placeholder="Password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? <Loader className="animate-spin" /> : "Login"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
