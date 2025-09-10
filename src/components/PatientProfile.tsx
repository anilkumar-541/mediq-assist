import { useState } from "react";
import { User, Calendar, Weight, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PatientData {
  age: string;
  weight: string;
  gender: string;
  conditions: string[];
}

interface PatientProfileProps {
  patientData: PatientData;
  onPatientDataChange: (data: PatientData) => void;
}

const COMMON_CONDITIONS = [
  "Hypertension", "Diabetes", "Heart Disease", "Kidney Disease",
  "Liver Disease", "Asthma", "Depression", "Anxiety"
];

export function PatientProfile({ patientData, onPatientDataChange }: PatientProfileProps) {
  const [newCondition, setNewCondition] = useState("");

  const updatePatientData = (field: keyof PatientData, value: any) => {
    onPatientDataChange({
      ...patientData,
      [field]: value
    });
  };

  const addCondition = (condition: string) => {
    if (condition && !patientData.conditions.includes(condition)) {
      updatePatientData("conditions", [...patientData.conditions, condition]);
      setNewCondition("");
    }
  };

  const removeCondition = (condition: string) => {
    updatePatientData("conditions", patientData.conditions.filter(c => c !== condition));
  };

  const getAgeGroup = (age: string) => {
    const ageNum = parseInt(age);
    if (ageNum < 18) return "Pediatric";
    if (ageNum >= 65) return "Geriatric";
    return "Adult";
  };

  return (
    <Card className="bg-gradient-card border-medical-primary/20 shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-medical-primary">
          <User className="h-5 w-5" />
          Patient Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="age" className="text-sm font-medium text-medical-primary">
              <Calendar className="inline h-4 w-4 mr-1" />
              Age
            </Label>
            <Input
              id="age"
              type="number"
              placeholder="Enter age"
              value={patientData.age}
              onChange={(e) => updatePatientData("age", e.target.value)}
              className="border-medical-primary/20 focus:border-medical-primary focus:ring-medical-primary/20"
            />
            {patientData.age && (
              <span className="text-xs text-medical-secondary font-medium">
                {getAgeGroup(patientData.age)} Patient
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight" className="text-sm font-medium text-medical-primary">
              <Weight className="inline h-4 w-4 mr-1" />
              Weight (kg)
            </Label>
            <Input
              id="weight"
              type="number"
              placeholder="Enter weight"
              value={patientData.weight}
              onChange={(e) => updatePatientData("weight", e.target.value)}
              className="border-medical-primary/20 focus:border-medical-primary focus:ring-medical-primary/20"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-medical-primary">
              <Heart className="inline h-4 w-4 mr-1" />
              Gender
            </Label>
            <Select
              value={patientData.gender}
              onValueChange={(value) => updatePatientData("gender", value)}
            >
              <SelectTrigger className="border-medical-primary/20 focus:border-medical-primary focus:ring-medical-primary/20">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-medical-primary">Medical Conditions</Label>
          <div className="flex gap-2">
            <Select value={newCondition} onValueChange={setNewCondition}>
              <SelectTrigger className="flex-1 border-medical-primary/20 focus:border-medical-primary focus:ring-medical-primary/20">
                <SelectValue placeholder="Add medical condition" />
              </SelectTrigger>
              <SelectContent>
                {COMMON_CONDITIONS.filter(c => !patientData.conditions.includes(c)).map((condition) => (
                  <SelectItem key={condition} value={condition}>
                    {condition}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <button
              onClick={() => addCondition(newCondition)}
              disabled={!newCondition}
              className="px-4 py-2 bg-medical-primary text-white rounded-md hover:bg-medical-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Add
            </button>
          </div>

          {patientData.conditions.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {patientData.conditions.map((condition) => (
                <span
                  key={condition}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-medical-warning/10 text-medical-warning border border-medical-warning/20 rounded-full text-sm"
                >
                  {condition}
                  <button
                    onClick={() => removeCondition(condition)}
                    className="hover:text-medical-danger transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}