"use client";

import CustomButton from "@/components/common/custom-button";
import CustomLoader from "@/components/common/custom-loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDeleteProductById, useGetProductById } from "@/hooks/use-product";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

const ProductDetailsPage = () => {
  const params = useParams();
  const productId = params.productId as string;
  const router = useRouter();
  const queryClient = useQueryClient();
  // const [openEditModal, setOpenEditModal] = useState(false);
  const { mutate: deleteProduct, isPending: isDeleting } =
    useDeleteProductById();

  const { data, isPending } = useGetProductById({
    productId,
  });

  if (!data || isPending) {
    return <CustomLoader />;
  }

  const product = data.entity;

  if (!product) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold">Product not found</h2>
      </div>
    );
  }

  const handleDeleteProduct = (id: string) => {
    deleteProduct(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        toast.success("Product deleted successfully.");
        router.push("/products");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };
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
                src={product.packshots[0]}
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
                Product ID: {product._id}
              </p>
            </div>

            <div className="flex gap-6 mt-4">
              <div>
                <p className="text-xs text-muted-foreground">Price</p>
                <p className="font-semibold">{product.unitPrice}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Condition</p>
                <p className="font-semibold">
                  {product.closedAt === null ? "Active" : "Inactive"}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Total Like</p>
                <p className="font-semibold">{product.likeCount}</p>
              </div>
            </div>
          </div>
        </div>
        {/* <Button onClick={() => setOpenEditModal(true)}>Edit Product</Button> */}
        <CustomButton
          disabled={isDeleting}
          variant={"red"}
          type="button"
          label="Delete product"
          onClick={() => handleDeleteProduct(product._id)}
        />
      </div>

      {/* Status */}
      <div>
        <span className="text-sm text-muted-foreground">Status: </span>
        <span className="font-semibold capitalize">
          {/* {product.} */}
          status
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
          <AvatarFallback>{product.seller.firstName.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <Link
            href={`/vendors/${product.seller._id}`}
            className="font-medium hover:underline"
          >
            {product.seller.username}
          </Link>
          <span className="text-xs text-muted-foreground">
            {product.seller.email}
          </span>
        </div>
      </div>
      {/* <EditProductModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        product={product}
      /> */}
    </section>
  );
};

export default ProductDetailsPage;
