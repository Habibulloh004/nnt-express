"use client";
import * as React from "react";
import * as z from "zod";

import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/passwordInput";
import { BigLogo, Logo } from "../../public";
import Image from "next/image";
import toast from "react-hot-toast";
import { roles } from "@/lib/utils";
import { redirect, useRouter } from "next/navigation";

const formSchema = z.object({
  companyName: z.string().nonempty(),
  email: z.string().email(),
  password: z.string().nonempty(),
});

function Login() {
  const cookies = document.cookie;
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (cookies) {
      redirect("/");
    }
  }, [cookies]);

  const handleSubmit = (value) => {
    const hasUser = roles.find((role) => role.email === value.email);
    if (!hasUser) {
      toast.error("Error with credintials!");
      return;
    }
    form.reset();
    document.cookie = `session=${encodeURIComponent(
      JSON.stringify(value)
    )}; Max-Age=${60 * 60 * 24}; Path=/;`;

    localStorage.setItem("session", JSON.stringify(value));
    router.push("/");
  };

  return (
    <main className="w-full h-screen flex justify-center items-center">
      <section className="flex w-full h-full justify-center items-center bg-black">
        <div className="img-container px-10">
          <Image src={BigLogo} alt="Logo" />
        </div>
      </section>
      <section className="flex flex-col gap-5 w-full h-full justify-center">
        <div className="container w-3/5 flex flex-col gap-14">
          <Image src={Logo} alt="Logo" />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-96 flex flex-col gap-5"
            >
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Company name</FormLabel>
                      <FormControl>
                        <Input placeholder="Company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <Button type="submit">Sign in</Button>
            </form>
          </Form>
        </div>
      </section>
    </main>
  );
}

export default Login;
