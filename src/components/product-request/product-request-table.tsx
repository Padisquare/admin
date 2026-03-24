"use client";
import { CustomTable } from "@/components/common/custom-table";
import { ProductRequest } from "@/app/(dashboard)/product-requests/page";
import { requestColumns } from "./product-request-column";
interface Props {
    productRequests: ProductRequest[];
    loading?: boolean;
}
const ProductRequestTable = ({ productRequests, loading }: Props) => {
    return (
        <CustomTable
            data={productRequests}
            columns={requestColumns}
            loading={loading}
            emptyState={{
                title: "No Product Request Found",
                message: "There are currently no Product Request on the platform.",
            }}
        />
    );
}
export default ProductRequestTable