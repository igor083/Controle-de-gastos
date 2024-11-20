import sqlite3 from "better-sqlite3";

// Inicializando o banco de dados
const db = new sqlite3("src/db/database.db");

// Criando a tabela de usuários
db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  );
`);

// Criando a tabela de tipos de gasto
db.exec(`
  CREATE TABLE IF NOT EXISTS tipos_gasto (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name_tipo_gasto TEXT NOT NULL,
    id_usuario INTEGER NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
  );
`);

// Criando a tabela de gastos
db.exec(`
  CREATE TABLE IF NOT EXISTS gastos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    valor REAL NOT NULL,
    data TEXT NOT NULL,
    descricao TEXT NOT NULL,
    id_tipo_gasto INTEGER NOT NULL,
    id_usuario INTEGER NOT NULL,
    FOREIGN KEY (id_tipo_gasto) REFERENCES tipos_gasto(id) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
  );
`);

export default db;
