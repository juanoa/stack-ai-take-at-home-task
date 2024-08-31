"use client";
import React, { useState } from "react";
import { Resource } from "@/modules/resources/domain/Resource";
import { ResourcesTreeRowIcon } from "@/components/resources-tree/ResourcesTreeRowIcon";
import { ResourcesTreeRowRemoveButton } from "@/components/resources-tree/ResourcesTreeRowRemoveButton";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  resource: Resource;
  level: number;
}

export const ResourcesTreeRow: React.FC<Props> = ({ resource, level }) => {
  const [isSubTreeOpen, setIsSubTreeOpen] = useState<boolean>(false);

  return (
    <div>
      <div
        className={`group/icons ${Resource.isDirectory(resource) && `cursor-pointer`} rounded px-6 py-3 transition-colors hover:bg-gray-50`}
        onClick={() => setIsSubTreeOpen(!isSubTreeOpen)}
      >
        <div
          className="flex items-center justify-between"
          style={{ marginLeft: `${level * 20}px` }}
        >
          <div className="flex items-center gap-4">
            <Checkbox className="opacity-0 transition-opacity group-hover/icons:opacity-100" />
            <ResourcesTreeRowIcon
              resource={resource}
              isSubTreeOpen={isSubTreeOpen}
            />
            {resource.name}
          </div>
          <ResourcesTreeRowRemoveButton resource={resource} />
        </div>
      </div>
      {Resource.isDirectory(resource) &&
        isSubTreeOpen &&
        resource.children.map((child) => (
          <ResourcesTreeRow key={child.id} resource={child} level={level + 1} />
        ))}
    </div>
  );
};
