"use client";

import Image from "next/image";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Incident } from "@/lib/types";
import { ReactNode, useState } from "react";
import { Store, Clock } from "lucide-react";

interface IncidentItemProps {
  incident: Incident;
  icon: ReactNode;
  onResolve: (id: number) => void;
}

export function IncidentItem({ incident, icon, onResolve }: IncidentItemProps) {
  const [isResolving, setIsResolving] = useState(false);

  const handleResolveClick = () => {
    setIsResolving(true);
    setTimeout(() => {
      onResolve(incident.id);
    }, 300);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const startTime = new Date(incident.tsStart).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const endTime = new Date(incident.tsEnd).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const date = formatDate(incident.tsStart);

  return (
    <Card
      className={`bg-[#1E293B] border-slate-700 p-3 flex flex-col sm:flex-row gap-4 sm:items-center transition-opacity duration-300 ${
        isResolving ? "opacity-0" : "opacity-100"
      }`}
    >
      <Image
        src={incident.thumbnailUrl}
        alt="Incident thumbnail"
        width={160}
        height={90}
        className="rounded-md object-cover w-full h-32 sm:w-[80px] sm:h-[50px] flex-shrink-0"
      />
      <div className="w-full flex-1 space-y-1.5">
        <div className="flex items-center gap-2">
          {icon}
          <p className="font-semibold text-sm text-white">{incident.type}</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Store className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>{incident.camera.location} Camera A</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>
            {startTime} - {endTime} on {date}
          </span>
        </div>
      </div>
      <Button
        variant="ghost"
        className="text-yellow-500 hover:bg-slate-700/50 hover:text-yellow-400 p-2 h-auto font-semibold self-end sm:self-center"
        onClick={handleResolveClick}
      >
        Resolve ›
      </Button>
    </Card>
  );
}
