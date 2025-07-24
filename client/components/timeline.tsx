"use client";
import React, { useState } from "react";
import {
  Incident,
  InteractiveTimeline,
} from "./interactive-timeline/InteractiveTimeline";

const mockCameras = ["Camera-01", "Camera-02", "Camera-03"];
const now = new Date();
const mockIncidents: Incident[] = [
  {
    id: "1",
    cameraName: "Camera-01",
    type: "Unauthorised Access",
    timestamp: new Date(now.setHours(2, 30)),
  },
  {
    id: "2",
    cameraName: "Camera-01",
    type: "Face Recognised",
    timestamp: new Date(now.setHours(6, 45)),
  },
  {
    id: "3",
    cameraName: "Camera-01",
    type: "Gun Threat",
    timestamp: new Date(now.setHours(15, 10)),
  },
  {
    id: "4",
    cameraName: "Camera-02",
    type: "Unauthorised Access",
    timestamp: new Date(now.setHours(3, 0)),
  },
  {
    id: "5",
    cameraName: "Camera-03",
    type: "Traffic congestion",
    timestamp: new Date(now.setHours(5, 20)),
  },
];

const Timeline = () => {
  const [videoTime, setVideoTime] = useState(11557); // Example: ~03:12:37

  const handleTimeChange = (newTime: number) => {
    // Here you would typically seek a video player
    // For now, we just update the state
    console.log("New time selected (seconds):", newTime);
    setVideoTime(newTime);
  };
  return (
    <div>
      <InteractiveTimeline
        incidents={mockIncidents}
        cameras={mockCameras}
        currentTime={videoTime}
        onTimeChange={handleTimeChange}
      />
    </div>
  );
};

export default Timeline;
