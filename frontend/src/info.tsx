import { MillOverview } from "./components/MillOverview";
import { AISummary } from "./components/AISummary";
import { PlantLocations } from "./components/PlantLocations";
import { ProductionDetails } from "./components/ProductionDetails";
import { SustainabilityMetrics } from "./components/SustainabilityMetrics";
import { LogisticsInfo } from "./components/LogisticsInfo";
import { RiskFactors } from "./components/RiskFactors";

const steelMillData = {
  name: "Cleveland Cliffs",
  Plants: {
    "Indiana Harbor Works": {
      Location: "East Chicago, Indiana, USA",
      Latitude: 41.669553,
      Longitude: -87.438429,
      "Google Maps": "https://maps.google.com/?q=41.669553,-87.438429",
      "Year commissioned": 1901,
    },
    "Cleveland Works": {
      Location: "Cleveland, Ohio, USA",
      Latitude: 41.464041,
      Longitude: -81.676499,
      "Google Maps": "https://maps.google.com/?q=41.464041,-81.676499",
      "Year commissioned": 1913,
    },
    "Burns Harbor Works": {
      Location: "Portage (Burns Harbor), Indiana, USA",
      Latitude: 41.631221,
      Longitude: -87.143846,
      "Google Maps": "https://maps.google.com/?q=41.631221,-87.143846",
      "Year commissioned": 1964,
    },
    "Cleveland-Cliffs Dearborn Works": {
      Location: "Dearborn, Michigan, USA",
      Latitude: 42.3049669,
      Longitude: -83.1578118,
      "Google Maps": "https://maps.google.com/?q=42.3049669,-83.1578118",
      "Year commissioned": 1920,
    },
    "Middletown Works": {
      Location: "Middleton, Ohio, USA",
      Latitude: 39.4935902,
      Longitude: -84.3937199,
      "Google Maps": "https://maps.google.com/?q=39.4935902,-84.3937199",
      "Year commissioned": 1901,
    },
  },
  YearCommissioned: "1847",
  SteelmakingProcess: {
    PrimaryRoute: "Blast Furnace – Basic Oxygen Furnace (EAF idled)",
    CokeOvens: "Yes (integrated BF plant)",
    SinterPlants: "Yes (integrated BF plant)",
    Pelletizers: "No (uses own pellet plants off-site)",
    ScrapShare: "EAF feedstock ~75% scrap",
    DRIShare: "0%",
    HotMetalShare: "100%",
    EAF_MVA: null,
    BF_Capacity: "4200 kt/year",
    FurnaceSize:
      "BF7: 4,163 m³ (capacity ~4.2 Mt/yr); BOF: 250 t (x2), 185 t (x2)",
    RollingMill:
      '80" hot-strip mill, pickling, 5-stand tandem cold mill, temper mill, hot-dip galvanizing line',
  },
  CarbonIntensity: {
    CO2_per_ton: 1.54,
    Scope1: "N/A",
    Scope2: "N/A",
    Scope3: "N/A",
  },
  ProductionCapacity: {
    AnnualCrudeSteel_Mt: 6.8,
    RollingCapacity: "Hot strip and cold rolling (~ multi-million t/yr)",
    UtilizationRate: "N/A",
    FeedstockSources:
      "Iron ore pellets (own mines), HBI (Toledo), metallurgical coal (coke ovens), scrap (FPT)",
  },
  Logistics: {
    OutboundModes: ["Rail", "Barge"],
    OnsiteRail: "Yes",
    Highways: "Near I-90 (Indiana Toll Road)",
    WaterAccess: "Lake Michigan via Indiana Harbor Ship Canal",
    NearestPort: "Port of Indiana (Burns Harbor)",
    ShippingRadius: "Midwest/Great Lakes region",
    LogisticsPartners: ["CSX", "Norfolk Southern", "CN"],
  },
  EnergyMix_Sustainability: {
    Electricity: "Regional grid (PJM/MISO), some renewable PPAs",
    GreenSteelInvestments: "Hydrogen-ready BF pipeline",
    CarbonCapture: "No CCS deployed (pilot H2 injection)",
    EmissionsTargets: "Reduce Scope1+2 intensity 30% by 2035; net-zero by 2050",
    EPA_Violations:
      "OSHA safety fines (2020); no major EPA air violations found",
  },
  RiskFactors: {
    Market: "Automotive demand sensitivity, commodity price swings",
    Operational: "Blast furnace outages, aging equipment",
    Labor: "Unionized workforce (United Steelworkers)",
    Geographic: "Harsh winters (Lake transport), water availability",
  },
  ModelInputs: {
    CO2Intensity: 1.54,
    LogisticsMode: "Rail",
    RedFlags: "High BF reliance; large CO2 emitter",
  },
};

export default function Info() {
  return (
    <div className="min-h-screen w-screen bg-slate-50 pt-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MillOverview
          name={steelMillData.name}
          yearCommissioned={steelMillData.YearCommissioned}
          plantCount={Object.keys(steelMillData.Plants).length}
          annualCapacity={steelMillData.ProductionCapacity.AnnualCrudeSteel_Mt}
          co2Intensity={steelMillData.CarbonIntensity.CO2_per_ton}
        />

        <div className="grid grid-cols-1 gap-6 mt-6">
          <AISummary millName={steelMillData.name} />
        </div>

        <div className="grid grid-cols-1 gap-6 mt-6">
          <PlantLocations plants={steelMillData.Plants} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <ProductionDetails
            steelmakingProcess={steelMillData.SteelmakingProcess}
            productionCapacity={steelMillData.ProductionCapacity}
          />
          <SustainabilityMetrics
            carbonIntensity={steelMillData.CarbonIntensity}
            energyMix={steelMillData.EnergyMix_Sustainability}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <LogisticsInfo logistics={steelMillData.Logistics} />
          <RiskFactors
            riskFactors={steelMillData.RiskFactors}
            redFlags={steelMillData.ModelInputs.RedFlags}
          />
        </div>
      </div>
    </div>
  );
}
