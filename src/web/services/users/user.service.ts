import { ApplicationState } from "../../application-state";
import { DatabaseCollection, DatabaseUtility } from "../../core/database/database-utility";

const connectionString = ApplicationState.config.database.connectionString;
const databaseName = ApplicationState.config.database.databaseName;

const findAllHandler = (collection: DatabaseCollection): Promise<any> => {
    return collection.findAll();
}

const dbCall = async (handler: any): Promise<any> => {
    const collection = await DatabaseUtility
        .withDatabase(connectionString, databaseName)
        .withCollection("users");
    
    return handler(collection);
}

export default {
    findAll: (): Promise<any> => {
        return dbCall(findAllHandler);
    }
}