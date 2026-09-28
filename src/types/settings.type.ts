export interface ApiResponse<T> {
  title: string;
  message: string;
  entity: T;
}

export type EscrowSettingsType = {
  _id: string;
  escrowPercentage: number;
  escrowPercentageUpdatedBy?: string;
  createdAt: string;
  updatedAt: string;
};

export type EscrowSettingsResponse = ApiResponse<EscrowSettingsType>;
