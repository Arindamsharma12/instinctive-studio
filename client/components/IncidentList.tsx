"use client";

import { useState } from "react";
import {
  Bell,
  ShieldAlert,
  Skull,
  UserCheck,
  AlertTriangle,
  Plus,
  Users,
  CheckCircle2,
} from "lucide-react";
import { IncidentItem } from "./IncidentItem";
import { Incident } from "@/lib/types";

interface IncidentListProps {
  initialIncidents: Incident[];
}

const incidentTypeIcons = {
  "Unauthorised Access": <ShieldAlert className="w-5 h-5 text-yellow-400" />,
  "Gun Threat": <Skull className="w-5 h-5 text-red-500" />,
  "Face Recognised": <UserCheck className="w-5 h-5 text-blue-400" />,
  "Multiple Events": <Bell className="w-5 h-5 text-purple-400" />,
};

export function IncidentList({ initialIncidents }: IncidentListProps) {
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [resolved, setResolved] = useState(false);

  const handleResolve = async () => {
    setResolved(!resolved);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/incidents?resolved=${resolved}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch incidents");
    }
    const data = await res.json();
    setIncidents(data);
  };

  const updateResolved = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/incidents/${id}/resolve`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to resolve the incident");
      }

      setIncidents((currentIncidents) =>
        currentIncidents.filter((incident) => incident.id.toString() !== id)
      );
    } catch (error) {
      console.error("Error resolving incident:", error);
    }
  };

  const unresolvedCount = incidents.length;

  return (
    <div className="bg-[#0F172A] p-2 sm:p-4 rounded-lg max-h-[60vh] flex flex-col text-white">
      {/* Responsive Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4 flex-shrink-0">
        {incidents[0]?.resolved ? (
          <h2 className="font-bold text-lg sm:text-xl flex items-center gap-3 self-start">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            <span>{unresolvedCount} Resolved Incidents</span>
          </h2>
        ) : (
          <h2 className="font-bold text-lg sm:text-xl flex items-center gap-3 self-start">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <span>{unresolvedCount} Unresolved Incidents</span>
          </h2>
        )}

        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 self-start md:self-center">
          <div className="flex items-center">
            <div className="bg-orange-500 rounded-full p-1 w-7 h-7 flex items-center justify-center border-2 border-[#0F172A] z-20">
              <Plus className="w-4 h-4 text-white" />
            </div>
            <div className="bg-blue-500 rounded-full p-1 w-7 h-7 flex items-center justify-center border-2 border-[#0F172A] -ml-2 z-10">
              <Users className="w-4 h-4 text-white" />
            </div>
          </div>
          {!incidents[0]?.resolved ? (
            <div
              className="flex items-center cursor-pointer gap-2 text-sm bg-green-950/70 text-green-400 px-3 py-1.5 rounded-md border border-green-800/60"
              onClick={handleResolve}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Resolved incidents</span>
            </div>
          ) : (
            <div
              className="flex items-center cursor-pointer gap-2 text-sm bg-red-950/70 text-red-400 px-3 py-1.5 rounded-md border border-red-800/60"
              onClick={handleResolve}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Unresolved incidents</span>
            </div>
          )}
        </div>
      </div>

      {/* Scrolling container */}
      <div className="space-y-3 overflow-y-auto flex-1 pr-1 sm:pr-2">
        {incidents.map((incident) => (
          <IncidentItem
            key={incident.id}
            incident={incident}
            icon={
              incidentTypeIcons[incident.type] || <Bell className="w-5 h-5" />
            }
            onResolve={() => updateResolved(incident.id.toString())}
          />
        ))}
      </div>
    </div>
  );
}
