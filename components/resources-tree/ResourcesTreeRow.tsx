import React from "react";
import { Resource } from "@/modules/resources/domain/Resource";
import { Folder, File } from "lucide-react";

interface Props {
  resource: Resource;
}

export const ResourcesTreeRow: React.FC<Props> = ({ resource }) => {
  return (
    <div className="rounded px-6 py-3 hover:bg-gray-50">
      <div className="flex items-center gap-4">
        {Resource.isDirectory(resource) ? (
          <Folder size={18} />
        ) : (
          <File size={18} />
        )}
        {resource.name}
      </div>
    </div>
  );
};
