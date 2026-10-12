import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ORDER_STATUS_LABELS, ORDER_STATUS_STYLES } from "@/lib/orders";
import { OrderStatus } from "@/types/order.type";

const OrderStatusBadge = ({ status }: { status: OrderStatus }) => (
  <Badge
    variant="outline"
    className={cn("border-transparent", ORDER_STATUS_STYLES[status])}
  >
    {ORDER_STATUS_LABELS[status] ?? status}
  </Badge>
);

export default OrderStatusBadge;
