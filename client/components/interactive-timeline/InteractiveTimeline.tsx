"use client";
import React, { useState, useRef, useCallback } from "react";
import "./InteractiveTimeline.css";

// --- Type Definitions ---
export interface Incident {
  id: string;
  timestamp: Date;
  type: string;
  cameraName: string;
}

interface InteractiveTimelineProps {
  incidents: Incident[];
  cameras: string[];
  currentTime: number; // Current time in seconds from midnight (0-86400)
  onTimeChange: (timeInSeconds: number) => void;
}

// --- Helper Functions ---
const dateToSeconds = (date: Date): number => {
  return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
};

const secondsToTimeString = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(
    s
  ).padStart(2, "0")}h`;
};

// --- Ruler Sub-component ---
const TimelineRuler = React.memo(function TimelineRuler() {
  // Creates an array [1, 2, ..., 24]
  const hours = Array.from({ length: 24 }, (_, i) => i + 1);
  return (
    <div className="timeline-ruler">
      {hours.map((hour) => (
        <div key={hour} className="timeline-hour-marker">
          <span className="timeline-hour-label">
            {String(hour).padStart(2, "0")}:00
          </span>
        </div>
      ))}
    </div>
  );
});

// --- Main Timeline Component ---
export const InteractiveTimeline: React.FC<InteractiveTimelineProps> = ({
  incidents,
  cameras,
  currentTime,
  onTimeChange,
}) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleTimeUpdate = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      // Calculate mouse position relative to the timeline element
      const x = e.clientX - rect.left;
      const width = rect.width;
      // Ensure the position is within the bounds of the timeline
      const clampedX = Math.max(0, Math.min(x, width));
      // Convert pixel position to seconds (0-86400)
      const timeInSeconds = (clampedX / width) * 86400;
      onTimeChange(timeInSeconds);
    },
    [onTimeChange]
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleTimeUpdate(e);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleTimeUpdate(e);
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Calculate scrubber position as a percentage
  const scrubberPositionPercent = (currentTime / 86400) * 100;

  // Group incidents by camera for easy rendering
  const groupedIncidents = incidents.reduce((acc, incident) => {
    (acc[incident.cameraName] = acc[incident.cameraName] || []).push(incident);
    return acc;
  }, {} as Record<string, Incident[]>);

  return (
    <div className="timeline-container">
      <div
        className="timeline-interactive-area"
        ref={timelineRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        <TimelineRuler />

        {/* Camera Rows and Incident Markers */}
        <div className="timeline-body">
          {cameras.map((cameraName) => (
            <div key={cameraName} className="timeline-camera-row">
              <div className="camera-label">{cameraName}</div>
              <div className="incident-track">
                {(groupedIncidents[cameraName] || []).map((incident) => {
                  const incidentPositionPercent =
                    (dateToSeconds(incident.timestamp) / 86400) * 100;
                  return (
                    <div
                      key={incident.id}
                      className={`incident-marker ${incident.type
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      style={{ left: `${incidentPositionPercent}%` }}
                      title={`${
                        incident.type
                      } at ${incident.timestamp.toLocaleTimeString()}`}
                    >
                      {/* You can add an icon here */}
                      {incident.type}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Draggable Scrubber */}
        <div
          className="timeline-scrubber"
          style={{ left: `${scrubberPositionPercent}%` }}
        >
          <div className="scrubber-time">
            {secondsToTimeString(currentTime)}
          </div>
          <div className="scrubber-line" />
        </div>
      </div>
    </div>
  );
};
