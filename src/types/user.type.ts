export type UserType = {
  _id: string;
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
  createdAt: string;
  updatedAt: string;
  verifiedEmailAt: string;
  avatarUrl?: string;
  followingCount: number;
  followerCount: number;
  isFollowing: boolean;
};

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

export type ChangeUserPasswordType = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
