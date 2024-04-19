"use client";
import * as React from "react";
import * as z from "zod";

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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePopup } from "../context/popup-context";

const formSchema = z.object({
  companyName: z.string().nonempty(),
  email: z.string().email(),
  password: z.string().nonempty(),
});

function Login() {
  const [loadingState, setLoadingState] = useState(false);
  const { setLoading } = usePopup();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (value) => {
    const hasUser = roles.find((role) => role.email === value.email);
    try {
      if (!hasUser) {
        toast.error("Error with credintials!");
        return;
      }
      setLoadingState(true);
      router.push("/load-management/load-trip");

      document.cookie = `session=${encodeURIComponent(
        JSON.stringify(value)
      )}; Max-Age=${60 * 60 * 24}; Path=/;`;

      localStorage.setItem("session", JSON.stringify(value));
    } catch (e) {
      setLoadingState(false);
      console.log(e);
    }
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
              <Button
                disabled={loadingState}
                type="submit"
                onClick={() => setLoading(true)}
              >
                {loadingState ? "Loading..." : "Sign in"}
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </main>
  );
}

export default Login;
