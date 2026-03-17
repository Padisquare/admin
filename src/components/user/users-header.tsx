"use client"
import { Plus } from "lucide-react"
import CustomButton from "../common/custom-button"
import { Input } from "../ui/input"
import { useRouter } from "next/navigation"

const UserHeader = () => {
  const router = useRouter()
  return (
    <div className="flex items-center justify-between gap-5">
      <Input
        placeholder="Search users..."
        className="w-65"
      />
      <CustomButton
        type="button"
        leftIcon={<Plus className="h-4 w-4" />}
        label="Create User"
        onClick={() => router.push("/users/create")}
      />
    </div>
  )
}

export default UserHeader