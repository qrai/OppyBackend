import { DataSource, EntityTarget, ObjectLiteral } from "typeorm";

// Import Entities:
import { Dataset } from "./models/Dataset.model";

export const database = new class {
	protected _source: DataSource;

	constructor() {
		this._source = new DataSource({
			type: process.env.DB_TYPE as 'mysql' ?? 'mysql',
			host: process.env.DB_HOST,
			port: parseInt(process.env.DB_PORT as string),
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			entities: [
				Dataset
			],
			synchronize: true,
		});
	}

	public async init() {
		try {
			await this._source.initialize();
		}
		catch(e: any) {
			if(!process.env.DB_HOST) {
				throw new Error(`Failed to initialize database. Problem is possibly because of .env variables (err: ${e.stack})`);
			}
			else {
				throw new Error(`Failed to initialize database (err: ${e.stack})`);
			}
		}
	}

	public async get(entity: EntityTarget<ObjectLiteral>) {
		if(!this._source.isInitialized) await this.init();

		return this.source.getRepository(entity);
	}

	get source() {
		return this._source;
	}
}