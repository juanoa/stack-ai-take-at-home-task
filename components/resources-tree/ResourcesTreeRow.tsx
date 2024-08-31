"use client";
import React, { useState } from "react";
import { Resource } from "@/modules/resources/domain/Resource";
import { Folder, File, ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  resource: Resource;
  level: number;
}

export const ResourcesTreeRow: React.FC<Props> = ({ resource, level }) => {
  const [isSubTreeOpen, setIsSubTreeOpen] = useState<boolean>(false);

  return (
    <>
      <div
        className={`group/icons ${Resource.isDirectory(resource) && `cursor-pointer`} rounded px-6 py-3 hover:bg-gray-50`}
        onClick={() => setIsSubTreeOpen(!isSubTreeOpen)}
      >
        <div
          className="flex items-center gap-4"
          style={{ marginLeft: `${level * 20}px` }}
        >
          {Resource.isDirectory(resource) ? (
            <>
              <Folder size={18} className="group-hover/icons:hidden" />
              {isSubTreeOpen ? (
                <ChevronUp
                  size={18}
                  className="hidden cursor-pointer group-hover/icons:block"
                />
              ) : (
                <ChevronDown
                  size={18}
                  className="hidden cursor-pointer group-hover/icons:block"
                  onClick={() => setIsSubTreeOpen(true)}
                />
              )}
            </>
          ) : (
            <File size={18} />
          )}
          {resource.name}
        </div>
      </div>
      {Resource.isDirectory(resource) &&
        isSubTreeOpen &&
        resource.children.map((child) => (
          <ResourcesTreeRow key={child.id} resource={child} level={level + 1} />
        ))}
    </>
  );
};
