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
interface SQLResultSet {
  insertId: number;
  rowsAffected: number;
  rows: SQLResultSetRowList;
}

interface SQLResultSetRowList {
  length: number;
  item(index: number): any;
}

interface SQLiteCustom {
  openDatabase: (name: string) => SQLiteDatabase;
}

declare const SQLite: SQLiteCustom;

const db = SQLite.openDatabase('tasks.db');

const setupDatabase = (): void => {
  db.transaction((tx: SQLTransaction) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed INTEGER)',
      [],
      () => {}, // Callback de sucesso vazio
      (_, error) => console.error('Error creating table:', error) // Callback de erro
    );
  });
};

const addTask = (title: string, completed: boolean): Promise<number> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: SQLTransaction) => {
      tx.executeSql(
        'INSERT INTO tasks (title, completed) VALUES (?, ?)',
        [title, completed ? 1 : 0],
        (_, result) => resolve(result.insertId),
        (_, error) => reject(error)
      );
    });
  });
};

const getTasks = (): Promise<Task[]> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: SQLTransaction) => {
      tx.executeSql(
        'SELECT * FROM tasks',
        [],
        (_, error) => reject(error)
      );
    });
  });
};

const markTaskAsCompleted = (taskId: number): Promise<number> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: SQLTransaction) => {
      tx.executeSql(
        'UPDATE tasks SET completed = 1 WHERE id = ?',
        [taskId],
        (_, result) => resolve(result.rowsAffected),
        (_, error) => reject(error)
      );
    });
  });
};

export { setupDatabase, addTask, getTasks, markTaskAsCompleted };

interface Task {
  id: number;
  title: string;
  completed: boolean;
}
