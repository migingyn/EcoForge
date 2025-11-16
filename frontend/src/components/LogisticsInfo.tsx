import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Truck, Train, Ship, MapPin, Network } from "lucide-react";

interface Logistics {
  OutboundModes: string[];
  OnsiteRail: string;
  Highways: string;
  WaterAccess: string;
  NearestPort: string;
  ShippingRadius: string;
  LogisticsPartners: string[];
}

interface LogisticsInfoProps {
  logistics: Logistics;
}

export function LogisticsInfo({ logistics }: LogisticsInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="size-5" />
          Logistics & Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-slate-600 mb-2">Outbound Transport Modes</div>
          <div className="flex gap-2">
            {logistics.OutboundModes.map((mode) => (
              <Badge key={mode} variant="secondary" className="flex items-center gap-1">
                {mode === "Rail" && <Train className="size-3" />}
                {mode === "Barge" && <Ship className="size-3" />}
                {mode === "Truck" && <Truck className="size-3" />}
                {mode}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
            <Train className="size-5 text-slate-600 mt-0.5" />
            <div>
              <div className="text-slate-600">Onsite Rail</div>
              <p>{logistics.OnsiteRail}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
            <Truck className="size-5 text-slate-600 mt-0.5" />
            <div>
              <div className="text-slate-600">Highway Access</div>
              <p>{logistics.Highways}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
            <Ship className="size-5 text-slate-600 mt-0.5" />
            <div>
              <div className="text-slate-600">Water Access</div>
              <p>{logistics.WaterAccess}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-slate-600 mb-2">
            <MapPin className="size-4" />
            Nearest Port
          </div>
          <p>{logistics.NearestPort}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 text-slate-600 mb-2">
            <MapPin className="size-4" />
            Shipping Radius
          </div>
          <Badge variant="outline">{logistics.ShippingRadius}</Badge>
        </div>

        <div>
          <div className="flex items-center gap-2 text-slate-600 mb-2">
            <Network className="size-4" />
            Logistics Partners
          </div>
          <div className="flex flex-wrap gap-2">
            {logistics.LogisticsPartners.map((partner) => (
              <Badge key={partner} variant="secondary">
                {partner}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
