import { AlertTriangle, CheckCircle, Info, Pill } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

interface Interaction {
  id: string;
  drug1: string;
  drug2: string;
  severity: "low" | "moderate" | "high";
  description: string;
  recommendation: string;
}

interface DosageRecommendation {
  drug: string;
  dosage: string;
  frequency: string;
  ageGroup: string;
  notes: string;
}

interface AlternativeMedication {
  original: string;
  alternative: string;
  reason: string;
  effectiveness: string;
}

interface InteractionResultsProps {
  interactions: Interaction[];
  dosageRecommendations: DosageRecommendation[];
  alternatives: AlternativeMedication[];
}

export function InteractionResults({ interactions, dosageRecommendations, alternatives }: InteractionResultsProps) {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="h-4 w-4 text-medical-danger" />;
      case "moderate":
        return <AlertTriangle className="h-4 w-4 text-medical-warning" />;
      case "low":
        return <Info className="h-4 w-4 text-medical-secondary" />;
      default:
        return <CheckCircle className="h-4 w-4 text-medical-success" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-medical-danger/20 bg-medical-danger/5";
      case "moderate":
        return "border-medical-warning/20 bg-medical-warning/5";
      case "low":
        return "border-medical-secondary/20 bg-medical-secondary/5";
      default:
        return "border-medical-success/20 bg-medical-success/5";
    }
  };

  return (
    <div className="space-y-6">
      {/* Drug Interactions */}
      <Card className="border-medical-primary/20 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-medical-primary">
            <AlertTriangle className="h-5 w-5" />
            Drug Interactions
            {interactions.length === 0 && (
              <Badge variant="secondary" className="bg-medical-success/10 text-medical-success border-medical-success/20">
                No Interactions Found
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {interactions.length === 0 ? (
            <Alert className="border-medical-success/20 bg-medical-success/5">
              <CheckCircle className="h-4 w-4 text-medical-success" />
              <AlertDescription className="text-medical-success">
                No dangerous drug interactions detected with the selected medications.
              </AlertDescription>
            </Alert>
          ) : (
            interactions.map((interaction) => (
              <Alert key={interaction.id} className={getSeverityColor(interaction.severity)}>
                {getSeverityIcon(interaction.severity)}
                <AlertDescription>
                  <div className="space-y-2">
                    <div className="font-medium">
                      {interaction.drug1} ↔ {interaction.drug2}
                      <Badge 
                        variant="outline" 
                        className={`ml-2 ${
                          interaction.severity === "high" ? "border-medical-danger text-medical-danger" :
                          interaction.severity === "moderate" ? "border-medical-warning text-medical-warning" :
                          "border-medical-secondary text-medical-secondary"
                        }`}
                      >
                        {interaction.severity.toUpperCase()} Risk
                      </Badge>
                    </div>
                    <p className="text-sm">{interaction.description}</p>
                    <p className="text-sm font-medium">Recommendation: {interaction.recommendation}</p>
                  </div>
                </AlertDescription>
              </Alert>
            ))
          )}
        </CardContent>
      </Card>

      {/* Dosage Recommendations */}
      <Card className="border-medical-primary/20 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-medical-primary">
            <Pill className="h-5 w-5" />
            Age-Appropriate Dosage Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {dosageRecommendations.map((rec, index) => (
              <div key={index} className="p-4 bg-gradient-card border border-medical-primary/10 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-medical-primary">{rec.drug}</h4>
                  <Badge variant="outline" className="border-medical-secondary text-medical-secondary">
                    {rec.ageGroup}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-medical-primary">Dosage:</span> {rec.dosage}
                  </div>
                  <div>
                    <span className="font-medium text-medical-primary">Frequency:</span> {rec.frequency}
                  </div>
                </div>
                {rec.notes && (
                  <p className="text-sm text-medical-secondary mt-2 italic">{rec.notes}</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alternative Medications */}
      {alternatives.length > 0 && (
        <Card className="border-medical-primary/20 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-medical-primary">
              <CheckCircle className="h-5 w-5" />
              Alternative Medication Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alternatives.map((alt, index) => (
                <div key={index} className="p-4 bg-gradient-card border border-medical-success/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-medical-primary">
                      {alt.original} → {alt.alternative}
                    </div>
                    <Badge variant="outline" className="border-medical-success text-medical-success">
                      {alt.effectiveness}
                    </Badge>
                  </div>
                  <p className="text-sm text-medical-secondary">{alt.reason}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}