import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Sparkles, CheckCircle2, TrendingUp } from "lucide-react";

interface AISummaryProps {
  millName: string;
  scores?: {
    cost?: number;
    co2?: number;
    risk?: number;
    logistics?: number;
  };
  metadata?: any;
}

interface Section {
  title: string;
  description: string;
}

interface AISummaryResponse {
  summary?: string;
  sections?: {
    location?: Section;
    scale?: Section;
    future?: Section;
  };
  tags?: string[];
}

// Fallback content if AI doesn't provide structured fields
const DEFAULT_SECTIONS: AISummaryResponse["sections"] = {
  location: {
    title: "Strategic Location",
    description:
      "Strong regional footprint with access to key transport corridors.",
  },
  scale: {
    title: "Operational Scale",
    description:
      "Large, diversified production suitable for multi-year contracts.",
  },
  future: {
    title: "Future Ready",
    description:
      "Investing in cleaner processes and long-term decarbonization.",
  },
};

const DEFAULT_TAGS = [
  "AI-optimized recommendation",
  "Transparent trade-offs",
  "Logistics-aware routing",
];

export function AISummary({ millName, scores, metadata }: AISummaryProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [sections, setSections] = useState<
    AISummaryResponse["sections"] | null
  >(null);
  const [tags, setTags] = useState<string[]>(DEFAULT_TAGS);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSummary() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/ai/summary`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              mill_name: millName,
              scores,
              metadata,
            }),
          }
        );

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.detail || `HTTP ${res.status}`);
        }

        const data: AISummaryResponse | { summary?: string } = await res.json();

        // summary (works whether backend returns string-only or structured)
        setSummary(data.summary ?? null);

        // sections (fallback to defaults if missing)
        if ("sections" in data && data.sections) {
          setSections(data.sections);
        } else {
          setSections(null);
        }

        // tags (fallback to defaults if missing/empty)
        if (
          "tags" in data &&
          Array.isArray(data.tags) &&
          data.tags.length > 0
        ) {
          setTags(data.tags);
        } else {
          setTags(DEFAULT_TAGS);
        }
      } catch (err: any) {
        console.error("Error fetching AI summary:", err);
        setError("We couldn’t generate an AI summary right now.");
        setSummary(null);
        setSections(null);
        setTags(DEFAULT_TAGS);
      } finally {
        setLoading(false);
      }
    }

    if (millName) {
      fetchSummary();
    }
  }, [millName, scores, metadata]);

  // Resolve what to show in the three feature boxes
  const location = sections?.location ?? DEFAULT_SECTIONS?.location!;
  const scale = sections?.scale ?? DEFAULT_SECTIONS?.scale!;
  const future = sections?.future ?? DEFAULT_SECTIONS?.future!;

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
              Based on your criteria, here&apos;s why we recommend {millName}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* MAIN SUMMARY AREA */}
        {loading && (
          <p className="text-slate-600 animate-pulse">Generating AI summary…</p>
        )}

        {error && !loading && <p className="text-red-600 text-sm">{error}</p>}

        {!loading && !error && summary && (
          <p className="text-slate-700 leading-relaxed whitespace-pre-line">
            {summary}
          </p>
        )}

        {/* FEATURE BOXES – now AI-aware */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-green-200">
            <CheckCircle2 className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-green-900 mb-1">{location.title}</div>
              <p className="text-slate-600">{location.description}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-blue-200">
            <CheckCircle2 className="size-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-blue-900 mb-1">{scale.title}</div>
              <p className="text-slate-600">{scale.description}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-purple-200">
            <CheckCircle2 className="size-5 text-purple-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-purple-900 mb-1">{future.title}</div>
              <p className="text-slate-600">{future.description}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
