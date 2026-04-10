import { Users, KeyRound, LayoutGrid, FolderKanban } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SettingsHub() {
  return (
    <div className="space-y-5">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Settings Hub</h1>
        <p className="text-gray-500 mt-2 max-w-xl">
          Configure your administrative workspace. Manage your team, security,
          and catalog architecture from this central hub.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-[48px] md:col-span-2 shadow-sm bg-white p-6 flex flex-col justify-between hover:shadow-md transition">
          <div>
            <div className="flex flex-col gap-1 mb-4">
              <div className="p-3 bg-[#A4F1B2] rounded-full w-fit">
                <Image
                  src={"/users-icon.svg"}
                  alt="password icon"
                  width={20}
                  height={20}
                />
              </div>
              <h2 className="text-lg font-medium">Manage Admins</h2>
            </div>
            <p className="text-gray-500 text-sm">
              Establish hierarchy by controlling team access, assigning specific
              roles, and monitoring administrative activity logs.
            </p>
          </div>
          <div className="mt-6 ml-auto">
            <Link
              href={"/settings/manage-admins"}
              className="rounded-full   px-5 py-2 bg-green-600 text-white text-sm font-medium bg-linear-to-r from-[#006B2C] to-[#00873A] transition"
            >
              Configure Team →
            </Link>
          </div>
        </div>

        <div className="rounded-[48px]  shadow-sm bg-[#E4E9E6] p-6 flex flex-col justify-between hover:shadow-md transition">
          <div>
            <div className="flex flex-col gap-1 mb-4">
              <div className="p-3 bg-white rounded-full w-fit">
                <Image
                  src={"/lock-icon.svg"}
                  alt="password icon"
                  width={20}
                  height={20}
                />
              </div>
              <h2 className="text-lg font-medium">Update Password</h2>
            </div>
            <p className="text-gray-500 text-sm">
              Securely rotate your credentials to maintain account integrity and
              system defense.
            </p>
          </div>
          <Link
            href={"/settings/update-password"}
            className="text-green-600 text-left mt-6 text-sm font-medium hover:underline"
          >
            Security Settings →
          </Link>
        </div>
      </div>

      <Link
        href="/settings/categories"
        className="rounded-[45px] shadow-sm bg-white p-6 flex flex-col justify-between hover:shadow-md transition"
      >
        <div>
          <div className="flex flex-col gap-3 mb-4">
            <div className="p-3 bg-gray-100 rounded-full w-fit">
              <FolderKanban className="text-[#006B2C]" />
            </div>
            <h2 className="text-lg font-medium">Manage Categories</h2>
          </div>
          <p className="text-gray-500 text-sm mb-4">
            Organize your botanical catalog with custom names and complex
            nesting hierarchies for a seamless user experience.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 text-xs bg-gray-100 rounded-full">
              FERNS
            </span>
            <span className="px-3 py-1 text-xs bg-gray-100 rounded-full">
              SUCCULENTS
            </span>
            <span className="px-3 py-1 text-xs bg-gray-100 rounded-full">
              +12 MORE
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
