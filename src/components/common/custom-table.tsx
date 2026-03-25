import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomLoader from "@/components/common/custom-loader";
import { Inbox } from "lucide-react";
import { satoshi } from "@/fonts";

export type RowPinningPosition = false | "top" | "bottom";

export type RowPinningState = {
  top?: string[];
  bottom?: string[];
};

export type RowPinningRowState = {
  rowPinning: RowPinningState;
};

// type TData = unknown;
// type TValue = unknown;

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
  emptyState?: { title: string; message: string };
}

// TODO: write the props for this component
// TODO: handle the pin and unpin feature
// TODO: handle className props
// TODO: handle empty record : allow passing empty record component as props
const CustomTable = ({
  data,
  columns,
  loading,
  emptyState,
}: DataTableProps<TData, TValue>) => {
  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowPinning: true,
    keepPinnedRows: true,
  });

  return (
    <Table
      className={cn(
        "border-separate border-spacing-y-3 w-full",
        satoshi.className,
      )}
    >
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  key={header.id}
                  className={cn(
                    "h-[29px] text-xs font-bold border-b text-color-8 border-password-toggle-btn",
                    // index === 0
                    //   ? "rounded-l-xl"
                    //   : index === headerGroup.headers.length - 1
                    //   ? "rounded-r-xl"
                    //   : ""
                  )}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  {/* Pin to left control */}
                  {/* {
                    header.column.getIsPinned() ? 
                    <button type='button' onClick={() => header.column.pin(false)}>Unpin</button> :
                    <button type='button' onClick={() => header.column.pin('left')}>Pin to left</button>
                  } */}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody className="text-xs">
        {loading ? (
          <TableRow className="relative after:absolute after:-bottom-2 after:left-0 after:h-[1px] after:w-full after:bg-mid-gray-400">
            <TableCell
              colSpan={columns.length}
              className="py-3 text-sm font-normal leading-5 rounded-xl text-center"
            >
              <CustomLoader />
            </TableCell>
          </TableRow>
        ) : table?.getRowModel().rows?.length ? (
          <>
            {/* Render Top Pinned Rows */}
            {table.getTopRows().map((row) => (
              <TableRow
                key={row.id}
                className={cn(
                  "relative after:absolute after:-bottom-2 after:left-0 after:h-[1px] after:w-full after:bg-mid-gray-400",
                  "pinned-row",
                )}
              >
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      "py-3 text-sm font-normal leading-5",
                      index === 0
                        ? "rounded-l-xl"
                        : index === row.getVisibleCells().length - 1
                          ? "rounded-r-xl"
                          : "",
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    {/* Add Unpin Button */}
                    {index === 0 && (
                      <button onClick={() => row.pin(false)}>Unpin</button>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}

            {/* Render Center Rows */}
            {table.getCenterRows().map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={cn(
                  "relative after:absolute after:-bottom-2 after:left-0 after:h-[1px] after:w-full after:bg-mid-gray-400",
                )}
              >
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      "py-3 text-sm font-normal leading-5",
                      index === 0
                        ? "rounded-l-xl"
                        : index === row.getVisibleCells().length - 1
                          ? "rounded-r-xl"
                          : "",
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    {/* Add Pin Buttons */}
                    {/* {index === 0 && <button onClick={() => row.pin('top')}>Pin to Top</button>} */}
                  </TableCell>
                ))}
              </TableRow>
            ))}

            {/* Render Bottom Pinned Rows */}
            {table.getBottomRows().map((row) => (
              <TableRow
                key={row.id}
                className={cn(
                  "relative after:absolute after:-bottom-2 after:left-0 after:h-[1px] after:w-full after:bg-mid-gray-400",
                  "pinned-row",
                )}
              >
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      "py-3 text-sm font-normal leading-5",
                      index === 0
                        ? "rounded-l-xl"
                        : index === row.getVisibleCells().length - 1
                          ? "rounded-r-xl"
                          : "",
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    {/* Add Unpin Button */}
                    {index === 0 && (
                      <button onClick={() => row.pin(false)}>Unpin</button>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </>
        ) : (
          <TableRow className="relative after:absolute after:-bottom-2 after:left-0 after:h-[1px] after:w-full after:bg-mid-gray-400">
            <TableCell
              colSpan={columns.length}
              className="py-3 text-sm rounded-xl"
            >
              <div className="flex items-center gap-1 justify-center flex-col py-5">
                <Inbox
                  strokeWidth={1}
                  className="w-[74px] h-[74px] mx-auto text-color-6 mb-3"
                />
                {emptyState?.title && (
                  <p className="text-base font-[900] leading-5 text-color-8">
                    {emptyState?.title}
                  </p>
                )}
                <p className="text-sm font-normal leading-5 text-color-6">
                  {emptyState?.message ?? "No record found"}
                </p>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export { CustomTable };
