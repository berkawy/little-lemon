// File responsible for database queries

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('little_lemon');

// Was used for testing only
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

// Used to create a table to store menu items
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

// Used to get menu items from the database
export async function getMenuItems() {
    return new Promise((resolve) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM menuitems', [], (_, { rows }) => {
                const menuItems = rows._array.map((row) => ({
                    id: row.id,
                    name: row.name,
                    price: row.price,
                    description: row.description,
                    image: row.image,
                    category: row.category,
                }));
                resolve(menuItems);
            });
        });
    });
}

// Used to save menu items to the database
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

// Used to get menu items by category "Filter by Category" feature
export async function filterByCategory(activeCategories) {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            const placeholders = activeCategories.map(() => '?').join(', ');
            tx.executeSql(
                `SELECT * FROM menuitems WHERE category in (${placeholders})`,
                activeCategories,
                (_, { rows }) => {
                    const menuItems = rows._array.map((row) => ({
                        id: row.id,
                        name: row.name,
                        price: row.price,
                        description: row.description,
                        image: row.image,
                        category: row.category,
                    }));
                    resolve(menuItems);
                }
            );
        })
    })
}

// Used to get menu items by query "Search" feature
export async function filterByQuery(query) {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM menuitems WHERE name LIKE ? COLLATE NOCASE`,
                [`%${query}%`],
                (_, { rows }) => {
                    const menuItems = rows._array.map((row) => ({
                        id: row.id,
                        name: row.name,
                        price: row.price,
                        description: row.description,
                        image: row.image,
                        category: row.category,
                    }));
                    resolve(menuItems);
                }
            );
        })
    });
}

// Used to get menu items by category and query "Filter by Category" and "Search" feature together
export async function filterByCategoryAndQuery(activeCategories, query){
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            const placeholders = activeCategories.map(() => '?').join(', ');
            tx.executeSql(
                `SELECT * FROM menuitems WHERE category in (${placeholders}) AND name LIKE ? COLLATE NOCASE`,
                [...activeCategories, `%${query}%`],
                (_, { rows }) => {
                    const menuItems = rows._array.map((row) => ({
                        id: row.id,
                        name: row.name,
                        price: row.price,
                        description: row.description,
                        image: row.image,
                        category: row.category,
                    }));
                    resolve(menuItems);
                }
            );
        })
    });
}

