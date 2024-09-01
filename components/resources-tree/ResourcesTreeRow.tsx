"use client";
import React, { useMemo, useState } from "react";
import { Resource } from "@/modules/resources/domain/Resource";
import { ResourcesTreeRowIcon } from "@/components/resources-tree/ResourcesTreeRowIcon";
import { ResourcesTreeRowRemoveButton } from "@/components/resources-tree/ResourcesTreeRowRemoveButton";
import { Checkbox } from "@/components/ui/checkbox";
import { useResourcesTreeSelectableContext } from "@/components/resources-tree/contexts/ResourceTreeSelectableContext";
import { Separator } from "@/components/ui/separator";

interface Props {
  resource: Resource;
  level: number;
}

export const ResourcesTreeRow: React.FC<Props> = ({ resource, level }) => {
  const [isSubTreeOpen, setIsSubTreeOpen] = useState<boolean>(false);

  const { onToggleResource, isResourceSelected } = useResourcesTreeSelectableContext();

  const handleOnToggleCheckbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleResource(resource);
  };

  const isSelected = useMemo(() => isResourceSelected(resource), [isResourceSelected, resource]);

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
            <Checkbox
              className={`${isSelected ? "opacity-100" : "opacity-0"} transition-opacity group-hover/icons:opacity-100`}
              onClick={handleOnToggleCheckbox}
              checked={isSelected}
            />
            <ResourcesTreeRowIcon resource={resource} isSubTreeOpen={isSubTreeOpen} />
            {resource.name}
          </div>
          <ResourcesTreeRowRemoveButton resource={resource} />
        </div>
      </div>
      <Separator />
      {Resource.isDirectory(resource) &&
        isSubTreeOpen &&
        resource.children.map((child) => (
          <ResourcesTreeRow key={child.id} resource={child} level={level + 1} />
        ))}
    </div>
  );
};
