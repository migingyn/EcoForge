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
        <CardTitle className="flex items-center gap-2 text-black">
          <Cog className="size-5 text-black" />
          Production Details
        </CardTitle>
      </CardHeader>

      <CardContent className="text-black">
        <Tabs defaultValue="process" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-200 rounded-lg p-1">
            <TabsTrigger
              value="process"
              className="
                bg-gray-200 text-black
                data-[state=active]:bg-white data-[state=active]:text-black
                rounded-md
              "
            >
              Process
            </TabsTrigger>

            <TabsTrigger
              value="capacity"
              className="
                bg-gray-200 text-black
                data-[state=active]:bg-white data-[state=active]:text-black
                rounded-md
              "
            >
              Capacity
            </TabsTrigger>
          </TabsList>

          {/* PROCESS TAB ------------------------------------------------ */}
          <TabsContent
            value="process"
            className="space-y-4 mt-4 text-black text-left"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Flame className="size-4 text-orange-500" />
                <span className="text-black">Primary Route</span>
              </div>
              <p className="text-black">{steelmakingProcess.PrimaryRoute}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="mb-1 text-black w-full">Coke Ovens</div>
                <Badge className="text-white bg-black">
                  {steelmakingProcess.CokeOvens}
                </Badge>
              </div>

              <div>
                <div className="mb-1 text-black w-full">Sinter Plants</div>
                <Badge className="text-white bg-black">
                  {steelmakingProcess.SinterPlants}
                </Badge>
              </div>
            </div>

            <div className="text-left">
              <div className="mb-1 text-black">BF Capacity</div>
              <p className="text-black">{steelmakingProcess.BF_Capacity}</p>
            </div>

            <div className="text-left">
              <div className="mb-1 text-black">Furnace Size</div>
              <p className="text-black">{steelmakingProcess.FurnaceSize}</p>
            </div>

            <div className="text-left">
              <div className="mb-1 text-black">Rolling Mill</div>
              <p className="text-black">{steelmakingProcess.RollingMill}</p>
            </div>
          </TabsContent>

          {/* CAPACITY TAB ------------------------------------------------ */}
          <TabsContent
            value="capacity"
            className="space-y-4 mt-4 text-black text-left"
          >
            <div className="flex items-center gap-2">
              <Package className="size-4 text-blue-500" />
              <div>
                <div className="text-black">Annual Crude Steel</div>
                <div className="text-black">
                  {productionCapacity.AnnualCrudeSteel_Mt} Mt/year
                </div>
              </div>
            </div>

            <div className="text-left">
              <div className="mb-1 text-black">Rolling Capacity</div>
              <p className="text-black">{productionCapacity.RollingCapacity}</p>
            </div>

            <div className="text-left">
              <div className="mb-1 text-black">Feedstock Sources</div>
              <p className="text-black">
                {productionCapacity.FeedstockSources}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t text-left">
              <div>
                <div className="mb-1 text-black">Scrap Share</div>
                <p className="text-black">{steelmakingProcess.ScrapShare}</p>
              </div>
              <div>
                <div className="mb-1 text-black">DRI Share</div>
                <p className="text-black">{steelmakingProcess.DRIShare}</p>
              </div>
              <div>
                <div className="mb-1 text-black">Hot Metal</div>
                <p className="text-black">{steelmakingProcess.HotMetalShare}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
