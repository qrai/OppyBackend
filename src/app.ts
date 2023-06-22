require('dotenv').config();
import "reflect-metadata";

import { router, publicProcedure } from "./trpc";
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { z } from "zod";
import { database } from "./db/db";
import { Dataset } from "./db/models/Dataset.model";

const appRouter = router({
	datasetList: publicProcedure
		.input(z.string())
		.query(async ({ input }) => {
			const db = await database.get(Dataset);

			return await db.find() as Dataset[];
		}),
	
	datasetCreate: publicProcedure
		.input(z.object({
			title: z.string(),
			file: z.string()
		}))
		.mutation(async ({ input }) => {
			const db = await database.get(Dataset);

			return await db.create(input) as Dataset;
		}),
});
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
	router: appRouter,
});
   
server.listen(3000);

console.log('hi')