"use client";
import { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from "@/components/ui/sheet";
import { User } from "@/app/(dashboard)/users/page";
import CustomButton from "../common/custom-button";
import CustomInput from "../common/custom-input";

interface EditUserSheetProps {
    user: User;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function EditUserSheet({ user, open, onOpenChange }: EditUserSheetProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Updated User:", user.id);
        setIsLoading(false);
        onOpenChange(false);
    };
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-106 p-6">
                <SheetHeader className="mb-6">
                    <SheetTitle className="text-2xl font-bold">Edit Profile</SheetTitle>
                    <SheetDescription>
                        Make changes to the user's profile here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <form onSubmit={handleSave} className="flex flex-col gap-5">
                    <CustomInput
                        label="Full Name"
                        name="name"
                        type="text"
                        placeholder="Enter full name"
                        defaultValue={user.name}
                        required
                    />
                    <CustomInput
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="Enter email address"
                        defaultValue={user.email}
                        required
                    />
                    <SheetFooter className="mt-4">
                        <CustomButton
                            type="submit"
                            label="Save Changes"
                            isLoading={isLoading}
                            className="w-full"
                            variant="primary"
                        />
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}