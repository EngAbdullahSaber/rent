"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../tables/advanced/components/data-table";
import { DataTableColumnHeader } from "../../tables/advanced/components/data-table-column-header";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import DeleteConfirmationDialog from "../../shared/DeleteConfirmationDialog";
import { ChevronDown, ChevronRight } from "lucide-react";
import CreateSubCategoryButton from "./CreateSubCategoryButton";

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
  subRows?: Task[];
}

export const data = [
  {
    id: "1",
    Name: "Main Category 1",
    Mac: "Icon 1",
    CITY: "3 Subcategories",
    isSubcategory: false,

    subRows: [
      {
        id: "1-1",
        Name: "Subcategory 1-1",
        Mac: "Sub Icon 1",
        CITY: "Item 1",
        isSubcategory: true,
      },
      {
        id: "1-2",
        Name: "Subcategory 1-2",
        Mac: "Sub Icon 2",
        CITY: "Item 2",
        isSubcategory: true,
      },
    ],
  },
  {
    id: "2",
    Name: "Main Category 2",
    Mac: "Icon 2",
    CITY: "2 Subcategories",
    isSubcategory: false,

    subRows: [
      {
        id: "2-1",
        Name: "Subcategory 2-1",
        Mac: "Sub Icon 3",
        isSubcategory: true,

        CITY: "Item 3",
      },
    ],
  },
];
interface TableDataProps {
  setFlag: (flag: boolean) => void;
  flag: boolean;
}
const TableData = ({ setFlag, flag }: TableDataProps) => {
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState<number>(1);
  const searchPlaceholder = "Search";
  const [filters, setFilters] = useState<Record<string, string>>({
    status_filter: "",
    category_filter: "",
    claim_status_filter: "",
  });
  const filtersConfig: any = [];

  const handleFilterSubmit = () => {
    setOpen(false);
  };

  const handleFilterChange = (updatedFilters: Record<string, string>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...updatedFilters,
    }));
  };

  const handleDeleteCategory = async (id: string) => {
    console.log("Deleting category with id:", id);
    // Add your category deletion logic here
  };

  const handleDeleteSubcategory = async (id: string) => {
    console.log("Deleting subcategory with id:", id);
    // Add your subcategory deletion logic here
  };

  const columns: ColumnDef<Task>[] = [
    {
      id: "expander",
      header: () => null,
      cell: ({ row }) => {
        return row.getCanExpand() ? (
          <button
            onClick={row.getToggleExpandedHandler()}
            className="p-1 rounded hover:bg-gray-100"
          >
            {row.getIsExpanded() ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        ) : (
          <div className="w-4"></div>
        );
      },
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"ID"} />
      ),
      cell: ({ row }) => <div className="">{row.original.id}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Actions"} />
      ),
      cell: ({ row }) => {
        const isSubcategory = row.original.isSubcategory;

        return (
          <div className="flex flex-row gap-2 items-center justify-center">
            {isSubcategory ? (
              <DeleteConfirmationDialog
                title="Deleting Subcategory"
                description="Are you sure you want to delete this subcategory?"
                handleDelete={() => handleDeleteSubcategory(row.original.id)}
                id={row.original.id}
              />
            ) : (
              <>
                <DeleteConfirmationDialog
                  title="Deleting Category"
                  description="Are you sure you want to delete this category? All subcategories will also be deleted."
                  handleDelete={() => handleDeleteCategory(row.original.id)}
                  id={row.original.id}
                />
                <CreateSubCategoryButton setFlag={setFlag} flag={flag} />
              </>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "Name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Category name"} />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2 mx-auto">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.Name}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "Mac",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Classification icon"} />
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2 mx-auto">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.Mac}
          </span>
        </div>
      ),
      filterFn: (row, id, value) => value.includes(row.getValue(id)),
    },
    {
      accessorKey: "CITY",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Subcategories"} />
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2 mx-auto">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.CITY}
          </span>
        </div>
      ),
      filterFn: (row, id, value) => value.includes(row.getValue(id)),
    },
  ];

  const isPaginationDisabled = data.length < 10 || data.length === 0;

  return (
    <div>
      <DataTable
        data={data}
        columns={columns}
        setPage={setPage}
        setSearch={setSearch}
        searchPlaceholder={searchPlaceholder}
        page={page}
        open={open}
        setOpen={setOpen}
        search={search}
        filtersConfig={filtersConfig}
        onFilterChange={handleFilterChange}
        onFilterSubmit={handleFilterSubmit}
        isPaginationDisabled={isPaginationDisabled}
        getSubRows={(row) => row.subRows}
      />
    </div>
  );
};

export default TableData;
