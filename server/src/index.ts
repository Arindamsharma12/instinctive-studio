import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

/**
 * GET /api/incidents
 * Fetches incidents based on the 'resolved' query parameter.
 * Returns unresolved incidents by default or if the param is invalid.
 * @query {boolean} resolved - Filters incidents by their resolved status.
 */
app.get("/api/incidents", async (req: Request, res: Response) => {
  try {
    const isResolved = req.query.resolved === "true";

    const incidents = await prisma.incident.findMany({
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
  } catch (error) {
    console.error("Failed to fetch incidents:", error);
    res.status(500).json({ error: "Failed to fetch incidents" });
  }
});

/**
 * PATCH /api/incidents/:id/resolve
 * Toggles the 'resolved' status of a specific incident.
 * @param {string} id - The ID of the incident to update.
 */
app.patch("/api/incidents/:id/resolve", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const incident = await prisma.incident.findUnique({
      where: { id },
    });

    if (!incident) {
      return res.status(404).json({ error: "Incident not found" });
    }

    const updatedIncident = await prisma.incident.update({
      where: { id },
      data: { resolved: !incident.resolved },
      include: {
        camera: true,
      },
    });

    res.json(updatedIncident);
  } catch (error) {
    console.error(`Failed to resolve incident ${id}:`, error);
    res.status(500).json({ error: `Failed to resolve incident ${id}` });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
