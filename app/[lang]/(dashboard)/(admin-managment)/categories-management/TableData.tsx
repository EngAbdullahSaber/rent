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
          <DeleteConfirmationDialog
            title="Deleting Category"
            description="Are You Sure For Delete This Category?"
            handleDelete={handleDelete}
            id={row.original.id} // Pass the id directly
          />{" "}
          {/* <ViewMore row={row.original} /> */}
          {/* <DeleteButton /> */}
        </div>
      ),
    },
    {
      accessorKey: "Category name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Category name"} />
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
      accessorKey: "Classification icon",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Classification icon"} />
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
      accessorKey: "Subcategories",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Subcategories"} />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex  items-center justify-center gap-2 mx-auto">
            <span className="max-w-[500px] truncate font-medium">
              {row.original.CITY}
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
