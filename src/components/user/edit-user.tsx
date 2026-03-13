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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/app/(dashboard)/users/page";
import { Loader2 } from "lucide-react";
import CustomButton from "../common/custom-button";

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
                <SheetHeader>
                    <SheetTitle>Edit Profile</SheetTitle>
                    <SheetDescription>
                        Make changes to the user's profile here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>

                <form onSubmit={handleSave} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={user.name} className="col-span-3" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" defaultValue={user.email} className="col-span-3" />
                    </div>
                    <SheetFooter className="mt-6">
                        <Button type="submit" disabled={isLoading} className="bg-brand-main">
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save changes
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}