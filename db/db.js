import Database from "better-sqlite3";

// Conexión
const db = new Database("./mi_base.db");



// Consultar
//const rows = db.prepare("SELECT * FROM tweets").all();
//console.log("📊 Tweets en DB:", rows);

export {db};