"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Resource } from "@/modules/resources/domain/Resource";
import { ResourcesTreeRowIcon } from "@/components/resources-tree/ResourcesTreeRowIcon";
import { ResourcesTreeRowRemoveButton } from "@/components/resources-tree/ResourcesTreeRowRemoveButton";
import { Checkbox } from "@/components/ui/checkbox";
import { useResourcesTreeSelectableContext } from "@/components/resources-tree/contexts/ResourceTreeSelectableContext";
import { Separator } from "@/components/ui/separator";
import { ResourcesTreeDirectoryCounter } from "@/components/resources-tree/ResourcesTreeRowDirectoryCounter";
import { ResourcesTreeRowIndexingStatusBadge } from "@/components/resources-tree/ResourcesTreeRowIndexingStatusBadge";
import { ResourcesTreeRowName } from "@/components/resources-tree/contexts/ResourcesTreeRowName";

interface Props {
  resource: Resource;
  search?: string;
  level: number;
}

export const ResourcesTreeRow: React.FC<Props> = ({ resource, level, search }) => {
  const [isSubTreeOpen, setIsSubTreeOpen] = useState<boolean>(false);

  const { onToggleResource, isResourceSelected } = useResourcesTreeSelectableContext();

  const handleOnToggleCheckbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleResource(resource);
  };

  useEffect(() => {
    setIsSubTreeOpen(!!search);
  }, [search]);

  const isSelected = useMemo(() => isResourceSelected(resource), [isResourceSelected, resource]);

  return (
    <div>
      <div
        className={`group/icons ${Resource.isDirectory(resource) && `cursor-pointer`} rounded px-6 py-3 transition-colors hover:bg-gray-50`}
        onClick={() => setIsSubTreeOpen(!isSubTreeOpen)}
      >
        <div
          className="flex items-center justify-between"
          style={{ marginLeft: `${level * 30}px` }}
        >
          <div className="flex items-center gap-4">
            <Checkbox
              className={`${isSelected ? "opacity-100" : "opacity-0"} transition-opacity group-hover/icons:opacity-100`}
              onClick={handleOnToggleCheckbox}
              checked={isSelected}
            />
            <ResourcesTreeRowIcon resource={resource} isSubTreeOpen={isSubTreeOpen} />
            <ResourcesTreeRowName resource={resource} search={search} />
            {Resource.isDirectory(resource) && (
              <ResourcesTreeDirectoryCounter resource={resource} />
            )}
          </div>
          <div className="flex flex-row items-center gap-6">
            <ResourcesTreeRowIndexingStatusBadge resource={resource} />
            <ResourcesTreeRowRemoveButton resource={resource} />
          </div>
        </div>
      </div>
      <Separator />
      {Resource.isDirectory(resource) &&
        isSubTreeOpen &&
        resource.children.map((child) => (
          <ResourcesTreeRow key={child.id} resource={child} level={level + 1} search={search} />
        ))}
    </div>
  );
};
