export interface TimeSeriesStats {
  total?: number;
  newLast24Hours: number;
  newLast7Days: number;
  newLast30Days?: number;
}

export interface AnalyticsData {
  generatedAt: string;
  users: TimeSeriesStats;
  products: TimeSeriesStats & {
    activeListings: number;
    closedListings: number;
  };
  productCategories: {
    total: number;
  };
  productRequests: TimeSeriesStats & {
    open: number;
    closed: number;
  };
  reels: TimeSeriesStats;
  websites: {
    total: number;
  };
  websiteTemplates: {
    total: number;
  };
  waitlist: Omit<TimeSeriesStats, "newLast30Days">;
  engagement: {
    likes: number;
    comments: number;
    reposts: number;
  };
  social: {
    follows: number;
  };
  stories: {
    total: number;
  };
  contactMessages: {
    total: number;
  };
  productRatings: {
    total: number;
  };
  messaging: {
    conversations: number;
    messages: number;
  };
  admins: {
    total: number;
  };
  marketplace: {
    estimatedActiveListingsValue: number;
  };
}

export interface AnalyticsResponse {
  title: string;
  message: string;
  entity: AnalyticsData;
}
