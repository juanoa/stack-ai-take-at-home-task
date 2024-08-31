"use client";
import React from "react";
import { Resource } from "@/modules/resources/domain/Resource";
import { Folder, File } from "lucide-react";

interface Props {
  resource: Resource;
  level: number;
}

export const ResourcesTreeRow: React.FC<Props> = ({ resource, level }) => {
  const marginLeft = `${level * 20}px`;

  return (
    <>
      <div className={`rounded px-6 py-3 hover:bg-gray-50 ml-[${marginLeft}]`}>
        <div className="flex items-center gap-4">
          {Resource.isDirectory(resource) ? (
            <Folder size={18} />
          ) : (
            <File size={18} />
          )}
          {resource.name}
        </div>
      </div>
      {Resource.isDirectory(resource) &&
        resource.children.map((child) => (
          <ResourcesTreeRow key={child.id} resource={child} level={level + 1} />
        ))}
    </>
  );
};
