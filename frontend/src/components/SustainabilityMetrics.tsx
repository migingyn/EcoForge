import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Leaf, Target, Zap, AlertCircle } from "lucide-react";
import { Progress } from "./ui/progress";

interface CarbonIntensity {
  CO2_per_ton: number;
  Scope1: string;
  Scope2: string;
  Scope3: string;
}

interface EnergyMix {
  Electricity: string;
  GreenSteelInvestments: string;
  CarbonCapture: string;
  EmissionsTargets: string;
  EPA_Violations: string;
}

interface SustainabilityMetricsProps {
  carbonIntensity: CarbonIntensity;
  energyMix: EnergyMix;
}

export function SustainabilityMetrics({
  carbonIntensity,
  energyMix,
}: SustainabilityMetricsProps) {
  // Typical steel industry range: 1.2-2.3 t CO2/t steel
  // Calculate percentage based on best (1.2) and worst (2.3)
  const co2Percentage =
    ((carbonIntensity.CO2_per_ton - 1.2) / (2.3 - 1.2)) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-black">
          <Leaf className="size-5 text-green-600" />
          Sustainability & Environmental
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-600">CO₂ Intensity</span>
            <span className="text-black">
              {carbonIntensity.CO2_per_ton} t CO₂/t steel
            </span>
          </div>
          <Progress value={co2Percentage} className="h-2" />
          <div className="flex justify-between mt-1">
            <span className="text-slate-500">1.2 (Low)</span>
            <span className="text-slate-500">2.3 (High)</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Zap className="size-4 text-yellow-500 mt-1" />
            <div>
              <div className="text-slate-600 text-left">Energy Mix</div>
              <p className="text-slate-900">{energyMix.Electricity}</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Target className="size-4 text-blue-500 mt-1" />
            <div>
              <div className="text-slate-600 text-left">Emissions Targets</div>
              <p className="text-slate-900 text-left">
                {energyMix.EmissionsTargets}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Leaf className="size-4 text-green-500 mt-1" />
            <div>
              <div className="text-slate-600 text-left">
                Green Steel Investments
              </div>
              <p className="text-slate-900 text-left">
                {energyMix.GreenSteelInvestments}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="size-4 text-amber-500 mt-1" />
            <div className="flex flex-col">
              <div className="text-slate-600 mb-1">Compliance Status</div>
              <Badge
                variant="outline"
                className="bg-amber-50 mr-auto text-left text-black mr-auto"
              >
                {energyMix.EPA_Violations}
              </Badge>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="text-slate-600 mb-2 text-left">Carbon Capture</div>
          <p className="text-slate-900 text-left">{energyMix.CarbonCapture}</p>
        </div>
      </CardContent>
    </Card>
  );
}
