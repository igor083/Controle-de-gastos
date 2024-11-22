CREATE TABLE usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );

CREATE TABLE IF NOT EXISTS tipos_gasto (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name_tipo_gasto TEXT NOT NULL,
    id_usuario INTEGER NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
  );
  DROP TABLE gastos
CREATE TABLE IF NOT EXISTS gastos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    valor REAL NOT NULL,
    data TEXT NOT NULL,
    descricao TEXT NOT NULL,
    id_tipo_gasto INTEGER ,
    id_usuario INTEGER NOT NULL,
    FOREIGN KEY (id_tipo_gasto) REFERENCES tipos_gasto(id) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
  );

-- Inserir um novo usuário
INSERT INTO usuarios (name, email, password) VALUES ("igor", "igor@email.com", "password1");

-- Buscar um usuário por email
SELECT * FROM usuarios WHERE email = ?;

SELECT * FROM tipos_gasto;
DROP TABLE usuarios
SELECT * FROM gastos;
SELECT * FROM usuarios;

PRAGMA foreign_key_list(tipos_gasto);

PRAGMA foreign_key_list(gastos);
SELECT * FROM usuarios WHERE id = 1;

INSERT INTO tipos_gasto (name_tipo_gasto, id_usuario) 
VALUES ('Pix', );

ALTER TABLE usuarios
 ADD COLUMN banca INTEGER DEFAULT 0; 