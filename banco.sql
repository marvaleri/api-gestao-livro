CREATE DATABASE gestaolivros;

USE gestaolivros;

CREATE TABLE IF NOT EXISTS tbl_livros (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(40) NOT NULL,
    categoria VARCHAR(40) NOT NULL,
    ano INT NOT NULL,
    foto VARCHAR(400) NOT NULL
);

INSERT INTO tbl_livros(nome, categoria, ano, foto) VALUES ("O pequeno principe", "filosofia", 1943, "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSff_BDqWrzCwsmnJ8EfuEv5hBJITgaJBB6-z7vcmBIig7AJzG9MZIVcLNtZh9a_9hLAxilzZqJMtb_PGbEy7jAk4PbRDf91WoQHbA4vEJfsaHLjauaGBprkb8_je58TsABoP6qzg&usqp=CAc");

SELECT * FROM tbl_livros;