import IModel from './IModel.interface';
import * as mysql2 from "mysql2/promise";
import IAdapterOptions from './IAdapterOptions.interface';
import IServiceData from './IServiceData.interface';
import IApplicationResources, { Iservices } from './IApplicationResources.interface';

abstract class BaseService<ReturnModel extends IModel, AdapterOptions extends IAdapterOptions>{
    private _db: mysql2.Connection;
    private serviceInstances: Iservices;


    constructor(resources: IApplicationResources) {
        this._db = resources.databaseConnection;
        this.serviceInstances = resources.services;
    }

    protected get db(): mysql2.Connection {
        return this._db;
    }

    protected get services(): Iservices {
        return this.serviceInstances;
    }

    abstract tableName(): string;
    abstract sortFildName(): string;

    protected abstract adaptToModel(data: any, options: IAdapterOptions): Promise<ReturnModel>;

    public getAll(options: AdapterOptions): Promise<ReturnModel[]> {
        return new Promise<ReturnModel[]>((resolve, reject) => {
            const tableName = this.tableName();
            const sortFildName = this.sortFildName();

            const sql: string = `SELECT * FROM \`${tableName}\` ORDER BY \`${ sortFildName }\` asc;`;
            this.db.execute(sql)
                .then(async ([rows]) => {

                    if (rows === undefined) {
                        return resolve([]);
                    }
                    const items: ReturnModel[] = [];

                    for (const row of rows as mysql2.RowDataPacket[]) {
                        items.push(await this.adaptToModel(row, options));
                    }
                    resolve(items);
                }).catch(error => {
                    console.log(reject(error));
                });
        })
    }

    public getById(id: number, options: AdapterOptions): Promise<ReturnModel | null> {
        const tableName = this.tableName();

        return new Promise<ReturnModel>(
            (resolve, reject) => {
                const sql: string = `SELECT * FROM \`${tableName}\` WHERE ${tableName}_id = ?;`;
                this.db.execute(sql, [id])
                    .then(async ([rows]) => {

                        if (rows === undefined) {
                            return resolve(null);
                        }

                        if (Array.isArray(rows) && rows.length === 0) {
                            return resolve(null);
                        }

                        resolve(await this.adaptToModel(rows[0], options));
                    }).catch(error => {
                        console.log(reject(error));
                    });
            })
    }

    protected async getAllByFieldNameAndValue(fieldName: string, value: any, options: AdapterOptions): Promise<ReturnModel[]> {

        const tableName = this.tableName();

        return new Promise<ReturnModel[]>(
            (resolve, reject) => {
                const sql: string = `SELECT * FROM \`${tableName}\` WHERE ${fieldName} = ?;`;
                this.db.execute(sql, [value])
                    .then(async ([rows]) => {

                        if (rows === undefined) {
                            return resolve([]);
                        }

                        const items: ReturnModel[] = [];

                        for (const row of rows as mysql2.RowDataPacket[]) {
                            items.push(await this.adaptToModel(row, options))
                        }

                        resolve(items);
                    }).catch(error => {
                        console.log(reject(error));
                    });
            }
        )
    }

    protected async getAllFromTableByFieldNameAndValue<OwnReturnType>(tableName: string, fieldName: string, value: any): Promise<OwnReturnType[]> {
        return new Promise((resolve, reject) => {
            const sql: string = `SELECT * FROM \`${tableName}\` WHERE ${fieldName} = ?;`;
            this.db.execute(sql, [value])
                .then(async ([rows]) => {

                    if (rows === undefined) {
                        return resolve([]);
                    }

                    const items: OwnReturnType[] = [];

                    for (const row of rows as mysql2.RowDataPacket[]) {
                        items.push(row as OwnReturnType)
                    }

                    resolve(items);
                }).catch(error => {
                    console.log(reject(error));
                });
        })
    }
    

    protected async baseAdd(data: IServiceData, options: AdapterOptions): Promise<ReturnModel> {

        const tableName = this.tableName();

        return new Promise((resolve, reject) => {

            const properties = Object.getOwnPropertyNames(data);
            const sqlPairs = properties.map(property => "`" + property + "`" + "=?").join(", ");
            const values = properties.map(property => data[property]);

            const sql: string = `INSERT INTO \`${tableName}\` SET ${sqlPairs} ;`;

            this.db.execute(sql, values)
                .then(async result => {
                    const info: any = result;
                    const newItemId = +(info[0]?.insertId);
                    const newItem: ReturnModel | null = await this.getById(newItemId, options);

                    if (newItem === null) {
                        return reject({ message: 'Could not add into the ' + tableName + 'table!', });
                    }

                    resolve(newItem);
                })
                .catch(error => {
                    if (error.code === 'ER_DUP_ENTRY') {
                    error.message = "This item already exists!";
                    reject(error);
                    
                    }
                    console.log(error);
                    reject(error);
                })
        })
    }

    protected async baseEditById(id: number, data: IServiceData, options: AdapterOptions): Promise<ReturnModel> {

        const tableName = this.tableName();

        return new Promise((resolve, reject) => {

            const properties = Object.getOwnPropertyNames(data);
            const sqlPairs = properties.map(property => "`" + property + "`" + "=?").join(", ");
            const values = properties.map(property => data[property]);
            values.push(id); //Zbog WHERE uslova

            const sql: string = `UPDATE \`${tableName}\` SET ${sqlPairs} WHERE ${tableName}_id = ?;`;

            this.db.execute(sql, values)
                .then(async result => {
                    const info: any = result;

                    if (info[0]?.affectedRows === 0) {
                        return reject({ message: "Could not change any items in the " + tableName + " table!" })
                    }

                    const item: ReturnModel | null = await this.getById(id, options);

                    if (item === null) {
                        return reject({ message: 'Could not find this item in ' + tableName + 'table!', });
                    }

                    resolve(item);
                })
                .catch(error => {
                    if (error.code === 'ER_DUP_ENTRY') {
                    error.message = "This item already exists!";
                    reject(error);
                    }
                    reject(error);
                })

        });
    }

    protected async baseDelete(id:number): Promise<boolean>{
        const tableName = this.tableName();

        return new Promise((resolve, reject) => {

            const sql: string = `DELETE FROM \`${tableName}\` WHERE ${tableName}_id = ?;`;

            this.db.execute(sql, [id])
                .then(async result => {
                    const info: any = result;

                    if (info[0]?.affectedRows === 0) {
                        return reject({ message: "Could not delete this item in the " + tableName + " table!" })
                    }

                    resolve(true);
                })
                .catch(error => {
                    reject(error);
                })

        });

    }
}

export default BaseService;