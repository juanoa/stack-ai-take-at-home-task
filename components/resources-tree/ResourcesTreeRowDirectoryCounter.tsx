"use client";
import React, { useMemo, useState } from "react";
import { Resource, ResourceDirectory } from "@/modules/resources/domain/Resource";
import { ResourcesTreeRowIcon } from "@/components/resources-tree/ResourcesTreeRowIcon";
import { ResourcesTreeRowRemoveButton } from "@/components/resources-tree/ResourcesTreeRowRemoveButton";
import { Checkbox } from "@/components/ui/checkbox";
import { useResourcesTreeSelectableContext } from "@/components/resources-tree/contexts/ResourceTreeSelectableContext";
import { Separator } from "@/components/ui/separator";

interface Props {
  resource: ResourceDirectory;
}

export const ResourcesTreeDirectoryCounter: React.FC<Props> = ({ resource }) => {
  const subFiles = useMemo(() => Resource.getAllSubFiles(resource), [resource]);
  return (
    <span className="mt-0.5 text-xs text-gray-500">
      {subFiles.length} {subFiles.length === 1 ? "file" : "files"}
    </span>
  );
};
