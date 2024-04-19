// import React from 'react'

// const Dashboard = () => {
//   return (
//     <div>Dashboard</div>
//   )
// }

// export default Dashboard

"use client";
import * as z from "zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { states } from "@/lib/data";
import axios from "axios";

const formSchema = z.object({
  first_name: z.string().nonempty(),
  last_name: z.string().nonempty(),
  password: z.string().nonempty(),
  company_name: z.string().nonempty(),
  employee_status: z.string(),
  nickname: z.string(),
  contact_number: z.string(),
  email_address: z.string(),
  position: z.string(),
  note: z.string(),
  employee_tags: z.string(),
  address1: z.string(),
  address2: z.string(),
  country: z.string(),
  state: z.string(),
  city: z.string(),
  zip_code: z.string(),
});

const Dashboard = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      password: "",
      company_name: "",
      employee_status: "",
      nickname: "",
      contact_number: "",
      email_address: "",
      position: "",
      note: "",
      employee_tags: "",
      address1: "",
      address2: "",
      country: "",
      state: "",
      city: "",
      zip_code: "",
    },
  });
  const [tags, setTags] = useState([]);

  const fetchTags = async () => {
    const { data } = await axios.get(
      "http://64.226.120.39:8000/api/employeetag/"
    );
    setTags(data.results);
  };
  useEffect(() => {
    fetchTags();
  }, []);

  const handleSubmit = async (value) => {
    // console.log(value);
    const transformToNumber = (funcValue) => {
      if (!isNaN(funcValue)) {
        return parseFloat(funcValue);
      }
      return funcValue;
    };

    // Create a new object with transformed values
    const transformedFormValues = {
      ...Object.entries(value).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value === "" ? null : value,
        }),
        {}
      ),
      zip_code: transformToNumber(value.zip_code) || null,
      employee_tags: transformToNumber(value.employee_tags) || null,
    };
    const axiosInstance = axios.create({
      baseURL: "http://64.226.120.39:8000",
      headers: {
        "Content-Type": "application/json",
        // Add more headers as needed
      },
    });
    console.log(transformedFormValues);
    try {
      const res = await axiosInstance.post(
        "/api/employee/",
        JSON.stringify(transformedFormValues)
      );
      console.log(res.data);
      form.reset();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="overflow-y-scroll p-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className=" flex flex-wrap gap-5"
        >
          {[
            "first_name",
            "last_name",
            "employee_status",
            "nickname",
            "contact_number",
            "email_address",
            "position",
            "note",
            "employee_tags",
            "address1",
            "address2",
            "country",
            "state",
            "city",
            "zip_code",
            "company_name",
            "password",
          ].map((item, idx) => {
            return (
              <FormField
                key={idx}
                control={form.control}
                name={item}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>
                        {item === "nickname"
                          ? "NICK NAME"
                          : item.replace("_", " ").toUpperCase()}
                      </FormLabel>
                      <FormControl>
                        {item === "employee_status" || item === "position" ? (
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select a fruit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Fruits</SelectLabel>
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                                <SelectItem value="blueberry">
                                  Blueberry
                                </SelectItem>
                                <SelectItem value="grapes">Grapes</SelectItem>
                                <SelectItem value="pineapple">
                                  Pineapple
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        ) : item === "state" ? (
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select a state" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>State</SelectLabel>
                                {states.map((state, idx) => (
                                  <SelectItem key={idx} value={state.value}>
                                    {state.title}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        ) : item === "employee_tags" ? (
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select a tag" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Tag</SelectLabel>
                                {tags.map((tag, idx) => (
                                  <SelectItem key={idx} value={`${tag.id}`}>
                                    {tag.tag}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input {...field} />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            );
          })}
          <Button type="submit">Sign in</Button>
        </form>
      </Form>
    </div>
  );
};

export default Dashboard;
