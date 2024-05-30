import { SQLResultSet } from 'expo-sqlite';

declare module 'expo-sqlite' {
  interface SQLiteDatabase {
    transaction: (callback: (tx: SQLTransaction) => void) => void;
  }

  interface SQLTransaction {
    executeSql: (
      sqlStatement: string,
      args: any[],
      successCallback: (tx: SQLTransaction, resultSet: SQLResultSet) => void,
      errorCallback?: (tx: SQLTransaction, error: Error) => void
    ) => void;
  }
}
