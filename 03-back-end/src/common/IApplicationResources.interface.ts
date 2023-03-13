import * as mysql2 from 'mysql2/promise';

interface IApplicationResources {
    databaseConnection: mysql2.Connection;
}

export default IApplicationResources;