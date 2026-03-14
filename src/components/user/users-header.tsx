import { Input } from "../ui/input"
import CreateUserDialog from "./create-user-dialog"

const UserHeader = () => {
  return (
    <div className="flex items-center justify-between gap-5">
      <Input
        placeholder="Search users..."
        className="w-65"
      />
      <CreateUserDialog />
    </div>
  )
}

export default UserHeader