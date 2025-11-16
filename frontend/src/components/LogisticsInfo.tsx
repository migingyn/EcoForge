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
        <CardTitle className="flex items-center gap-2 text-black">
          <Truck className="size-5" />
          Logistics & Distribution
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Outbound Transport Modes */}
        <div className="p-3 rounded-lg bg-slate-50">
          <div className="text-slate-600 mb-2 text-left">
            Outbound Transport Modes
          </div>
          <div className="flex gap-2 flex-wrap">
            {logistics.OutboundModes.map((mode) => (
              <Badge
                key={mode}
                variant="secondary"
                className="flex items-center gap-1 text-black bg-slate-200"
              >
                {mode === "Rail" && <Train className="size-3" />}
                {mode === "Barge" && <Ship className="size-3" />}
                {mode === "Truck" && <Truck className="size-3" />}
                {mode}
              </Badge>
            ))}
          </div>
        </div>

        {/* Onsite Rail */}
        <div className="p-3 bg-slate-100 rounded-lg flex items-start gap-3">
          <Train className="size-5 text-slate-600" />
          <div>
            <div className="text-slate-600">Onsite Rail</div>
            <p className="text-black text-left">{logistics.OnsiteRail}</p>
          </div>
        </div>

        {/* Highways */}
        <div className="p-3 bg-slate-100 rounded-lg flex items-start gap-3">
          <Truck className="size-5 text-slate-600" />
          <div>
            <div className="text-slate-600">Highway Access</div>
            <p className="text-black text-left">{logistics.Highways}</p>
          </div>
        </div>

        {/* Water Access */}
        <div className="p-3 bg-slate-100 rounded-lg flex items-start gap-3">
          <Ship className="size-5 text-slate-600" />
          <div>
            <div className="text-slate-600 text-left">Water Access</div>
            <p className="text-black text-left">{logistics.WaterAccess}</p>
          </div>
        </div>

        {/* Nearest Port */}
        <div className="p-3 rounded-lg">
          <div className="flex items-center gap-2 text-slate-600 mb-1">
            <MapPin className="size-4" />
            Nearest Port
          </div>
          <p className="text-black text-left">{logistics.NearestPort}</p>
        </div>

        {/* Shipping Radius */}
        <div className="p-3 rounded-lg flex flex-col">
          <div className="flex items-center gap-2 text-slate-600 mb-1">
            <MapPin className="size-4" />
            Shipping Radius
          </div>
          <Badge variant="outline" className="text-left text-black mr-auto">
            {logistics.ShippingRadius}
          </Badge>
        </div>

        {/* Logistics Partners */}
        <div className="p-3 rounded-lg">
          <div className="flex items-center gap-2 text-slate-600 mb-1">
            <Network className="size-4" />
            Logistics Partners
          </div>
          <div className="flex flex-wrap gap-2 text-black">
            {logistics.LogisticsPartners.map((partner) => (
              <Badge key={partner} variant="secondary" className="bg-slate-100">
                {partner}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
