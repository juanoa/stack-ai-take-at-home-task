import { Button } from "@/components/ui/button";
import React, { useCallback, useMemo } from "react";
import { LoaderCircle, Rocket } from "lucide-react";
import { useResourcesTreeSelectableContext } from "@/components/resources-tree/contexts/ResourceTreeSelectableContext";
import { useKnowledgeBaseContext } from "@/components/knowledge-bases/KnowledgeBaseContext";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const IndexButton: React.FC<Props> = ({ ...rest }) => {
  const { selectedFiles, clearSelection } = useResourcesTreeSelectableContext();
  const { indexResources, isPendingCreateKnowledgeBase } = useKnowledgeBaseContext();

  const noFilesSelected = useMemo(() => selectedFiles.length === 0, [selectedFiles]);

  const handleOnClick = useCallback(() => {
    indexResources(selectedFiles).then(clearSelection);
  }, [indexResources, selectedFiles, clearSelection]);

  return (
    <Button
      className={`fixed bottom-10 right-10 transition-opacity ${noFilesSelected ? "opacity-0" : "opacity-100"}`}
      onClick={handleOnClick}
      disabled={isPendingCreateKnowledgeBase}
      {...rest}
    >
      {isPendingCreateKnowledgeBase ? (
        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Rocket className="mr-2 h-4 w-4" />
      )}
      Index {selectedFiles.length} {selectedFiles.length === 1 ? "file" : "files"}
    </Button>
  );
};
