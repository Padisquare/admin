import ProductRequestHeader from "@/components/product-request/product-request-header";
import ProductRequestTable from "@/components/product-request/product-request-table";
import { UserType } from "@/types/user.type";

export type RequestStatus = "pending" | "in-progress" | "fulfilled" | "canceled";
export type ItemCondition = "brand-new" | "like-new" | "used";

export interface ProductRequest {
  id: string;
  userId: string;
  description: string;
  category: string;
  condition: ItemCondition;
  state: string;
  lga: string;
  image: string;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
  user?: UserType;
}
export const MOCK_REQUESTS: ProductRequest[] = [
  {
    id: "PRQ-9901",
    userId: "3",
    description: "iPhone 15 Pro Max, 256GB, Natural Titanium",
    category: "Electronics",
    condition: "brand-new",
    state: "Lagos",
    lga: "Ikeja",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&q=80",
    status: "pending",
    createdAt: "2026-03-10T14:00:00Z",
    updatedAt: "2026-03-10T14:00:00Z",
  },
  {
    id: "PRQ-9902",
    userId: "2",
    description: "Industrial Sewing Machine (Overlock model)",
    category: "Machinery",
    condition: "used",
    state: "Kano",
    lga: "Fagge",
    image: "https://images.unsplash.com/photo-1544033527-b192daee1f5b?w=400&q=80",
    status: "in-progress",
    createdAt: "2026-03-11T09:30:00Z",
    updatedAt: "2026-03-12T10:15:00Z",
  },
  {
    id: "PRQ-9903",
    userId: "4",
    description: "MacBook Air M2 13-inch, Space Gray",
    category: "Electronics",
    condition: "like-new",
    state: "FCT",
    lga: "Abuja Municipal",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80",
    status: "fulfilled",
    createdAt: "2026-03-05T16:45:00Z",
    updatedAt: "2026-03-08T11:20:00Z",
  },
  {
    id: "PRQ-9904",
    userId: "1",
    description: "Solar Inverter System 5KVA",
    category: "Power",
    condition: "brand-new",
    state: "Oyo",
    lga: "Ibadan North",
    image: "https://images.unsplash.com/photo-1624397640148-949b1732bb0a?w=400&q=80",
    status: "pending",
    createdAt: "2026-03-12T08:20:00Z",
    updatedAt: "2026-03-12T08:20:00Z",
  }
];
const ProductRequestsHomepage = () => {
  return (
    <div className="space-y-6 bg-white p-3 sm:p-6 rounded-lg">
      <ProductRequestHeader />
      <ProductRequestTable
        productRequests={MOCK_REQUESTS}
        loading={false} />
    </div>
  )
}
export default ProductRequestsHomepage