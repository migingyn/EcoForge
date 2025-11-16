import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Sparkles, CheckCircle2, TrendingUp } from "lucide-react";

interface AISummaryProps {
  millName: string;
}

export function AISummary({ millName }: AISummaryProps) {
  return (
    <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Sparkles className="size-5 text-purple-600" />
          </div>
          <div>
            <CardTitle>AI Recommendation Summary</CardTitle>
            <p className="text-slate-600 mt-1">
              Based on your criteria, here's why we recommend {millName}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          {millName} stands out as the optimal choice for your steel procurement needs. 
          With an impressive annual production capacity of <span className="font-semibold">6.8 Mt/year</span>, 
          this integrated steel producer offers the scale and reliability required for large-volume operations. 
          The company's extensive network of <span className="font-semibold">5 strategically located plants</span> across 
          the Midwest ensures flexible logistics and reduced transportation costs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-green-200">
            <CheckCircle2 className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-green-900 mb-1">Strategic Location</div>
              <p className="text-slate-600">
                Midwest presence with excellent rail and water access to major markets
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-blue-200">
            <CheckCircle2 className="size-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-blue-900 mb-1">Proven Capacity</div>
              <p className="text-slate-600">
                Large-scale integrated operations with diverse rolling mill capabilities
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-purple-200">
            <CheckCircle2 className="size-5 text-purple-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-purple-900 mb-1">Future Ready</div>
              <p className="text-slate-600">
                Investing in hydrogen-ready infrastructure and targeting net-zero by 2050
              </p>
            </div>
          </div>
        </div>

        <div className="border-t pt-4 mt-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="size-4 text-slate-600" />
            <span className="text-slate-700">Key Advantages</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Established since 1847</Badge>
            <Badge variant="secondary">Integrated BF-BOF process</Badge>
            <Badge variant="secondary">Multi-modal logistics</Badge>
            <Badge variant="secondary">Automotive sector expertise</Badge>
            <Badge variant="secondary">Great Lakes shipping access</Badge>
          </div>
        </div>

        <p className="text-slate-600 italic pt-2 border-t">
          Note: While the mill has a higher CO₂ intensity (1.54 t/t steel), it's actively working 
          toward sustainability goals with hydrogen injection pilots and emissions reduction targets.
        </p>
      </CardContent>
    </Card>
  );
}
