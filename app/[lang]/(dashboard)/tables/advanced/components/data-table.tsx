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
  searchPlaceholder: string;
  open: any;
  setOpen?: any;
  setPage?: (pageId: any) => void;
  setSearch?: (data: any) => void;
  isPaginationDisabled: boolean;
  getSubRows?: (row: TData) => TData[] | undefined;
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
  searchPlaceholder,
  setSearch,
  isPaginationDisabled,
  search,
  getSubRows,
}: DataTableProps<TData>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const { t, loading, error } = useTranslate();
  console.log(searchPlaceholder);
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
    getSubRows: getSubRows, // Pass the getSubRows function
    getRowId: (row) => row.id, // Ensure each row has a unique ID
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
        searchPlaceholder={searchPlaceholder}
      />
      <div className="rounded-md">
        <Table id="data-table">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className="!text-center rtl:!text-center"
                      key={header.id}
                      colSpan={header.colSpan}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow
                    data-state={row.getIsSelected() && "selected"}
                    className="my-2"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        className="!text-center rtl:!text-center bg-white dark:bg-[#1E293B] rounded-lg"
                        key={cell.id}
                        style={{
                          paddingLeft: `${row.depth * 20}px`,
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>

                  {/* Render expanded subrows */}
                  {row.getIsExpanded() &&
                    row.subRows &&
                    row.subRows.map((subRow) => (
                      <TableRow
                        key={subRow.id}
                        className="my-2 bg-gray-50 dark:bg-gray-800"
                      >
                        {subRow.getVisibleCells().map((cell) => (
                          <TableCell
                            className="!text-center rtl:!text-center rounded-lg"
                            key={cell.id}
                            style={{
                              paddingLeft: `${(subRow.depth ?? 0) * 20}px`,
                            }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                </React.Fragment>
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
      />
    </div>
  );
}
