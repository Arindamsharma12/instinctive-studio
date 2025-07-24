"use strict";
// prisma/seed.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Helper to get a random element from an array
const getRandomElement = (arr) => {
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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Start seeding...");
        // 1. Create Cameras
        const camera1 = yield prisma.camera.create({
            data: { name: "Lobby Cam", location: "Main Entrance" },
        });
        const camera2 = yield prisma.camera.create({
            data: { name: "Floor A Cam", location: "Shop Floor A" },
        });
        const camera3 = yield prisma.camera.create({
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
            yield prisma.incident.create({
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
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
