import { Collection, MongoClient } from "mongodb";

export class DatabaseCollection {
    private _client: MongoClient;
    private _collection: Collection;

    public get collection(): Collection {
        return this._collection;
    }

    constructor(client: MongoClient, collection: Collection) {
        this._client = client;
        this._collection = collection;
    }

    close() {
        this._client.close();
    }

    findOne(query?: any): Promise<any> {
        return this._collection
            .findOne(query);
    }

    findAll(query?: any): Promise<any[]> {
        return this._collection
            .find(query)
            .toArray();
    }
}

const collectionHandler = async (client: MongoClient, databaseName: string, collectionName: string) => {
    const database = client.db(databaseName);
    const collection = database.collection(collectionName);
    const dbCollection = new DatabaseCollection(client, collection);
    return Promise.resolve(dbCollection);
}

const withCollectionCall = async (connectionString: string, databaseName: string, collectionName: string): Promise<any> => {
    const client = await MongoClient.connect(connectionString);
    return collectionHandler(client, databaseName, collectionName);
}

export const DatabaseUtility = {
    withDatabase: (connectionString: string, databaseName: string) => {
        return {
            withCollection: async (collectionName: string): Promise<any> => {
                return withCollectionCall(connectionString, databaseName, collectionName);
            }
        };
    }
}