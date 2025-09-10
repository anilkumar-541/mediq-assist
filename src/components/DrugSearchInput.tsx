import { useState } from "react";
import { Search, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DrugSearchInputProps {
  selectedDrugs: string[];
  onDrugAdd: (drug: string) => void;
  onDrugRemove: (drug: string) => void;
}

const COMMON_DRUGS = [
  "Aspirin", "Ibuprofen", "Acetaminophen", "Warfarin", "Metformin",
  "Lisinopril", "Simvastatin", "Omeprazole", "Amlodipine", "Metoprolol"
];

export function DrugSearchInput({ selectedDrugs, onDrugAdd, onDrugRemove }: DrugSearchInputProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const handleInputChange = (value: string) => {
    setSearchTerm(value);
    if (value.length > 1) {
      const filtered = COMMON_DRUGS.filter(drug =>
        drug.toLowerCase().includes(value.toLowerCase()) &&
        !selectedDrugs.includes(drug)
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleAddDrug = (drug: string) => {
    if (!selectedDrugs.includes(drug)) {
      onDrugAdd(drug);
      setSearchTerm("");
      setFilteredSuggestions([]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      handleAddDrug(searchTerm.trim());
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-medical-primary h-4 w-4" />
        <Input
          placeholder="Search for medications..."
          value={searchTerm}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyPress={handleKeyPress}
          className="pl-10 bg-white border-medical-primary/20 focus:border-medical-primary focus:ring-medical-primary/20"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleAddDrug(searchTerm)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-medical-primary hover:bg-medical-primary/10"
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </div>

      {filteredSuggestions.length > 0 && (
        <div className="bg-white border border-medical-primary/20 rounded-lg shadow-card max-h-40 overflow-y-auto">
          {filteredSuggestions.map((drug) => (
            <button
              key={drug}
              onClick={() => handleAddDrug(drug)}
              className="w-full text-left px-3 py-2 hover:bg-medical-primary/5 transition-colors border-b border-medical-primary/10 last:border-0"
            >
              {drug}
            </button>
          ))}
        </div>
      )}

      {selectedDrugs.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-medical-primary">Selected Medications:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedDrugs.map((drug) => (
              <Badge
                key={drug}
                variant="secondary"
                className="bg-medical-primary/10 text-medical-primary border-medical-primary/20 hover:bg-medical-primary/20 transition-colors"
              >
                {drug}
                <button
                  onClick={() => onDrugRemove(drug)}
                  className="ml-2 hover:text-medical-danger transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}