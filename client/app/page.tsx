import { IncidentList } from "@/components/IncidentList";
import { IncidentPlayer } from "@/components/IncidentPlayer";
import Timeline from "@/components/timeline";
import { Incident } from "@/lib/types";
import { Suspense } from "react";

async function getIncidents(): Promise<Incident[]> {
  // IMPORTANT: Replace with your actual API endpoint URL
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/incidents?resolved=false`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch incidents");
  }
  return res.json();
}

export default async function Home() {
  const incidents = await getIncidents();
  console.log(incidents.length);
  return (
    <div className="bg-[#0B122A] text-white min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-4 border-b border-slate-700">
        <h1 className="text-xl font-bold">MANDLACX</h1>
        <div className="flex items-center gap-4">
          <p>Mohammed Ajhas</p>
          <div className="w-8 h-8 rounded-full bg-slate-500"></div>
        </div>
      </header>
      <main className="flex flex-1 flex-col md:flex-row p-4 gap-4">
        <div className="md:w-1/2">
          <IncidentPlayer />
        </div>
        <div className="md:w-1/2">
          <Suspense fallback={<p>Loading incidents...</p>}>
            <IncidentList initialIncidents={incidents} />
          </Suspense>
        </div>
      </main>
      <div className="py-2">
        <Timeline />
      </div>
    </div>
  );
}
