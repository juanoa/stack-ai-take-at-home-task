import { KnowledgeBase } from "@/modules/knowledge-bases/domain/KnowledgeBase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { KnowledgeBaseStatusResource } from "@/components/knowledge-bases/KnowledgeBaseStatusResource";
import { KnowledgeBaseResource } from "@/modules/knowledge-bases/domain/KnowledgeBaseResource";

interface Props {
  knowledgeBase?: KnowledgeBase;
}
export const KnowledgeBaseStatusModal: React.FC<Props> = ({ knowledgeBase }) => {
  if (!knowledgeBase) {
    return null;
  }

  const resourcesSortedById = knowledgeBase.resources.sort(KnowledgeBaseResource.sortById);

  return (
    <Card className="fixed bottom-10 left-10 w-[500px] shadow-lg">
      <CardHeader>
        <CardTitle>Indexing files</CardTitle>
        <CardDescription>Indexing status in knowledge base</CardDescription>
      </CardHeader>
      <CardContent>
        {resourcesSortedById.map((resource) => (
          <KnowledgeBaseStatusResource knowledgeBaseResource={resource} key={resource.id} />
        ))}
      </CardContent>
    </Card>
  );
};
