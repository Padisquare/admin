import UserHeader from "@/components/user/users-header";
import UsersTable from "@/components/user/users-table";
export type UserRole = "admin" | "vendor" | "buyer"
export type UserStatus = "active" | "inactive"
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: UserRole
  status: UserStatus
  createdAt: string
}
const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Mariam Ahmed",
    email: "mariam@padisquare.com",
    role: "admin",
    status: "active",
    createdAt: "2023-01-01T10:00:00.000Z",
  },
  {
    id: "2",
    name: "Jason Roy",
    email: "jason@padisquare.com",
    role: "vendor",
    status: "active",
    createdAt: "2023-02-15T14:30:00.000Z",
  },
  {
    id: "3",
    name: "Linda Torres",
    email: "linda@padisquare.com",
    role: "buyer",
    status: "active",
    createdAt: "2023-03-20T09:15:00.000Z",
  },
  {
    id: "4",
    name: "Sarah O'Connor",
    email: "sarah@padisquare.com",
    role: "buyer",
    status: "inactive",
    createdAt: "2023-08-18T18:45:00.000Z",
  },
];
export default function UsersPage() {
  return (
    <div className="space-y-6 bg-white p-3 sm:p-6 rounded-lg ">
      <UserHeader />
      <UsersTable
        users={MOCK_USERS}
        loading={false}
      />
    </div>
  );
}