"use client";
import TemplateForm from "./web-template-form";
import { useWebsiteTemplates } from "@/hooks/useWebTemplates";
import CustomLoader from "../common/custom-loader";

export default function EditWebsiteTemplateClient({ websiteId }: { websiteId: string }) {
  const { template, isFetchingSingle, editTemplate, isUpdating } = useWebsiteTemplates(websiteId);

  if (isFetchingSingle) {
    return <CustomLoader />;
  }

  return (
    <div className="bg-white p-6 rounded-lg space-y-6 max-w-lg w-full place-self-center">
      <div>
        <h1 className="text-xl font-semibold">Edit Website Template</h1>
        <p className="text-sm text-muted-foreground"> Update template information </p>
      </div>
      <TemplateForm initialData={template}
        onSubmit={(data) => editTemplate({ id: websiteId, data })}
        isLoading={isUpdating}
        buttonLabel="Update Template" />
    </div>
  );
}