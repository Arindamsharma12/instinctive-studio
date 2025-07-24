// prisma/seed.ts

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Helper to get a random element from an array
const getRandomElement = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Helper to generate random timestamps within the last 24 hours
const getRandomTimestamps = () => {
  const end = new Date();
  const start = new Date(end.getTime() - Math.random() * 24 * 60 * 60 * 1000);
  const duration = Math.random() * 5 * 60 * 1000; // up to 5 minutes duration
  const tsEnd = new Date(start.getTime() + duration);
  return { tsStart: start, tsEnd };
};

async function main() {
  console.log("Start seeding...");

  // 1. Create Cameras
  const camera1 = await prisma.camera.create({
    data: { name: "Lobby Cam", location: "Main Entrance" },
  });
  const camera2 = await prisma.camera.create({
    data: { name: "Floor A Cam", location: "Shop Floor A" },
  });
  const camera3 = await prisma.camera.create({
    data: { name: "Vault Cam", location: "Vault Door" },
  });
  const allCameras = [camera1, camera2, camera3];
  console.log("Created 3 cameras.");

  // 2. Create Incidents
  const incidentTypes = [
    "Unauthorised Access",
    "Gun Threat",
    "Face Recognised",
    "Fire Detected",
  ];
  const placeholderThumbnails = [
    "https://ik.imagekit.io/jehj2dxghb/image1?updatedAt=1753203180777",
    "https://ik.imagekit.io/jehj2dxghb/image2?updatedAt=1753203204769",
    "https://ik.imagekit.io/jehj2dxghb/image3?updatedAt=1753203236127",
  ];

  for (let i = 0; i < 15; i++) {
    const randomCamera = getRandomElement(allCameras);
    const randomType = getRandomElement(incidentTypes);
    const randomThumbnail = getRandomElement(placeholderThumbnails);
    const { tsStart, tsEnd } = getRandomTimestamps();

    await prisma.incident.create({
      data: {
        cameraId: randomCamera.id,
        type: randomType,
        tsStart,
        tsEnd,
        thumbnailUrl: randomThumbnail,
        resolved: Math.random() > 0.8, // Make ~20% of incidents resolved
      },
    });
  }
  console.log("Created 15 incidents.");

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
