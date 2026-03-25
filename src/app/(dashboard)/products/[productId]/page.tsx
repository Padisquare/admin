"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { productsData } from "@/constants/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import EditProductModal from "@/components/product/edit-product-modal";

const ProductDetailsPage = () => {
  const params = useParams();
  const productId = Number(params.productId);
  const [openEditModal, setOpenEditModal] = useState(false);

  const product = productsData.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold">Product not found</h2>
      </div>
    );
  }

  return (
    <section className="bg-white p-6 space-y-6">
      {/* Back Button */}
      <Link href="/products" className="text-sm text-blue-500 hover:underline">
        ← Back to Products
      </Link>

      {/* Top Section */}
      <div className="flex justify-between flex-row gap-6 mt-10">
        {/* Product Image */}
        <div className="flex gap-10">
          <div className="relative w-40 h-40 rounded-xl overflow-hidden border">
            <Avatar className="h-40 w-40 rounded-2xl">
              <AvatarImage
                src={product.image}
                alt="product image"
                className="object-cover"
              />
            </Avatar>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <p className="text-sm text-muted-foreground">
                Product ID: {product.id}
              </p>
            </div>

            <div className="flex gap-6 mt-4">
              <div>
                <p className="text-xs text-muted-foreground">Price</p>
                <p className="font-semibold">{product.price}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Stock</p>
                <p className="font-semibold">{product.quantityInStock}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Sold</p>
                <p className="font-semibold">{product.totalSold}</p>
              </div>
            </div>
          </div>
        </div>
        <Button onClick={() => setOpenEditModal(true)}>Edit Product</Button>
      </div>

      {/* Status */}
      <div>
        <span className="text-sm text-muted-foreground">Status: </span>
        <span className="font-semibold capitalize">
          {product.stockStatus.replace("_", " ")}
        </span>
      </div>

      {/* Description */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Description</h2>
        <p className="text-sm text-muted-foreground">
          {product.description || "No description available"}
        </p>
      </div>

      {/* Vendor Info */}
      <div className="border rounded-xl p-4 flex items-center gap-4">
        <Avatar className="h-10 w-10">
          <AvatarFallback>{product.businessName.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <Link
            href={`/vendors/${product.businessId}`}
            className="font-medium hover:underline"
          >
            {product.businessName}
          </Link>
          <span className="text-xs text-muted-foreground">
            {product.ownerEmail}
          </span>
        </div>
      </div>
      <EditProductModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        product={product}
      />
    </section>
  );
};

export default ProductDetailsPage;
