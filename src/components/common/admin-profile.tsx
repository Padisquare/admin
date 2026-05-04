"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthContext } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";

export default function AdminProfile() {
  const { resetToken } = useAuthContext();

  const handleLogout = () => {
    resetToken?.();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center justify-center gap-2 cursor-pointer">
          <Avatar className="h-12 w-12">
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span className="font-medium">Administrator</span>
            <span className="text-sm text-muted-foreground">Signed in</span>
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
