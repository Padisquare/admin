import UserHeader from "@/components/user/users-header";
import UsersTable from "@/components/user/users-table";
export type UserRole = "admin" | "vendor" | "buyer"
export type UserStatus = "active" | "inactive"
export interface User {
  id: string
  firstname: string
  lastname: string
  username: string
  email: string
  avatar?: string
  status: UserStatus
  createdAt: string
}
export const MOCK_USERS: User[] = [
  {
    id: "1",
    firstname: "Mariam",
    lastname: "Ahmed",
    username: "mariam_a",
    email: "mariam@padisquare.com",
    status: "active",
    createdAt: "2023-01-01T10:00:00.000Z",
  },
  {
    id: "2",
    firstname: "Jason",
    lastname: "Roy",
    username: "jroy_vendor",
    email: "jason@padisquare.com",
    status: "active",
    createdAt: "2023-02-15T14:30:00.000Z",
  },
  {
    id: "3",
    firstname: "Linda",
    lastname: "Torres",
    username: "ltorres",
    email: "linda@padisquare.com",
    status: "active",
    createdAt: "2023-03-20T09:15:00.000Z",
  },
  {
    id: "4",
    firstname: "Sarah",
    lastname: "O'Connor",
    username: "sarah_oc",
    email: "sarah@padisquare.com",
    status: "inactive",
    createdAt: "2023-08-18T18:45:00.000Z",
  },
];
export default function UsersPage() {
  return (
    <div className="space-y-6 bg-white p-3 sm:p-6 rounded-lg">
      <UserHeader />
      <UsersTable
        users={MOCK_USERS}
        loading={false}
      />
    </div>
  );
}