import React from "react";
import axios from "axios";
import { statusDriverPath } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import FakeTable from "./table/fake-table";
import { columns } from "./table/column";

const Drivers = async ({ params }) => {
  const queryItem = statusDriverPath.find(
    (item) => item.path === `/hr-management/driver/${params.drivers}`
  );

    if (!queryItem) {
      return <div>No data available for this status</div>;
    }

    const { requestQuery } = queryItem;

  const driver = await axios.get(`http://64.226.120.39:8000/api/driver/?search=${requestQuery}`);
  const driverTag = await axios.get(`http://64.226.120.39:8000/api/drivertag/`);

  return (
    <>
      <ScrollArea className="w-full rounded-md">
        <FakeTable
          data={driver.data.results}
          columns={columns}
          driverTag={driverTag.data.results}
        />
      </ScrollArea>
    </>
  );
};

export default Drivers;
