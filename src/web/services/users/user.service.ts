import { ApplicationState } from "../../application-state";
import { DatabaseCollection, DatabaseUtility } from "../../core/database/database-utility";

const connectionString = ApplicationState.config.database.connectionString;
const databaseName = ApplicationState.config.database.databaseName;

const findAllHandler = (collection: DatabaseCollection) => {
    return collection
        .findAll()
        .then((users) => {
            collection.close();
            return Promise.resolve(users);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}

const dbCall = (handler: any): Promise<any> => {
    return DatabaseUtility
            .withDatabase(connectionString, databaseName)
            .withCollection("users")
            .then(handler)
            .catch((err) => {
                return Promise.reject(err);
            });
}

export default {
    findAll: (): Promise<any> => {
        return dbCall(findAllHandler);
    }
}