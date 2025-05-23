"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { useTranslate } from "@/config/useTranslation";
interface DataTableProps<TData> {
  columns: any;
  data: any;
  filtersConfig: any;
  onFilterSubmit: any;
  onFilterChange: any;
  page: number;
  search: string;
  searchPalsceholder: string;
  open: any;
  setOpen?: any;
  setPage?: (pageId: any) => void;
  setSearch?: (data: any) => void;
  isPaginationDisabled: boolean;
}
export function DataTable<TData>({
  columns,
  data,
  page,
  onFilterChange,
  onFilterSubmit,
  filtersConfig,
  setPage,
  setOpen,
  open,
  searchPalsceholder,
  setSearch,
  isPaginationDisabled,
  search,
}: DataTableProps<TData>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const { t, loading, error } = useTranslate();

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar
        setSearch={setSearch}
        setOpen={setOpen}
        open={open}
        search={search}
        table={table}
        onFilterChange={onFilterChange}
        filtersConfig={filtersConfig}
        onFilterSubmit={onFilterSubmit}
        searchPalsceholder={searchPalsceholder}
      />
      <div className="rounded-md ">
        <Table id="data-table">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className="!text-center rtl:!text-center"
                      key={header.id}
                      colSpan={header.colSpan}
                    >
                      {header.isPlaceholder
                        ? null
                        : t(header?.id?.toLocaleLowerCase())}
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
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="my-2" // Add margin between rows
                  style={{
                    backgroundColor: "transparent", // Ensure background is transparent
                    borderSpacing: "0 10px", // Alternative approach
                    borderCollapse: "separate", // Needed with borderSpacing
                  }}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell
                        className="!text-center rtl:!text-center bg-white dark:bg-[#1E293B] rounded-lg" // Add rounded corners and background
                        key={cell.id}
                        value={cell.getValue()}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
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
                  className="h-24 !text-center dark:text-[#fff]"
                >
                  {t("No results")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        table={table}
        data={data}
        setPage={setPage}
        page={page}
        isPaginationDisabled={isPaginationDisabled}
      />{" "}
    </div>
  );
}
