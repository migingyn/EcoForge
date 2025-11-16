import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Flame, Cog, Package } from "lucide-react";

interface SteelmakingProcess {
  PrimaryRoute: string;
  CokeOvens: string;
  SinterPlants: string;
  Pelletizers: string;
  ScrapShare: string;
  DRIShare: string;
  HotMetalShare: string;
  EAF_MVA: string | null;
  BF_Capacity: string;
  FurnaceSize: string;
  RollingMill: string;
}

interface ProductionCapacity {
  AnnualCrudeSteel_Mt: number;
  RollingCapacity: string;
  UtilizationRate: string;
  FeedstockSources: string;
}

interface ProductionDetailsProps {
  steelmakingProcess: SteelmakingProcess;
  productionCapacity: ProductionCapacity;
}

export function ProductionDetails({
  steelmakingProcess,
  productionCapacity,
}: ProductionDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cog className="size-5" />
          Production Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="process" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="process">Process</TabsTrigger>
            <TabsTrigger value="capacity">Capacity</TabsTrigger>
          </TabsList>

          <TabsContent value="process" className="space-y-4 mt-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Flame className="size-4 text-orange-500" />
                <span className="text-slate-600">Primary Route</span>
              </div>
              <p>{steelmakingProcess.PrimaryRoute}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-slate-600 mb-1">Coke Ovens</div>
                <Badge variant={steelmakingProcess.CokeOvens.includes("Yes") ? "default" : "secondary"}>
                  {steelmakingProcess.CokeOvens}
                </Badge>
              </div>
              <div>
                <div className="text-slate-600 mb-1">Sinter Plants</div>
                <Badge variant={steelmakingProcess.SinterPlants.includes("Yes") ? "default" : "secondary"}>
                  {steelmakingProcess.SinterPlants}
                </Badge>
              </div>
            </div>

            <div>
              <div className="text-slate-600 mb-1">BF Capacity</div>
              <p>{steelmakingProcess.BF_Capacity}</p>
            </div>

            <div>
              <div className="text-slate-600 mb-1">Furnace Size</div>
              <p className="text-slate-900">{steelmakingProcess.FurnaceSize}</p>
            </div>

            <div>
              <div className="text-slate-600 mb-1">Rolling Mill</div>
              <p className="text-slate-900">{steelmakingProcess.RollingMill}</p>
            </div>
          </TabsContent>

          <TabsContent value="capacity" className="space-y-4 mt-4">
            <div className="flex items-center gap-2">
              <Package className="size-4 text-blue-500" />
              <div>
                <div className="text-slate-600">Annual Crude Steel</div>
                <div>{productionCapacity.AnnualCrudeSteel_Mt} Mt/year</div>
              </div>
            </div>

            <div>
              <div className="text-slate-600 mb-1">Rolling Capacity</div>
              <p>{productionCapacity.RollingCapacity}</p>
            </div>

            <div>
              <div className="text-slate-600 mb-1">Feedstock Sources</div>
              <p className="text-slate-900">
                {productionCapacity.FeedstockSources}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-slate-600 mb-1">Scrap Share</div>
                <p>{steelmakingProcess.ScrapShare}</p>
              </div>
              <div className="text-center">
                <div className="text-slate-600 mb-1">DRI Share</div>
                <p>{steelmakingProcess.DRIShare}</p>
              </div>
              <div className="text-center">
                <div className="text-slate-600 mb-1">Hot Metal</div>
                <p>{steelmakingProcess.HotMetalShare}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
