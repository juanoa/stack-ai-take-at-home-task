import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const ResourcesTreeSearcher: React.FC<Props> = ({ value, onChange }) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex flex-row items-center gap-3">
      <Search width={20} className="text-gray-500" />
      <Input
        className="w-[250px]"
        placeholder="Search resources"
        value={value}
        onChange={handleOnChange}
      />
    </div>
  );
};
