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
import axios from "axios";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

const formSchema = z.object({
  first_name: z.string().nonempty(),
  last_name: z.string().nonempty(),
  contact_number: z.string().nonempty(),
  birth_date: z.string().nonempty(),
  employment_status: z.string().nonempty(),
  telegram_username: z.string(),
  driver_status: z.string().nonempty(),
  company_name: z.string().nonempty(),
  email_address: z.string().nonempty().email(),
  password: z.string().nonempty(),
  driver_license_id: z.string(),
  dl_class: z.string(),
  driver_type: z.string(),
  driver_license_state: z.string(),
  driver_license_expiration: z.string(),
  address1: z.string().nonempty(),
  address2: z.string(),
  country: z.string().nonempty(),
  state: z.string().nonempty(),
  city: z.string().nonempty(),
  zip_code: z.string(),
  other_id: z.string(),
  notes: z.string(),
  tariff: z.string().nonempty(),
  mc_number: z.string(),
  team_driver: z.string(),
  permile: z.string(),
  cost: z.string(),
  payd: z.string(),
  assigned_truck: z.string().nonempty(),
  assigned_trailer: z.string(),
  assigned_dispatcher: z.string(),
  driver_tags: z.string(),
});

const CreateDriver = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      contact_number: "",
      birth_date: "",
      employment_status: "",
      telegram_username: "",
      driver_status: "",
      company_name: "",
      email_address: "",
      password: "",
      driver_license_id: "",
      dl_class: "",
      driver_type: "",
      driver_license_state: "",
      driver_license_expiration: "",
      address1: "",
      address2: "",
      country: "",
      state: "",
      city: "",
      zip_code: "",
      other_id: "",
      notes: "",
      tariff: "",
      mc_number: "",
      team_driver: "",
      permile: "",
      cost: "",
      payd: "",
      assigned_truck: "",
      assigned_trailer: "",
      assigned_dispatcher: "",
      driver_tags: "",
    },
  });
  const [tags, setTags] = useState([]);
  const [date, setDate] = React.useState();

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
    const transformToNumber = (funcValue) => {
      if (!isNaN(funcValue)) {
        return parseFloat(funcValue);
      }
      return funcValue;
    };

    const transformedFormValues = {
      ...Object.entries(value).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value === "" ? null : value,
        }),
        {}
      ),
      tariff: transformToNumber(value.tariff) || null,
      permile: transformToNumber(value.permile) || null,
      cost: transformToNumber(value.cost) || null,
      payd: transformToNumber(value.payd) || null,
      assigned_truck: transformToNumber(value.assigned_truck) || null,
      assigned_trailer: transformToNumber(value.assigned_trailer) || null,
      assigned_dispatcher: transformToNumber(value.assigned_dispatcher) || null,
      driver_tags: transformToNumber(value.driver_tags) || null,
    };
    const axiosInstance = axios.create({
      baseURL: "http://64.226.120.39:8000",
      headers: {
        "Content-Type": "application/json",
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

  const employementStatus = [
    {
      value: "ACTIVE (DF)",
      display_name: "ACTIVE (DF)",
    },
    {
      value: "Terminate",
      display_name: "Terminate",
    },
    {
      value: "Applicant",
      display_name: "Applicant",
    },
  ];

  const driverStatus = [
    {
      value: "Available",
      display_name: "Available",
    },
    {
      value: "Home",
      display_name: "Home",
    },
    {
      value: "In-Transit",
      display_name: "In-Transit",
    },
    {
      value: "Inactive",
      display_name: "Inactive",
    },
    {
      value: "Shop",
      display_name: "Shop",
    },
    {
      value: "Rest",
      display_name: "Rest",
    },
    {
      value: "Dispatched",
      display_name: "Dispatched",
    },
  ];

  const classDl = [
    {
      value: "Unknown",
      display_name: "Unknown",
    },
    {
      value: "A",
      display_name: "A",
    },
    {
      value: "B",
      display_name: "B",
    },
    {
      value: "C",
      display_name: "C",
    },
    {
      value: "D",
      display_name: "D",
    },
    {
      value: "E",
      display_name: "E",
    },
    {
      value: "Other",
      display_name: "Other",
    },
  ];

  const driverType = [
    {
      value: "COMPANY_DRIVER",
      display_name: "Company_driver",
    },
    {
      value: "OWNER_OPERATOR",
      display_name: "Owner_operator",
    },
    {
      value: "LEASE",
      display_name: "Lease",
    },
    {
      value: "RENTAL",
      display_name: "Rental",
    },
  ];
  return (
    <div className=" p-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-wrap gap-5 text-[12px]"
        >
          {/* {[
            "first_name",
            "last_name",
            "contact_number",
            "birth_date",
            "employment_status",
            "telegram_username",
            "driver_status",
            "company_name",
            "email_address",
            "password",
            "driver_license_id",
            "dl_class",
            "driver_type",
            "driver_license_state",
            "driver_license_expiration",
            "address1",
            "address2",
            "country",
            "state",
            "city",
            "zip_code",
            "other_id",
            "notes",
            "tariff",
            "mc_number",
            "team_driver",
            "permile",
            "cost",
            "payd",
            "assigned_truck",
            "assigned_trailer",
            "assigned_dispatcher",
            "driver_tags",
          ].map((item, idx) => {
            return (
              <FormField
                key={idx}
                control={form.control}
                name={item}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-[10px]" >
                        {item === "nickname"
                          ? "NICK NAME"
                          : item.replace("_", " ").toUpperCase()}
                      </FormLabel>
                      <FormControl>
                        {item === "employee_status" || item === "position" ? (
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className={`w-48 h-8`}
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
                            className={`w-48 h-8`}
                          >
                            <SelectTrigger className="w-[180px] h-8 text-[12px]">
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
                            className={`w-48 h-8`}
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
                          <Input {...field} className={`w-48 h-8 text-[12px]`} />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            );
          })} */}
          <div className="w-1/2">
            <p className="text-lg">Personal information</p>
            <div className="items grid grid-cols-2 gap-3 mt-3">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} className={`w-full h-8 text-[12px]`} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} className={`w-full h-8 text-[12px]`} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contact_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input {...field} className={`w-full h-8 text-[12px]`} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birth_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full text-left font-normal h-8 text-[12px]",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                          {/* <Input
                            {...field}
                            type="date"
                            placeholder=""
                            className={`w-full h-8 text-[12px] `}
                          /> */}
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="employement_status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employement Status</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className={`w-48 h-8`}
                      >
                        <SelectTrigger className="w-full h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Employement Status</SelectLabel>
                            {employementStatus.map((emS, idx) => (
                              <SelectItem key={idx} value={`${emS.value}`}>
                                {emS.display_name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="telegram_username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telegram Username</FormLabel>
                    <FormControl>
                      <Input {...field} className={`w-full h-8 text-[12px]`} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="driver_status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Driver Status</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className={`w-48 h-8`}
                      >
                        <SelectTrigger className="w-full h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Driver Status</SelectLabel>
                            {driverStatus.map((emS, idx) => (
                              <SelectItem key={idx} value={`${emS.value}`}>
                                {emS.display_name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input {...field} className={`w-full h-8 text-[12px]`} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="driver_license_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Driver License ID</FormLabel>
                    <FormControl>
                      <Input {...field} className={`w-full h-8 text-[12px]`} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-3 items-center">
                <FormField
                  control={form.control}
                  name="dl_class"
                  render={({ field }) => (
                    <FormItem className={`w-1/2`}>
                      <FormLabel>Class DL</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className={`w-full h-8`}
                        >
                          <SelectTrigger className="w-full text-[12px] h-8">
                            <SelectValue placeholder="Select a Class" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Class DL</SelectLabel>
                              {classDl.map((emS, idx) => (
                                <SelectItem key={idx} value={`${emS.value}`}>
                                  {emS.display_name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="driver_type"
                  render={({ field }) => (
                    <FormItem className={`w-1/2`}>
                      <FormLabel>Driver Type</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className={`w-full h-8`}
                        >
                          <SelectTrigger className="w-full h-8 text-[12px]">
                            <SelectValue placeholder="Select a type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Driver Type</SelectLabel>
                              {driverType.map((emS, idx) => (
                                <SelectItem key={idx} value={`${emS.value}`}>
                                  {emS.display_name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <Button type="submit">Sign in</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateDriver;
