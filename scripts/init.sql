-- Crear la base de datos
--CREATE DATABASE gamecard;

-- Conectar a la base de datos gamecard
--\c gamecard;

-- Crear la extensión para generar UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Crear la tabla card_type
CREATE TABLE IF NOT EXISTS card_type (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(20)
);

-- Crear la tabla card
CREATE TABLE IF NOT EXISTS card (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(20),
    hp INT,
    type_id UUID,
    ability VARCHAR(100) ,
    attack_power INT,
    resistance_id UUID,
    resistance_point INT,
    weakness_id UUID,
    weakness_point INT ,
    img_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_type FOREIGN KEY (type_id) REFERENCES card_type(id),
    CONSTRAINT fk_resistance FOREIGN KEY (resistance_id) REFERENCES card_type(id),
    CONSTRAINT fk_weakness FOREIGN KEY (weakness_id) REFERENCES card_type(id)
);

-- Insertar tipos de cartas en la tabla card_type
INSERT INTO card_type (id, name) VALUES
    (uuid_generate_v4(), 'Ground'),
    (uuid_generate_v4(), 'Water'),
    (uuid_generate_v4(), 'Fire'),
    (uuid_generate_v4(), 'Electric'),
    (uuid_generate_v4(), 'Grass');


    -- Insertar datos en la tabla card
    INSERT INTO card (name,
     hp,
     type_id,
     ability,
     attack_power,
     resistance_id,
     resistance_point,
     weakness_id,
     weakness_point,
     img_url)
    VALUES
    ('Squirtle', 50, (SELECT id FROM card_type WHERE name = 'Water' LIMIT 1),'Torrent', 40, (SELECT id FROM card_type WHERE name = 'Fire' LIMIT 1),
     20, (SELECT id FROM card_type WHERE name = 'Electric' LIMIT 1), 1, 
     'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/007.png'),
     ('Bulbasaur', 60, (SELECT id FROM card_type WHERE name = 'Grass' LIMIT 1), 'Overgrow', 35, (SELECT id FROM card_type WHERE name = 'Water' LIMIT 1), 15, (SELECT id FROM card_type WHERE name = 'Fire' LIMIT 1), 2, 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png'),
     ('Gyarados', 95, (SELECT id FROM card_type WHERE name = 'Water' LIMIT 1),'Intimidate', 85, (SELECT id FROM card_type WHERE name = 'Fire' LIMIT 1),30, (SELECT id FROM card_type WHERE name = 'Electric' LIMIT 1), 3, 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/130.png'),
     ('Geodude', 70, (SELECT id FROM card_type WHERE name = 'Ground' LIMIT 1),'Rock Head', 55, (SELECT id FROM card_type WHERE name = 'Electric' LIMIT 1), 25, (SELECT id FROM card_type WHERE name = 'Water' LIMIT 1), 2, 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/074.png'),
     ('Charizard', 100, (SELECT id FROM card_type WHERE name = 'Fire' LIMIT 1),'Blaze', 90, (SELECT id FROM card_type WHERE name = 'Grass' LIMIT 1), 30, (SELECT id FROM card_type WHERE name = 'Water' LIMIT 1), 1, 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/006.png'),
     ('Venusaur', 105, (SELECT id FROM card_type WHERE name = 'Grass' LIMIT 1),'Overgrow', 80, (SELECT id FROM card_type WHERE name = 'Fire' LIMIT 1), 25, (SELECT id FROM card_type WHERE name = 'Water' LIMIT 1), 3, 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/003.png'),
     ('Charmander', 55, (SELECT id FROM card_type WHERE name = 'Fire' LIMIT 1),'Blaze', 45, (SELECT id FROM card_type WHERE name = 'Grass' LIMIT 1), 20, (SELECT id FROM card_type WHERE name = 'Water' LIMIT 1), 1, 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/004.png'),
     ('Pikachu', 45, (SELECT id FROM card_type WHERE name = 'Electric' LIMIT 1),'Static', 50, (SELECT id FROM card_type WHERE name = 'Electric' LIMIT 1), 10, (SELECT id FROM card_type WHERE name = 'Water' LIMIT 1), 2, 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png');