"use client";

import Link from "next/link";
import { useWebsiteTemplates } from "@/hooks/useWebTemplates";
import CustomLoader from "@/components/common/custom-loader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatOnlyDate } from "@/utils/formatDate";

export default function WebsiteTemplateDetailClient({
  websiteId,
}: {
  websiteId: string;
}) {
  const { template, isFetchingSingle, error } = useWebsiteTemplates(websiteId);

  if (isFetchingSingle) {
    return <CustomLoader />;
  }

  if (error || !template) {
    return (
      <div className="p-6 space-y-4">
        <p className="text-muted-foreground">This template could not be loaded.</p>
        <Button asChild variant="outline">
          <Link href="/website-templates">Back to templates</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <div className="flex flex-wrap justify-between items-start gap-4">
        <h1 className="text-2xl font-semibold">{template.name}</h1>
        <Button asChild>
          <Link href={`/website-templates/${websiteId}/edit`}>Edit template</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4 p-6 border rounded-2xl bg-white">
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-32 rounded-md border">
              <AvatarImage
                src={template.image}
                alt={template.name}
                className="object-cover"
              />
              <AvatarFallback className="rounded-md">
                {template.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2 min-w-0">
              <p className="text-lg font-medium">{template.name}</p>
              <p className="text-muted-foreground text-sm">{template.description}</p>
              <div className="flex flex-wrap gap-2 pt-1">
                <Badge variant={template.isActive ? "default" : "secondary"}>
                  {template.isActive ? "Active" : "Inactive"}
                </Badge>
                {template.slug ? (
                  <Badge variant="outline" className="font-mono text-xs">
                    {template.slug}
                  </Badge>
                ) : null}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t text-sm">
            <div>
              <p className="text-muted-foreground">Created</p>
              <p className="font-medium">{formatOnlyDate(template.createdAt)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Updated</p>
              <p className="font-medium">{formatOnlyDate(template.updatedAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
