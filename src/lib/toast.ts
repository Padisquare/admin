import { toast } from "sonner";

type ToastType = "success" | "info" | "warning" | "error" | "message";

interface ToastOptions {
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const toastColors: Record<ToastType, string> = {
  success: "#159C47",
  info: "#3B82F6",
  warning: "#FACC15",
  error: "#EF4444",
  message: "#6B7280",
};

export function showToast(
  type: ToastType,
  message: string,
  options?: ToastOptions
) {
  const color = toastColors[type];

  toast[type === "message" ? "message" : type](message, {
    description: options?.description,
    style: {
      backgroundColor: color,
      color: type === "warning" ? "black" : "white",
      border: `1px solid ${color}`,
    },
    action: options?.actionLabel
      ? {
          label: options.actionLabel,
          onClick: options.onAction ?? (() => {}),
        }
      : undefined,
  });
}
