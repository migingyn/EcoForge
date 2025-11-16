import { useLocation } from "react-router-dom";

import { MillOverview } from "./components/MillOverview";
import { AISummary } from "./components/AISummary";
import { PlantLocations } from "./components/PlantLocations";
import { ProductionDetails } from "./components/ProductionDetails";
import { SustainabilityMetrics } from "./components/SustainabilityMetrics";
import { LogisticsInfo } from "./components/LogisticsInfo";
import { RiskFactors } from "./components/RiskFactors";

import type { Plant as PlantUI } from "./components/PlantLocations";

// --- Types -------------------------------------------------------------

type UIRiskFactors = {
  Market: string;
  Operational: string;
  Labor: string;
  Geographic: string;
};

type UILogistics = {
  OutboundModes: string[];
  OnsiteRail: string;
  Highways: string;
  WaterAccess: string;
  NearestPort: string;
  ShippingRadius: string;
  LogisticsPartners: string[];
};

type UIEnergyMix = {
  Electricity: string;
  GreenSteelInvestments: string;
  CarbonCapture: string;
  EmissionsTargets: string;
  EPA_Violations: string;
};

type UIProductionCapacity = {
  AnnualCrudeSteel_Mt: number;
  RollingCapacity: string;
  UtilizationRate: string;
  FeedstockSources: string;
};

type UISteelmakingProcess = {
  PrimaryRoute: string;
  CokeOvens: string;
  SinterPlants: string;
  Pelletizers: string;
  ScrapShare: string;
  DRIShare: string;
  HotMetalShare: string;
  EAF_MVA: string;
  BF_Capacity: string;
  FurnaceSize: string;
  RollingMill: string;
};

type UICarbonIntensity = {
  CO2_per_ton: number;
  Scope1: string;
  Scope2: string;
  Scope3: string;
};

type PlantMetadata = {
  Location: string;
  Latitude: number | string;
  Longitude: number | string;
  "Google Maps": string;
  "Year commissioned": number | string;
};

type SteelMillData = {
  Name: string;
  Plants: Record<string, PlantMetadata>;
  YearCommissioned: string | number;

  SteelmakingProcess: {
    PrimaryRoute: string;
    CokeOvens?: string;
    SinterPlants?: string;
    Pelletizers?: string;
    ScrapShare?: string;
    DRIShare?: string;
    HotMetalShare?: string;
    EAF_MVA?: number | null;
    BF_Capacity?: string | null;
    FurnaceSize?: string | null;
    RollingMill?: string | null;
    // allow extra keys without complaining
    [key: string]: unknown;
  };

  CarbonIntensity: {
    CO2_per_ton: number;
    Scope1?: string | number;
    Scope2?: string | number;
    Scope3?: string | number;
    [key: string]: unknown;
  };

  ProductionCapacity: {
    AnnualCrudeSteel_Mt: number;
    RollingCapacity?: string;
    UtilizationRate?: string | number;
    FeedstockSources?: string;
    [key: string]: unknown;
  };

  Logistics: {
    OutboundModes?: string[];
    OnsiteRail?: string;
    Highways?: string;
    WaterAccess?: string;
    NearestPort?: string;
    ShippingRadius?: string;
    LogisticsPartners?: string[];
    [key: string]: unknown;
  };

  EnergyMix_Sustainability: {
    Electricity?: string;
    GreenSteelInvestments?: string;
    CarbonCapture?: string;
    EmissionsTargets?: string;
    EPA_Violations?: string;
    [key: string]: unknown;
  };

  RiskFactors: {
    Market?: string;
    Operational?: string;
    Labor?: string;
    Geographic?: string;
    [key: string]: unknown;
  };

  ModelInputs: {
    CO2Intensity?: number;
    LogisticsMode?: string;
    RedFlags?: string;
    [key: string]: unknown;
  };
};

// This matches the /optimize result you described
type OptimizeMillResult = {
  company: string;
  final_score: number;
  scores: {
    cost: number;
    risk: number;
    co2: number;
    logistics: number;
  };
  weights: Record<string, number>;
  representative_plant?: {
    plant_name: string;
    lat: number;
    lon: number;
    distance_km: number;
  };
};

type LocationState = {
  mill: OptimizeMillResult;
  metadata: SteelMillData;
};

// --- Component ---------------------------------------------------------

