"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../tables/advanced/components/data-table";
import { DataTableColumnHeader } from "../../tables/advanced/components/data-table-column-header";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { data } from "../clients";

interface Task {
  id: string;
  Role?: string;
  Mac?: string;
  Name?: string;
  CREATED?: string;
  Email?: string;
  ACTIVATION?: string;
  VACATION?: string;
  GENDER?: string;
  BIRTH?: string;
  ADDRESS?: string;
  PHONE?: string;
  CITY?: string;
}
const TableData = () => {
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState<number>(1);
  const searchPalsceholder = "Searchs";
  const [filters, setFilters] = useState<Record<string, string>>({
    status_filter: "",
    category_filter: "",
    claim_status_filter: "",
  });
  const filtersConfig: any = [];
  const handleFilterSubmit = () => {
    // Perform filtering logic here
    setOpen(false); // Close the sheet after applying filters
  };
  const handleFilterChange = (updatedFilters: Record<string, string>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...updatedFilters,
    }));
  };

  const columns: ColumnDef<Task>[] = [
    {
      accessorKey: "Services",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Services"} />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex  items-center justify-center gap-2 mx-auto">
            <span className="max-w-[500px] truncate font-medium">
              {row.original.Name}
            </span>
          </div>
        );
      },
    },

    {
      accessorKey: "Number of requests",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Number of requests"} />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex  items-center justify-center gap-2 mx-auto">
            <span className="max-w-[500px] truncate font-medium">
              {row.original.Email}
            </span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "Total sales",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Total sales"} />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex  items-center justify-center gap-2 mx-auto">
            <span className="max-w-[500px] truncate font-medium">
              {row.original.PHONE}
            </span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
  ];
  const isPaginationDisabled = data.length < 10 || data.length === 0;

  return (
    <div>
      {/* Render your data table here using the fetched tasks */}
      {/* Assuming you have a table component that takes columns and data */}
      <DataTable
        data={data}
        columns={columns}
        setPage={setPage}
        setSearch={setSearch}
        searchPalsceholder={searchPalsceholder}
        page={page}
        open={open}
        setOpen={setOpen}
        search={search}
        filtersConfig={filtersConfig}
        onFilterChange={handleFilterChange}
        onFilterSubmit={handleFilterSubmit}
        isPaginationDisabled={isPaginationDisabled}
      />
    </div>
  );
};

export default TableData;
