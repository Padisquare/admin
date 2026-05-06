"use client";
import TemplateForm from "@/components/website-templates/web-template-form";
import { useWebsiteTemplates } from "@/hooks/useWebTemplates";

export default function CreateWebsiteTemplatePage() {
    const { createTemplate, isCreating } = useWebsiteTemplates();
    return (
        <div className="bg-white p-6 rounded-lg space-y-6 max-w-lg w-full place-self-center">
            <div>
                <h1 className="text-xl font-semibold">Create Website Template</h1>
                <p className="text-sm text-muted-foreground">
                    Create new website template
                </p>
            </div>
            <TemplateForm
                onSubmit={(data) => createTemplate(data)}
                isLoading={isCreating}
                buttonLabel="Create Template"
            />
        </div>
    )
}