export default function Info() {
  const { state } = useLocation() as { state: LocationState | null };

  const mill = state?.mill;
  const metadata = state?.metadata;

  if (!mill || !metadata) {
    return (
      <div className="min-h-screen w-screen bg-slate-50 pt-36">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-semibold text-slate-900">
            Mill information unavailable
          </h1>
          <p className="mt-2 text-slate-600">
            Please run an optimization from the main page and navigate here from
            the results view.
          </p>
        </div>
      </div>
    );
  }

  // Derived values + safe fallbacks
  const plantCount = metadata.Plants ? Object.keys(metadata.Plants).length : 0;

  const annualCapacity = metadata.ProductionCapacity?.AnnualCrudeSteel_Mt ?? 0;

  const co2Intensity =
    metadata.CarbonIntensity?.CO2_per_ton ??
    metadata.ModelInputs?.CO2Intensity ??
    null;

  const uiCarbonIntensity: UICarbonIntensity = {
    CO2_per_ton: metadata.CarbonIntensity.CO2_per_ton,
    Scope1: String(metadata.CarbonIntensity.Scope1 ?? "N/A"),
    Scope2: String(metadata.CarbonIntensity.Scope2 ?? "N/A"),
    Scope3: String(metadata.CarbonIntensity.Scope3 ?? "N/A"),
  };

  const sp = metadata.SteelmakingProcess;

  const uiSteelmakingProcess: UISteelmakingProcess = {
    PrimaryRoute: String(sp.PrimaryRoute ?? "N/A"),
    CokeOvens: String(sp.CokeOvens ?? "N/A"),
    SinterPlants: String(sp.SinterPlants ?? "N/A"),
    Pelletizers: String(sp.Pelletizers ?? "N/A"),
    ScrapShare: String(sp.ScrapShare ?? "N/A"),
    DRIShare: String(sp.DRIShare ?? "N/A"),
    HotMetalShare: String(sp.HotMetalShare ?? "N/A"),
    EAF_MVA: sp.EAF_MVA != null ? String(sp.EAF_MVA) : "N/A",
    BF_Capacity: sp.BF_Capacity ?? "N/A",
    FurnaceSize: sp.FurnaceSize ?? "N/A",
    RollingMill: sp.RollingMill ?? "N/A",
  };

  const uiYearCommissioned = String(metadata.YearCommissioned ?? "N/A");

  const uiPlants: Record<string, PlantUI> = Object.fromEntries(
    Object.entries(metadata.Plants).map(([name, plant]) => [
      name,
      {
        Location: plant.Location,
        Latitude: Number(plant.Latitude),
        Longitude: Number(plant.Longitude),
        "Google Maps": plant["Google Maps"],
        "Year commissioned": Number(plant["Year commissioned"]),
      },
    ])
  );

  const pc = metadata.ProductionCapacity ?? {};

  const uiProductionCapacity: UIProductionCapacity = {
    AnnualCrudeSteel_Mt: pc.AnnualCrudeSteel_Mt ?? 0,
    RollingCapacity: pc.RollingCapacity ?? "N/A",
    UtilizationRate:
      pc.UtilizationRate != null ? String(pc.UtilizationRate) : "N/A",
    FeedstockSources: pc.FeedstockSources ?? "N/A",
  };

  const em = metadata.EnergyMix_Sustainability ?? {};

  const uiEnergyMix: UIEnergyMix = {
    Electricity: em.Electricity ?? "N/A",
    GreenSteelInvestments: em.GreenSteelInvestments ?? "N/A",
    CarbonCapture: em.CarbonCapture ?? "N/A",
    EmissionsTargets: em.EmissionsTargets ?? "N/A",
    EPA_Violations: em.EPA_Violations ?? "N/A",
  };

  const lg = metadata.Logistics ?? {};

  const uiLogistics: UILogistics = {
    OutboundModes: lg.OutboundModes ?? [],
    OnsiteRail: lg.OnsiteRail ?? "N/A",
    Highways: lg.Highways ?? "N/A",
    WaterAccess: lg.WaterAccess ?? "N/A",
    NearestPort: lg.NearestPort ?? "N/A",
    ShippingRadius: lg.ShippingRadius ?? "N/A",
    LogisticsPartners: lg.LogisticsPartners ?? [],
  };

  const rf = metadata.RiskFactors ?? {};

  const uiRiskFactors: UIRiskFactors = {
    Market: rf.Market ?? "N/A",
    Operational: rf.Operational ?? "N/A",
    Labor: rf.Labor ?? "N/A",
    Geographic: rf.Geographic ?? "N/A",
  };

  const uiRedFlags: string =
    metadata.ModelInputs.RedFlags ?? "No major red flags reported";

  return (
    <div className="min-h-screen w-screen bg-slate-50 pt-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top summary card */}
        <MillOverview
          name={metadata.Name ?? mill.company}
          yearCommissioned={uiYearCommissioned}
          plantCount={plantCount}
          annualCapacity={annualCapacity}
          co2Intensity={co2Intensity}
        />

        {/* AI summary of the mill */}
        <div className="grid grid-cols-1 gap-6 mt-6">
          <AISummary millName={metadata.Name ?? mill.company} />
        </div>

        {/* Plant locations (you could highlight representative_plant here) */}
        <div className="grid grid-cols-1 gap-6 mt-6">
          <PlantLocations
            plants={uiPlants}
            // highlightedPlantName={mill.representative_plant?.plant_name}
          />
        </div>

        {/* Production + sustainability */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <ProductionDetails
            steelmakingProcess={uiSteelmakingProcess}
            productionCapacity={uiProductionCapacity}
          />
          <SustainabilityMetrics
            carbonIntensity={uiCarbonIntensity}
            energyMix={uiEnergyMix}
          />
        </div>

        {/* Logistics + risk */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <LogisticsInfo logistics={uiLogistics} />
          <RiskFactors riskFactors={uiRiskFactors} redFlags={uiRedFlags} />
        </div>
      </div>
    </div>
  );
}
