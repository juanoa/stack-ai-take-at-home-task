"use client";
import React, { useState } from "react";
import { Resource } from "@/modules/resources/domain/Resource";
import { Folder, ChevronDown, FolderClosed, File } from "lucide-react";
import { useDivideTextBySearch } from "@/hooks/useDivideTextBySearch";

interface Props {
  resource: Resource;
  search?: string;
}

export const ResourcesTreeRowName: React.FC<Props> = ({ resource, search }) => {
  const textParts = useDivideTextBySearch(resource.name, search ?? "");

  return (
    <span>
      {textParts[0]}
      <span className="bg-yellow-200">{textParts[1]}</span>
      {textParts[2]}
    </span>
  );
};
