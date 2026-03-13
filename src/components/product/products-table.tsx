"use client";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useConfirm } from "@/hooks/use-confirm";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { baseColumns, Product } from "./columns";
import EditProductModal from "./edit-product-modal";
import ViewProductModal from "./view-product-modal";

interface ProductsTableProps {
  data: Product[];
  loading: boolean;
}

export function ProductsTable({ data, loading }: ProductsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [rowSelection, setRowSelection] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);

  const [DeleteProductModal, confirmDelete] = useConfirm({
    title: "Delete Product",
    description:
      "Are you sure you want to delete this product? It will no longer be visible to Buyers.",
  });

  const handleDeleteProduct = async (value: Product) => {
    const success = await confirmDelete();
    if (!success) {
      return;
    }
    console.log(value);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setOpenEdit(true);
  };

  const handleView = (product: Product) => {
    setSelectedProduct(product);
    setOpenView(true);
  };

  const columns = [
    ...baseColumns,
    {
      id: "actions",
      enableHiding: false,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: { row: any }) => {
        const product = row.original;

        return (
          <div className="flex items-center gap-3">
            {/* View */}
            <Eye
              className="h-4 w-4 cursor-pointer text-blue-500 hover:text-blue-700"
              onClick={() => handleView(product)}
            />

            {/* Edit */}
            <Pencil
              className="h-4 w-4 cursor-pointer text-green-500 hover:text-green-700"
              onClick={() => handleEdit(product)}
            />

            {/* Delete */}
            <Trash2
              className="h-4 w-4 cursor-pointer text-red-500 hover:text-red-700"
              onClick={() => handleDeleteProduct(product)}
            />
          </div>
        );
      },
    },
  ];
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

    if (loading) {
      return <ProductTableSkeleton />;
    }

  return (
    <section
      aria-label="Products table"
      className="w-full bg-white rounded p-5"
    >
      <header className="flex items-center py-4">
        <Input
          placeholder="Filter by product name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </header>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <caption className="sr-only">List of products</caption>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
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

      <DeleteProductModal />
      <EditProductModal
        product={selectedProduct}
        open={openEdit}
        onClose={() => setOpenEdit(false)}
      />
      <ViewProductModal
        product={selectedProduct}
        open={openView}
        onClose={() => setOpenView(false)}
      />
    </section>
  );
}
