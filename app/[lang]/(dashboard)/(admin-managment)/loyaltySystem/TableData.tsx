"use client";

import { data } from ".";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../tables/advanced/components/data-table";
import { DataTableColumnHeader } from "../../tables/advanced/components/data-table-column-header";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import DeleteConfirmationDialog from "../../shared/DeleteConfirmationDialog";

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

interface TableDataButtonProps {
  setFlag: (flag: boolean) => void;
  flag: boolean;
}
const TableData = ({ flag, setFlag }: TableDataButtonProps) => {
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

  const handleDelete = async (id: any) => {};

  const columns: ColumnDef<Task>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"id"} />
      ),
      cell: ({ row }) => <div className="w-[80px]">{row.original.id}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex flex-row gap-2 items-center justify-center">
          {/* <DeleteConfirmationDialog
            title="Deleting Service"
            description="Are You Sure For Delete This Service?"
            handleDelete={handleDelete}
            id={row.original.id} // Pass the id directly
          />{" "}
          <UpdateOrdersButton
            order={row.original}
            classes="text-white rounded-full transition-colors"
            setFlag={setFlag}
            flag={flag}
          /> */}

          {/* <ViewMore row={row.original} /> */}
          {/* <DeleteButton /> */}
        </div>
      ),
    },
    {
      accessorKey: "Service name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Service name"} />
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
      accessorKey: "Service Image",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Service Image"} />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex  items-center justify-center gap-2 mx-auto">
            <span className="max-w-[500px] truncate font-medium">
              {row.original.Mac}
            </span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"status"} />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex  items-center justify-center gap-2 mx-auto">
            <span className="max-w-[500px] truncate font-medium">
              <Switch defaultChecked />
            </span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "Price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Price"} />
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
      accessorKey: "Created",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Created"} />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex  items-center justify-center gap-2 mx-auto">
            <span className="max-w-[500px] truncate font-medium">
              {row.original.CREATED}
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
