import { notFound } from "next/navigation"
import { MOCK_REQUESTS } from "../../page";
import ProductRequestForm from "@/components/product-request/product-request-form";

export default async function EditRequestPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const request = MOCK_REQUESTS.find((u) => u.id === id)
    if (!request) return notFound()

    return (
        <div className="bg-white p-6 rounded-lg space-y-6 max-w-lg w-full place-self-center border shadow-sm">
            <div>
                <h1 className="text-xl font-semibold">Edit Product Request</h1>
                <p className="text-sm text-muted-foreground">
                    Moderating Request: <span className="font-mono text-blue-600">{request.id}</span>
                </p>
            </div>

            <ProductRequestForm
                defaultValues={request}
            />
        </div>
    )
}