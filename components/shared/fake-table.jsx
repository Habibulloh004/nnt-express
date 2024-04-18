"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Copy, MoveDown, MoveUp } from "lucide-react";
import { usePopup } from "@/app/context/popup-context";
import toast from "react-hot-toast";

const FakeTable = ({ columns, data, dispatcher, customer, truck, stop }) => {
  const [sorting, setSorting] = useState([]);
  const { filtering, setFiltering } = usePopup();
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnOrder, setColumnOrder] = useState(columns.map((c) => c.id));

  //depending on your dnd solution of choice, you may or may not need state like this
  const [movingColumnId, setMovingColumnId] = useState(null);
  const [targetColumnId, setTargetColumnId] = useState(null);

  const reorderColumn = (movingColumnId, targetColumnId) => {
    const newColumnOrder = [...columnOrder];
    newColumnOrder.splice(
      newColumnOrder.indexOf(targetColumnId),
      0,
      newColumnOrder.splice(newColumnOrder.indexOf(movingColumnId), 1)[0]
    );
    setColumnOrder(newColumnOrder);
  };

  const handleDragEnd = (e) => {
    if (!movingColumnId || !targetColumnId) return;
    setColumnOrder(reorderColumn(movingColumnId, targetColumnId));
  };

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
      columnFilters: columnFilters,
      columnOrder,
    },
    onSortingChange: setSorting,
    onGlobalFilterChanged: setFiltering,
    onColumnFiltersChanged: setColumnFilters,
    onColumnOrderChange: setColumnOrder,
  });

  const findNick = (id) => {
    const me = dispatcher.find((item) => item.id === id);
    return me?.nickname;
  };
  const findCompanyName = (id) => {
    const me = customer.find((item) => item.id === id);
    return me?.company_name;
  };
  const findUnitNumber = (id) => {
    const me = truck.find((item) => item.id === id);
    return me?.unit_number;
  };
  const findPickup = (id) => {
    const filteredPick = stop.filter((item) => item.stop_name === "PICKUP");
    const me = filteredPick.find((item) => +item.load === +id);
    return `${me?.address1} / ${me?.city} / ${me?.state}`;
  };

  return (
    <>
      {/* <input type="text" value={filtering} onChange={(e) => setFiltering(e.target.value)} /> */}
      <div className="rounded-md border">
        <Table className="overflow-x-scroll min-w-[1400px] scrollbar-thin scrollbar-webkit">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className="text-center"
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {
                        {
                          asc: <MoveUp className="inline w-3 ml-1" />,
                          desc: <MoveDown className="inline w-3 ml-1" />,
                          // asc && desc ? "" : <Equal className="inline w-3 ml-1" />
                        }[header.column.getIsSorted() ?? null]
                      }
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="text-center"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id} className="min-w-[180px]">
                        {cell.column.columnDef.header === "Load Status" ? (
                          <span
                            className={`border-2 rounded-md border-primary py-2 px-3`}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </span>
                        ) : cell.column.columnDef.header === "Shipment ID" ? (
                          <span className="flex justify-center">
                            <p>DT-</p>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </span>
                        ) : cell.column.columnDef.header === "Created By" ? (
                          findNick(cell.getValue())
                        ) : cell.column.columnDef.header === "Dispatcher" ? (
                          findNick(cell.getValue())
                        ) : cell.column.columnDef.header === "Customer" ? (
                          findCompanyName(cell.getValue())
                        ) : cell.column.columnDef.header === "Truck" ? (
                          findUnitNumber(cell.getValue())
                        ) : cell.column.columnDef.header ===
                          "Pickup Location" ? (
                          findPickup(cell.getValue())
                        ) : cell.column.columnDef.header === "Load ID" ? (
                          <span
                            className="flex justify-center items-center gap-2 h-full cursor-pointer"
                            onClick={() => {
                              navigator.clipboard.writeText(cell.getValue());
                              toast.success("Copied to clipboard", {
                                position: "bottom-right",
                              });
                            }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                            <Copy className="w-3" />
                          </span>
                        ) : (
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default FakeTable;
