"use client";

import { useState } from "react";
import { Lock, KeyRound, ShieldCheck, CircleCheck } from "lucide-react";

const passwordRequirements = [
  "At least 12 characters long",
  "Include at least one uppercase letter (A-Z)",
  "Include at least one number (0-9)",
  "Include one special character (!, @, #, $)",
];

export default function UpdatePasswordForm() {
  const [form, setForm] = useState({
    current: "",
    password: "",
    confirm: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-8 bg-[#f4f7f5]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
          <div className="space-y-5">
            <div>
              <label className="text-xs text-gray-500 font-medium">
                CURRENT PASSWORD
              </label>
              <div className="mt-2 flex items-center bg-gray-100 rounded-full px-4 py-3">
                <Lock className="w-4 h-4 text-gray-500 mr-2" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="bg-transparent outline-none w-full text-sm"
                  value={form.current}
                  onChange={(e) => handleChange("current", e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-500 font-medium">
                NEW PASSWORD
              </label>
              <div className="mt-2 flex items-center bg-gray-100 rounded-full px-4 py-3">
                <KeyRound className="w-4 h-4 text-gray-500 mr-2" />
                <input
                  type="password"
                  placeholder="Min. 12 characters"
                  className="bg-transparent outline-none w-full text-sm"
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-500 font-medium">
                CONFIRM NEW PASSWORD
              </label>
              <div className="mt-2 flex items-center bg-gray-100 rounded-full px-4 py-3">
                <ShieldCheck className="w-4 h-4 text-gray-500 mr-2" />
                <input
                  type="password"
                  placeholder="Re-type new password"
                  className="bg-transparent outline-none w-full text-sm"
                  value={form.confirm}
                  onChange={(e) => handleChange("confirm", e.target.value)}
                />
              </div>
            </div>

            <div className="pt-4">
              <button className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-full text-sm font-medium shadow-md transition">
                Save Changes
              </button>

              <button className="w-full mt-3 text-sm text-gray-500 hover:underline">
                Cancel
              </button>
            </div>
          </div>
        </div>

        <div className="bg-[#eef3ef] rounded-2xl p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-green-900 mb-4">
            Password Requirements
          </h2>

          <ul className="space-y-3 text-sm text-gray-600">
            {passwordRequirements.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <CircleCheck color="#006B2C" size={16} className="shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
