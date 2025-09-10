import { useState } from "react";
import { FileText, Brain, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ExtractedDrugInfo {
  drugName: string;
  dosage: string;
  frequency: string;
  duration: string;
  confidence: number;
}

interface NLPTextAnalyzerProps {
  onDrugsExtracted: (drugs: string[]) => void;
}

export function NLPTextAnalyzer({ onDrugsExtracted }: NLPTextAnalyzerProps) {
  const [inputText, setInputText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [extractedInfo, setExtractedInfo] = useState<ExtractedDrugInfo[]>([]);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const analyzeText = async () => {
    setIsAnalyzing(true);
    setAnalysisComplete(false);

    // Simulate NLP processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock extraction results
    const mockExtracted: ExtractedDrugInfo[] = [
      {
        drugName: "Metformin",
        dosage: "500mg",
        frequency: "twice daily",
        duration: "ongoing",
        confidence: 0.95
      },
      {
        drugName: "Lisinopril",
        dosage: "10mg",
        frequency: "once daily",
        duration: "ongoing",
        confidence: 0.88
      },
      {
        drugName: "Aspirin",
        dosage: "81mg",
        frequency: "once daily",
        duration: "ongoing",
        confidence: 0.92
      }
    ];

    setExtractedInfo(mockExtracted);
    setIsAnalyzing(false);
    setAnalysisComplete(true);

    // Pass extracted drug names to parent
    onDrugsExtracted(mockExtracted.map(info => info.drugName));
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "text-medical-success border-medical-success";
    if (confidence >= 0.8) return "text-medical-warning border-medical-warning";
    return "text-medical-danger border-medical-danger";
  };

  const sampleTexts = [
    "Patient is prescribed Metformin 500mg twice daily for diabetes management, along with Lisinopril 10mg once daily for blood pressure control.",
    "Rx: Aspirin 81mg QD, Simvastatin 20mg HS, continue current medications",
    "The patient should take Omeprazole 20mg before breakfast and Metoprolol 50mg BID with meals."
  ];

  return (
    <Card className="border-medical-primary/20 shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-medical-primary">
          <Brain className="h-5 w-5" />
          NLP Drug Information Extraction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-medical-primary">
            Medical Text Input
          </label>
          <Textarea
            placeholder="Enter prescription notes, clinical text, or medical documentation..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-32 border-medical-primary/20 focus:border-medical-primary focus:ring-medical-primary/20"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-medical-primary">Sample Texts</label>
          <div className="grid gap-2">
            {sampleTexts.map((text, index) => (
              <button
                key={index}
                onClick={() => setInputText(text)}
                className="text-left p-3 bg-medical-primary/5 border border-medical-primary/20 rounded-md hover:bg-medical-primary/10 transition-colors text-sm"
              >
                {text}
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={analyzeText}
          disabled={!inputText.trim() || isAnalyzing}
          className="w-full bg-medical-primary hover:bg-medical-primary/90 text-white"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing Text...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              Extract Drug Information
            </>
          )}
        </Button>

        {analysisComplete && extractedInfo.length > 0 && (
          <div className="space-y-3 animate-slide-up">
            <h4 className="font-medium text-medical-primary">Extracted Drug Information:</h4>
            <div className="space-y-3">
              {extractedInfo.map((info, index) => (
                <div key={index} className="p-4 bg-gradient-card border border-medical-primary/10 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-medical-primary">{info.drugName}</h5>
                    <Badge 
                      variant="outline" 
                      className={getConfidenceColor(info.confidence)}
                    >
                      {Math.round(info.confidence * 100)}% confidence
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-medical-primary">Dosage:</span>
                      <br />
                      {info.dosage}
                    </div>
                    <div>
                      <span className="font-medium text-medical-primary">Frequency:</span>
                      <br />
                      {info.frequency}
                    </div>
                    <div>
                      <span className="font-medium text-medical-primary">Duration:</span>
                      <br />
                      {info.duration}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}