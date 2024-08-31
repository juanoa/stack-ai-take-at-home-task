"use client";
import React, { useState } from "react";
import { Resource } from "@/modules/resources/domain/Resource";
import { Folder, ChevronDown, FolderClosed, File } from "lucide-react";

interface Props {
  resource: Resource;
  isSubTreeOpen: boolean;
}

export const ResourcesTreeRowIcon: React.FC<Props> = ({
  resource,
  isSubTreeOpen,
}) => {
  if (Resource.isDirectory(resource)) {
    return (
      <>
        {isSubTreeOpen ? (
          <FolderClosed size={18} className="group-hover/icons:hidden" />
        ) : (
          <Folder size={18} className="group-hover/icons:hidden" />
        )}
        <ChevronDown
          size={18}
          className={`hidden transition-transform ${isSubTreeOpen && `-rotate-180`} transform cursor-pointer group-hover/icons:block`}
        />
      </>
    );
  }

  return <File size={18} />;
};
