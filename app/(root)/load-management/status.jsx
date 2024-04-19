"use client";
import { axiosInstance, statusPath } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  CornerLeftDownIcon,
  CornerLeftUpIcon,
  CornerUpLeftIcon,
  MoveLeft,
  Plus,
  PlusCircle,
  PlusCircleIcon,
  Upload,
} from "lucide-react";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";

const Status = () => {
  const path = usePathname();
  const router = useRouter();
  const [activeBar, setActiveBar] = useState(1);
  const [customers, setCustomers] = useState([]);
  const [filteredCustomer, setFilteredCustomer] = useState("");
  const [filteredCustomerArr, setFilteredCustomerArr] = useState([]);
  const [postData, setPostData] = useState({
    created_by: null,
    customer_broker: null,
    truck: null,
    created_date: null,
    load_id: null,
    trip_id: null,
    driver: null,
    co_driver: null,
    dispatcher: null,
    load_status: "OFFER",
    tags: null,
    equipment_type: null,
    trip_status: null,
    invoice_status: null,
    trip_bil_status: null,
    load_pay: null,
    driver_pay: null,
    total_pay: null,
    per_mile: null,
    mile: null,
    empty_mile: null,
    total_miles: null,
    flagged: true,
    flagged_reason: null,
    note: null,
    chat: null,
    rate_con: null,
    bol: null,
    pod: null,
    document: null,
    comercial_invoice: null,
  });

  const fetchCustomer = async () => {
    try {
      const { data } = await axios.get(
        "http://64.226.120.39:8000/api/customer/"
      );
      setCustomers(data.results);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchCustomer();
  }, []);
  useEffect(() => {
    filterC();
  }, [filteredCustomer, customers]);

  const filterC = () => {
    setFilteredCustomerArr(
      customers?.filter((c) =>
        c.company_name
          .toLocaleLowerCase()
          .includes(filteredCustomer.toLocaleLowerCase())
      )
    );
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("customer_broker", `${postData.customer_broker}`);
    formData.append("rate_con", `${postData.rate_con}`);
    try {
      await axiosInstance.post("/load/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (e) {
      console.log(e);
    }
    router.push("/load-management/create-load");
  };

  const customerBar = [
    { id: 1, content: "Manual entry" },
    { id: 2, content: "TruckAI" },
  ];

  return (
    <main className="shadow-3xl rounded-md dark:bg-primary-foreground">
      {!path.startsWith("/load-management/create-load") ? (
        <div className="wrapper flex items-center justify-between py-3 px-5">
          <div className="flex gap-3">
            {statusPath.map((item, idx) => {
              const findPath = item.path.startsWith(path);
              return (
                <Link
                  key={idx}
                  href={`${item.path}`}
                  className={`text-sm p-2 px-3 rounded-md relative ${
                    findPath
                      ? "bg-primary text-primary-foreground"
                      : "border-[1px] border-primary"
                  }`}
                >
                  <p className="relative z-50">{item.title}</p>

                  {findPath && (
                    <motion.span
                      layoutId="active-pill"
                      className="absolute w-full h-full inset-0 rounded-md bg-primary z-10"
                    />
                  )}
                </Link>
              );
            })}
          </div>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex items-center px-3 bg-primary text-primary-foreground rounded-md">
                  <Plus /> <p className="py-2 px-2">New Load</p>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-xl">
                <ScrollArea className="w-full h-[100%] rounded-md ">
                  <form onSubmit={submitForm}>
                    <DialogHeader className={`p-4`}>
                      <article className={`flex justify-between items-center`}>
                        <div>
                          <DialogTitle>Create New Load</DialogTitle>
                          <DialogDescription className="mt-2 text-[12px]">
                            Choose a way of creating your Load
                          </DialogDescription>
                        </div>
                        <Button size="sm" className="text-[12px]">
                          <Plus className="inline mr-2 w-4" /> Create new
                          customer
                        </Button>
                      </article>
                    </DialogHeader>
                    <div className="flex items-start justify-between flex-col text-[12px]">
                      <section className="status flex gap-3">
                        {customerBar.map((item, idx) => {
                          return (
                            <span
                              key={idx}
                              className={`text-primary-foreground px-3 py-2 rounded-md cursor-pointer ${
                                +activeBar === +item.id
                                  ? "bg-primary"
                                  : "bg-primary/70"
                              }`}
                              onClick={() => setActiveBar(item.id)}
                            >
                              {item.content}
                            </span>
                          );
                        })}
                      </section>
                      <Input
                        className="border-2 border-primary mt-4 h-9"
                        placeholder="Search..."
                        onChange={(e) => {
                          setFilteredCustomer(e.target.value);
                        }}
                      />
                      <section className="mt-4">
                        <p className="text-base">Recent Customers</p>
                        <ScrollArea className="w-full h-[60%] rounded-md ">
                          <div className="h-full w-full mt-2 flex flex-col gap-3">
                            {filteredCustomer === ""
                              ? customers.map((customer, idx) => (
                                  <span
                                    key={idx}
                                    className="flex items-center gap-3"
                                  >
                                    <Input
                                      type="radio"
                                      id={`${customer.id}`}
                                      value={`${customer.id}`}
                                      name="choose"
                                      className="w-3 h-3 accent-primary"
                                      onChange={(e) => {
                                        setPostData((prev) => ({
                                          ...prev,
                                          created_by: +e.target.value,
                                        }));
                                      }}
                                    />
                                    <label htmlFor={`${customer.id}`}>
                                      {customer.company_name}/
                                      {customer.address1}
                                    </label>
                                  </span>
                                ))
                              : filteredCustomerArr.map((customer, idx) => (
                                  <span
                                    key={idx}
                                    className="flex items-center gap-3"
                                  >
                                    <input
                                      type="radio"
                                      id={`${customer.id}`}
                                      value={`${customer.id}`}
                                      name="choose"
                                      onChange={(e) => {
                                        setPostData((prev) => ({
                                          ...prev,
                                          customer_broker: e.target.value,
                                        }));
                                      }}
                                      className="w-3 h-3 accent-primary"
                                    />
                                    <label htmlFor={`${customer.id}`}>
                                      {customer.company_name}/
                                      {customer.address1}
                                    </label>
                                  </span>
                                ))}
                          </div>
                        </ScrollArea>
                      </section>
                      <section className="sendFile my-5">
                        <Input
                          type="file"
                          onChange={(e) => {
                            setPostData((prev) => ({
                              ...prev,
                              rate_con: e.target.files[0],
                            }));
                          }}
                          className="text-[12px]"
                        />
                      </section>
                    </div>
                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Close
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button
                          type="submit"
                          variant="outline"
                          disabled={
                            !postData.customer_broker && !postData.rate_con
                          }
                        >
                          Submit
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </form>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ) : (
        <>
          <div className="wrapper flex items-end justify-between py-3 px-5 text-[12px]">
            <article>
              <span className="flex items-center">
                <MoveLeft className="w-5 mr-2" />
                <p className="text-base">Loads / </p>
                <span className="border-primary border-2 rounded-md py-[1px] px-1 ml-2">
                  Offer
                </span>
              </span>
              <span className="flex items-center gap-2">
                <p>Tags</p>
                <span>
                  <PlusCircleIcon className="w-5" />
                </span>
              </span>
            </article>
            <article>
              Created by: <b>Admin Account</b>
            </article>
            <article className="text-[10px] flex gap-2">
              <Button className="w-24 h-8 text-[12px] flex items-center gap-1" variant="outline">
                <CornerUpLeftIcon className="w-4" />
                <p>Share</p>
              </Button>
              <Button className="w-36 h-8 text-[12px] flex items-center gap-1">
                <Upload className="w-4" />
                <p>Upload documents</p>
              </Button>
              <Button className="w-24 h-8 text-[12px] flex items-center gap-1">Submit Load</Button>
            </article>
          </div>
        </>
      )}
    </main>
  );
};

export default Status;

const createCustomer = () => {
  return <></>;
};
