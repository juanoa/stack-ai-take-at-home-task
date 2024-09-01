import { KnowledgeBase } from "@/modules/knowledge-bases/domain/KnowledgeBase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { KnowledgeBaseStatusResource } from "@/components/knowledge-bases/KnowledgeBaseStatusResource";
import { KnowledgeBaseResource } from "@/modules/knowledge-bases/domain/KnowledgeBaseResource";
import { X } from "lucide-react";

interface Props {
  knowledgeBase?: KnowledgeBase;
}
export const KnowledgeBaseStatusModal: React.FC<Props> = ({ knowledgeBase }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (knowledgeBase) {
      setIsVisible(true);
    }
  }, [knowledgeBase]);

  if (!isVisible || !knowledgeBase) {
    return null;
  }

  const resourcesSortedById = knowledgeBase.resources.sort(KnowledgeBaseResource.sortById);

  return (
    <Card className="fixed bottom-10 left-10 w-[500px] shadow-lg">
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Indexing files</CardTitle>
          <CardDescription>Indexing status in knowledge base</CardDescription>
        </div>
        <X
          onClick={() => setIsVisible(false)}
          className="cursor-pointer text-gray-600 hover:text-gray-900"
        />
      </CardHeader>
      <CardContent>
        {resourcesSortedById.map((resource) => (
          <KnowledgeBaseStatusResource knowledgeBaseResource={resource} key={resource.id} />
        ))}
      </CardContent>
    </Card>
  );
};
