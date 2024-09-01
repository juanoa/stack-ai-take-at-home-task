import { Button } from "@/components/ui/button";
import React, { useMemo } from "react";
import { Rocket } from "lucide-react";
import { useResourcesTreeSelectableContext } from "@/components/resources-tree/contexts/ResourceTreeSelectableContext";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const IndexButton: React.FC<Props> = ({ ...rest }) => {
  const { selectedFiles } = useResourcesTreeSelectableContext();

  const noFilesSelected = useMemo(() => selectedFiles.length === 0, [selectedFiles]);

  return (
    <Button
      className={`fixed bottom-10 right-10 transition-opacity ${noFilesSelected ? "opacity-0" : "opacity-100"}`}
      {...rest}
    >
      <Rocket className="mr-2 h-4 w-4" /> Index {selectedFiles.length}{" "}
      {selectedFiles.length > 1 ? "files" : "file"}
    </Button>
  );
};
