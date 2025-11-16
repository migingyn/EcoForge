import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import {
  MapPin,
  ExternalLink,
  Calendar,
  Navigation,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

export interface Plant {
  Location: string;
  Latitude: number;
  Longitude: number;
  "Google Maps": string;
  "Year commissioned": number;
}

interface PlantLocationsProps {
  plants: Record<string, Plant>;
}

export function PlantLocations({ plants }: PlantLocationsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const plantEntries = Object.entries(plants);
  const [closestPlantName, closestPlant] = plantEntries[0];
  const visiblePlants = plantEntries.slice(1, 3);
  const hiddenPlants = plantEntries.slice(3);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="size-5" />
          Plant Locations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Closest Plant with Map */}
        <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
          <div className="flex items-center gap-2 mb-3">
            <Navigation className="size-5 text-blue-600" />
            <Badge className="bg-blue-600">Closest to You</Badge>
          </div>

          <div className="mb-3">
            <h3 className="mb-1 text-black text-left">{closestPlantName}</h3>
            <p className="text-slate-600 text-left">{closestPlant.Location}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge
                variant="outline"
                className="flex items-center gap-1 text-black"
              >
                <Calendar className="size-3 text-black" />
                {closestPlant["Year commissioned"]}
              </Badge>
              <span className="text-slate-500">
                {closestPlant.Latitude.toFixed(4)},{" "}
                {closestPlant.Longitude.toFixed(4)}
              </span>
            </div>
          </div>

          {/* Embedded Map */}
          <div className="rounded-lg overflow-hidden border-2 border-slate-200 mb-3">
            <iframe
              width="100%"
              height="300"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${closestPlant.Latitude},${closestPlant.Longitude}&zoom=13`}
            />
          </div>

          <Button
            variant="default"
            className="w-full"
            onClick={() => window.open(closestPlant["Google Maps"], "_blank")}
          >
            <ExternalLink className="size-4 mr-2" />
            Get Directions
          </Button>
        </div>

        {/* Other Plants */}
        <div>
          <h3 className="mb-3">Other Locations</h3>
          <div className="space-y-3">
            {visiblePlants.map(([plantName, plantData]) => (
              <div
                key={plantName}
                className="border rounded-lg p-4 hover:border-slate-400 transition-colors text-black"
              >
                <div className="flex items-start justify-between mb-2 text-left">
                  <div>
                    <h3 className="mb-1">{plantName}</h3>
                    <p className="text-slate-600">{plantData.Location}</p>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Calendar className="size-3" />
                    {plantData["Year commissioned"]}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-slate-500">
                    {plantData.Latitude.toFixed(4)},{" "}
                    {plantData.Longitude.toFixed(4)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto bg-slate-50"
                    onClick={() =>
                      window.open(plantData["Google Maps"], "_blank")
                    }
                  >
                    <ExternalLink className="size-4 mr-1" />
                    View on Map
                  </Button>
                </div>
              </div>
            ))}

            {/* Collapsible Section for Additional Plants */}
            {hiddenPlants.length > 0 && (
              <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                {/* Top button when collapsed */}
                {!isOpen && (
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full">
                      {`Show ${hiddenPlants.length} More Location${
                        hiddenPlants.length > 1 ? "s" : ""
                      }`}
                      <ChevronDown className="size-4 ml-2" />
                    </Button>
                  </CollapsibleTrigger>
                )}

                <CollapsibleContent className="space-y-3 mt-3">
                  {hiddenPlants.map(([plantName, plantData]) => (
                    <div
                      key={plantName}
                      className="border rounded-lg p-4 hover:border-slate-400 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="mb-1 text-black text-left">
                            {plantName}
                          </h3>
                          <p className="text-slate-600 text-left">
                            {plantData.Location}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1 text-black"
                        >
                          <Calendar className="size-3 text-black" />
                          {plantData["Year commissioned"]}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-slate-500">
                          {plantData.Latitude.toFixed(4)},{" "}
                          {plantData.Longitude.toFixed(4)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-auto bg-slate-50 text-black"
                          onClick={() =>
                            window.open(plantData["Google Maps"], "_blank")
                          }
                        >
                          <ExternalLink className="size-4 mr-1" />
                          View on Map
                        </Button>
                      </div>
                    </div>
                  ))}
                </CollapsibleContent>

                {/* Bottom button when expanded */}
                {isOpen && (
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full mt-3">
                      Show Less
                      <ChevronDown className="size-4 ml-2 rotate-180" />
                    </Button>
                  </CollapsibleTrigger>
                )}
              </Collapsible>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
