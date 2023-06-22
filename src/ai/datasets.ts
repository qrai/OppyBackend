import { OpenAI } from "langchain/llms/openai";
import { SqlDatabase } from "langchain/sql_db";
import { createSqlAgent, SqlToolkit } from "langchain/agents";
import { DataSource } from "typeorm";

/** This example uses Chinook database, which is a sample database available for SQL Server, Oracle, MySQL, etc.
 * To set it up follow the instructions on https://database.guide/2-sample-databases-sqlite/, placing the .db file
 * in the examples folder.
 */
export const run = async () => {
    const appDataSource = new DataSource({
        type: "mysql",
		host: "141.8.192.26",
    	port: 3306,
	    username: "a0514069_study",
    	password: "CzYEhKoP",
	    database: "a0514069_study",
    });

    const db = await SqlDatabase.fromDataSourceParams({
        appDataSource,
    });
    const model = new OpenAI({
		openAIApiKey: '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',
		temperature: 0
	});
    const toolkit = new SqlToolkit(db, model);
    const executor = createSqlAgent(model, toolkit);

    const input = `what submission does have user with email sergeikab77@gmail.com?`;

    console.log(`Executing with input "${input}"...`);

    const result = await executor.call({ input });

    console.log(`Got output ${result.output}`);

    console.log(`Got intermediate steps ${JSON.stringify(result.intermediateSteps, null, 2)}`);

    await appDataSource.destroy();
};
