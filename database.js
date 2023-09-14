import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('little_lemon');


export async function dropTable() {
    return new Promise((resolve, reject) => {
        console.log("dropping table")
        db.transaction(
            (tx) => {
                tx.executeSql(
                    'drop table menuitems;'
                );
            },
            reject,
            resolve
        );
    });
}

export async function createTable() {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    'create table if not exists menuitems (id integer primary key not null, name text, price text, description text, image text, category text);'
                );
            },
            reject,
            resolve
        );
    });
}

export async function getMenuItems() {
    return new Promise((resolve) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM menuitems', [], (_, { rows }) => {
                const menuItems = rows._array.map((row) => ({
                    id: row.id,
                    name: row.name,
                    price: row.price,
                    description: row.description,
                    image: row.image, // Ensure that row.image remains a Blob object
                    category: row.category,
                }));
                resolve(menuItems);
            });
        });
    });
}

export function saveMenuItems(menuItems) {
    db.transaction((tx) => {
        menuItems.forEach((item) => {
            tx.executeSql(
                'INSERT INTO menuitems (name, price, description, image, category) VALUES (?, ?, ?, ?, ?);',
                [item.name, item.price, item.description, item.image, item.category],
                (_, results) => {
                    if (results.rowsAffected > 0) {
                        console.log(`Inserted item: ${item.name}`);
                    } else {
                        console.log(`Failed to insert item: ${item.name}`);
                    }
                },
                (_, error) => {
                    console.log(`Error inserting item: ${error.message}`);
                }
            );
        });
    });
}



