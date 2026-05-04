import { notFound } from "next/navigation"
import ProductRequestForm from "@/components/product-request/product-request-form"
import { fetchProductRequest } from "@/services/product-request.service"
import { ProductRequest } from "@/types/product-request.type"

type SingleProductRequestResponse = { entity?: ProductRequest }

export default async function EditRequestPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    let request: ProductRequest | undefined
    try {
        const data = (await fetchProductRequest(id)) as SingleProductRequestResponse
        request = data?.entity
    } catch {
        return notFound()
    }
    if (!request) return notFound()

    return (
        <div className="bg-white p-6 rounded-lg space-y-6 max-w-lg w-full place-self-center border shadow-sm">
            <div>
                <h1 className="text-xl font-semibold">Edit Product Request</h1>
                <p className="text-sm text-muted-foreground">
                    Moderating Request:{" "}
                    <span className="font-mono text-blue-600">{request._id}</span>
                </p>
            </div>

            <ProductRequestForm requestId={request._id} defaultValues={request} />
        </div>
    )
}