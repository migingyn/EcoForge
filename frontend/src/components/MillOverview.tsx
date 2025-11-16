import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Factory, Calendar, Gauge, Leaf } from "lucide-react";

interface MillOverviewProps {
  name: string;
  yearCommissioned: string;
  plantCount: number;
  annualCapacity: number;
  co2Intensity: number;
}

export function MillOverview({
  name,
  yearCommissioned,
  plantCount,
  annualCapacity,
  co2Intensity,
}: MillOverviewProps) {
  return (
    <Card className="bg-gradient-to-r from-slate-900 to-slate-700 text-white p-8">
      <div className="flex items-start justify-between">
        <div>
          <Badge variant="secondary" className="mb-3">
            Recommended Steel Mill
          </Badge>
          <h1 className="mb-2">{name}</h1>
          <p className="text-slate-300">Established {yearCommissioned}</p>
        </div>
        <Factory className="size-12 text-slate-400" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-white/10 rounded-lg">
            <Factory className="size-5" />
          </div>
          <div>
            <div className="text-slate-400">Plants</div>
            <div>{plantCount} Locations</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 bg-white/10 rounded-lg">
            <Gauge className="size-5" />
          </div>
          <div>
            <div className="text-slate-400">Annual Capacity</div>
            <div>{annualCapacity} Mt/yr</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 bg-white/10 rounded-lg">
            <Leaf className="size-5" />
          </div>
          <div>
            <div className="text-slate-400">CO₂ Intensity</div>
            <div>{co2Intensity} t/t steel</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 bg-white/10 rounded-lg">
            <Calendar className="size-5" />
          </div>
          <div>
            <div className="text-slate-400">Founded</div>
            <div>{yearCommissioned}</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
