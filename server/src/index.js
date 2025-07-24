"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const PORT = process.env.PORT || 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
/**
 * GET /api/incidents
 * Fetches incidents based on the 'resolved' query parameter.
 * Returns unresolved incidents by default or if the param is invalid.
 * @query {boolean} resolved - Filters incidents by their resolved status.
 */
app.get("/api/incidents", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isResolved = req.query.resolved === "true";
        const incidents = yield prisma.incident.findMany({
            where: {
                resolved: isResolved,
            },
            orderBy: {
                tsStart: "desc",
            },
            include: {
                camera: true,
            },
        });
        res.json(incidents);
    }
    catch (error) {
        console.error("Failed to fetch incidents:", error);
        res.status(500).json({ error: "Failed to fetch incidents" });
    }
}));
/**
 * PATCH /api/incidents/:id/resolve
 * Toggles the 'resolved' status of a specific incident.
 * @param {string} id - The ID of the incident to update.
 */
app.patch("/api/incidents/:id/resolve", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const incident = yield prisma.incident.findUnique({
            where: { id },
        });
        if (!incident) {
            return res.status(404).json({ error: "Incident not found" });
        }
        const updatedIncident = yield prisma.incident.update({
            where: { id },
            data: { resolved: !incident.resolved },
            include: {
                camera: true,
            },
        });
        res.json(updatedIncident);
    }
    catch (error) {
        console.error(`Failed to resolve incident ${id}:`, error);
        res.status(500).json({ error: `Failed to resolve incident ${id}` });
    }
}));
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
