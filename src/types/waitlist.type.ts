export type WaitlistRole = "vendor" | "buyer";

export type Waitlist = {
  _id: string;
  id: string;
  fullname: string;
  whatsapp_number: string;
  email: string;
  role: WaitlistRole;
  createdAt: string;
  updatedAt: string;
};

export type WaitlistApiResponse = {
  title: string;
  message: string;
  entity: {
    data: Waitlist[];
    page: number;
    totalPages: number;
    total: number;
    limit: number;
  };
};
export type WaitlistFilters = {
  search?: string;
  whatsapp_number?: string;
  role?: WaitlistRole;
  email?: string;
  page?: number;
  limit?: number;
};
export type WaitlistStats = {
  title: string;
  message: string;
  entity: {
    user: {
      "24h": number;
      "7d": number;
    };
    vendors: {
      "24h": number;
      "7d": number;
    };
    buyers: {
      "24h": number;
      "7d": number;
    };
  };
};
