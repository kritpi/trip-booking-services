import express, { Request, Response } from "express";
import setUpRouter from "./routes/index";
import cors from "cors";
import cron from "node-cron";
import { prisma } from "./utils/prismaClient";
import { differenceInDays } from 'date-fns';

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const logMessage = (): void => {
  console.log("Cron job executed at:", new Date().toLocaleString());
};

const fetchPendingTrips = async () => {
  try {
    const pendingTrips = await prisma.$queryRaw`
      SELECT 
        t.*,
        r.create_at
      FROM "Trip" AS t 
      JOIN "Requirement" AS r ON t.requirement_id = r.id 
      WHERE t.status IN ('Wait for confirm', 'Wait for payment')
    `;
    return pendingTrips;
  } catch (error) {
    console.error('Error fetching pending trips:', error);
    throw error;
  }
};

cron.schedule("0 0 * * *", async () => {
  try {
    logMessage();
    const pendingTrips = await fetchPendingTrips();
    
    for (const trip of pendingTrips as any[]) {
      const createdAt = new Date(trip.create_at);
      const daysPending = differenceInDays(new Date(), createdAt);
      
      if (daysPending > 10) {
        await prisma.trip.update({
          where: { id: trip.id },
          data: {
            status: 'Canceled',
          }
        });
        
        console.log(`Trip ${trip.id} expired after ${daysPending} days`);
      }
    }
    console.log('Cron job completed');
    
  } catch (error) {
    console.error('Cron job failed:', error);
  }
});

app.use(express.json());
app.use(cors(corsOptions));

setUpRouter(app);

app.listen(port, () => {
  console.log(`Running On Port ${port}`);
});

export default app;
