import { useState } from "react";
import { Shield, Activity, Stethoscope, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DrugSearchInput } from "@/components/DrugSearchInput";
import { PatientProfile } from "@/components/PatientProfile";
import { InteractionResults } from "@/components/InteractionResults";
import { NLPTextAnalyzer } from "@/components/NLPTextAnalyzer";

interface PatientData {
  age: string;
  weight: string;
  gender: string;
  conditions: string[];
}

const Index = () => {
  const [selectedDrugs, setSelectedDrugs] = useState<string[]>([]);
  const [patientData, setPatientData] = useState<PatientData>({
    age: "",
    weight: "",
    gender: "",
    conditions: []
  });
  const [analysisResults, setAnalysisResults] = useState({
    interactions: [
      {
        id: "1",
        drug1: "Warfarin",
        drug2: "Aspirin",
        severity: "high" as const,
        description: "Increased risk of bleeding when these medications are taken together.",
        recommendation: "Monitor INR closely and consider dose adjustment. Use gastroprotective therapy."
      }
    ],
    dosageRecommendations: [
      {
        drug: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily with meals",
        ageGroup: "Adult",
        notes: "Start with lower dose if kidney function is impaired"
      },
      {
        drug: "Lisinopril",
        dosage: "5mg",
        frequency: "Once daily",
        ageGroup: "Adult",
        notes: "Monitor blood pressure and kidney function"
      }
    ],
    alternatives: [
      {
        original: "Aspirin",
        alternative: "Clopidogrel",
        reason: "Lower bleeding risk when combined with Warfarin",
        effectiveness: "Equivalent"
      }
    ]
  });

  const handleDrugAdd = (drug: string) => {
    setSelectedDrugs(prev => [...prev, drug]);
  };

  const handleDrugRemove = (drug: string) => {
    setSelectedDrugs(prev => prev.filter(d => d !== drug));
  };

  const handleDrugsFromNLP = (drugs: string[]) => {
    setSelectedDrugs(prev => {
      const newDrugs = drugs.filter(drug => !prev.includes(drug));
      return [...prev, ...newDrugs];
    });
  };

  const getAgeGroup = (age: string) => {
    const ageNum = parseInt(age);
    if (ageNum < 18) return "Pediatric";
    if (ageNum >= 65) return "Geriatric";
    return "Adult";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              DrugSafe AI
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-2">
              Intelligent Drug Interaction & Dosage Analysis System
            </p>
            <p className="text-white/80 max-w-3xl mx-auto">
              Advanced NLP-powered platform for healthcare professionals to detect drug interactions, 
              recommend age-appropriate dosages, and suggest safer medication alternatives.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Input Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gradient-card border-medical-primary/20 shadow-card">
                <CardContent className="p-4 text-center">
                  <Shield className="h-8 w-8 text-medical-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-medical-primary">{selectedDrugs.length}</div>
                  <div className="text-sm text-medical-secondary">Medications</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-card border-medical-primary/20 shadow-card">
                <CardContent className="p-4 text-center">
                  <Activity className="h-8 w-8 text-medical-secondary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-medical-primary">
                    {patientData.age ? getAgeGroup(patientData.age) : "--"}
                  </div>
                  <div className="text-sm text-medical-secondary">Age Group</div>
                </CardContent>
              </Card>
            </div>

            {/* Patient Profile */}
            <PatientProfile 
              patientData={patientData} 
              onPatientDataChange={setPatientData} 
            />

            {/* Drug Search */}
            <Card className="bg-gradient-card border-medical-primary/20 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-medical-primary">
                  <Stethoscope className="h-5 w-5" />
                  Medication Input
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DrugSearchInput
                  selectedDrugs={selectedDrugs}
                  onDrugAdd={handleDrugAdd}
                  onDrugRemove={handleDrugRemove}
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Analysis Section */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="analysis" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 bg-medical-primary/10 border border-medical-primary/20">
                <TabsTrigger 
                  value="analysis" 
                  className="data-[state=active]:bg-medical-primary data-[state=active]:text-white"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Analysis Results
                </TabsTrigger>
                <TabsTrigger 
                  value="nlp" 
                  className="data-[state=active]:bg-medical-primary data-[state=active]:text-white"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  NLP Extraction
                </TabsTrigger>
              </TabsList>

              <TabsContent value="analysis" className="space-y-6">
                {selectedDrugs.length > 0 ? (
                  <InteractionResults
                    interactions={analysisResults.interactions}
                    dosageRecommendations={analysisResults.dosageRecommendations}
                    alternatives={analysisResults.alternatives}
                  />
                ) : (
                  <Card className="bg-gradient-card border-medical-primary/20 shadow-card">
                    <CardContent className="p-8 text-center">
                      <Stethoscope className="h-12 w-12 text-medical-primary/40 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-medical-primary mb-2">
                        Ready for Analysis
                      </h3>
                      <p className="text-medical-secondary">
                        Add medications to your patient's profile to begin comprehensive drug interaction 
                        and dosage analysis.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="nlp">
                <NLPTextAnalyzer onDrugsExtracted={handleDrugsFromNLP} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-medical-primary/5 border-t border-medical-primary/20 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-medical-secondary">
            <p className="mb-2">
              <strong className="text-medical-primary">DrugSafe AI</strong> - Advanced medication safety analysis platform
            </p>
            <p className="text-sm">
              Powered by NLP, Machine Learning, and comprehensive drug databases for healthcare professionals
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;