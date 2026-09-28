export type UserType = {
  _id: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phoneNumber: string;
  bio: string;
  whatsappNumber: string;
  state: string;
  lga: string;
  verified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  verifiedEmailAt: string;
  avatarUrl?: string;
  followingCount: number;
  followerCount: number;
  isFollowing: boolean;
  verificationStatus?: string;
  diditSessionId?: string;
};

export type RecheckVerificationResult = {
  userId: string;
  previousStatus?: string;
  verificationStatus?: string;
  verified?: boolean;
};

export type CreateUserType = Pick<
  UserType,
  "firstName" | "lastName" | "email" | "username" | "phoneNumber"
>;
export type UpdateUserType = Pick<
  UserType,
  | "firstName"
  | "lastName"
  | "username"
  | "phoneNumber"
  | "email"
  | "bio"
  | "whatsappNumber"
  | "state"
  | "lga"
>;

export interface ApiResponse<T> {
  title: string;
  message: string;
  entity: T;
}
export interface DeleteEntity {
  deleted: boolean;
}
export type UserResponse = ApiResponse<UserType>;
export type DeleteUserResponse = ApiResponse<DeleteEntity>;
export type RecheckVerificationResponse = ApiResponse<RecheckVerificationResult>;

export type ChangeUserPasswordType = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
