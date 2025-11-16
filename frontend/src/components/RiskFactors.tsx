import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { AlertTriangle, TrendingDown, Wrench, Users, MapPin } from "lucide-react";

interface RiskFactors {
  Market: string;
  Operational: string;
  Labor: string;
  Geographic: string;
}

interface RiskFactorsProps {
  riskFactors: RiskFactors;
  redFlags: string;
}

export function RiskFactors({ riskFactors, redFlags }: RiskFactorsProps) {
  const riskIcons = {
    Market: TrendingDown,
    Operational: Wrench,
    Labor: Users,
    Geographic: MapPin,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="size-5 text-amber-500" />
          Risk Assessment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="size-4" />
          <AlertDescription>
            <span>Red Flags: </span>
            <span>{redFlags}</span>
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(riskFactors).map(([category, description]) => {
            const Icon = riskIcons[category as keyof typeof riskIcons];
            return (
              <div
                key={category}
                className="border rounded-lg p-4 hover:border-slate-400 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <Icon className="size-5 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1">{category} Risk</div>
                    <p className="text-slate-600">{description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
