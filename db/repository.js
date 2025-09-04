import { db } from "./db.js";

class Repository {
    

    constructor() {
            db.prepare(`
            CREATE TABLE IF NOT EXISTS tweets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                texto TEXT,
                 hash TEXT
            )
            `).run();
    }

    add(tweet) {
           db.prepare("INSERT INTO tweets (texto) VALUES (?)").run(tweet);
    }

     getByText(tweet) {
        return db.prepare("SELECT * FROM tweets WHERE texto = '" + tweet+ "'").all();
    }

    delete() {
        return db.prepare("delete FROM tweets").run();
    }
}

export {Repository};