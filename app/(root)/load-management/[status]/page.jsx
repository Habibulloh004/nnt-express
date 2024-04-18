import React from "react";
import FakeTable from "@/components/shared/fake-table";
import axios from "axios";
import { columns } from "@/components/shared/column";
import { queryPathLoad } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const Status = async ({ params }) => {
  const queryItem = queryPathLoad.find(
    (item) => item.path === `/${params.status}`
  );

  if (!queryItem) {
    return <div>No data available for this status</div>;
  }

  const { requestQuery } = queryItem;

  const loadData = await axios.get(
    `http://64.226.120.39:8000/api/load/?search=${requestQuery}`
  );
  const dispatcherData = await axios.get(
    `http://64.226.120.39:8000/api/dispatcher/`
  );
  const customerData = await axios.get(
    `http://64.226.120.39:8000/api/customer/`
  );
  const truckData = await axios.get(`http://64.226.120.39:8000/api/truck/`);
  const stopData = await axios.get(`http://64.226.120.39:8000/api/stop/`);

  return (
    <>
      <ScrollArea className="w-full rounded-md">
        
        <FakeTable
          data={loadData.data.results}
          columns={columns}
          dispatcher={dispatcherData.data.results}
          customer={customerData.data.results}
          truck={truckData.data.results}
          stop={stopData.data.results}
        />
      </ScrollArea>
    </>
  );
};

export default Status;
