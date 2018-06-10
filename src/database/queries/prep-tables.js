const prepTablesQuery = `DROP TABLE IF EXISTS requests;
  CREATE TABLE requests(
    id SERIAL PRIMARY KEY, 
    users_id INTEGER NOT NULL,
    title VARCHAR NOT NULL, 
    duration INTEGER NOT NULL, 
    description TEXT NOT NULL, 
    status status DEFAULT 'pending', 
    created_at TIMESTAMP DEFAULT NOW(), 
    updated_at TIMESTAMP DEFAULT NOW());

    DROP TABLE IF EXISTS users;
    CREATE TABLE users(
    id SERIAL PRIMARY KEY, 
    first_name VARCHAR NOT NULL, 
    last_Name VARCHAR NOT NULL, 
    email VARCHAR NOT NULL UNIQUE, 
    password VARCHAR NOT NULL, 
    role VARCHAR NOT NULL DEFAULT 'User',
    dept VARCHAR NOT NULL, 
    employee_code VARCHAR(20) NOT NULL, 
    created_at TIMESTAMP DEFAULT NOW(), 
    updated_at TIMESTAMP DEFAULT NOW());
    
    INSERT INTO users (first_name, last_Name, email, password, dept, role, employee_code) VALUES
    ('Agada', 'Clinton', 'clinton@test.com', '$2b$08$7Eag5c9WgbiM7RQBM7mcaOTAJo.CXp5SeYsxSCgu2evrhUH1Xzney', 'Web Development', 'Admin', 'AD001'),
    ('Agada', 'Innocent', 'innocent@test.com', '$2b$08$7Eag5c9WgbiM7RQBM7mcaOTAJo.CXp5SeYsxSCgu2evrhUH1Xzney', 'Maintenance', 'User', 'US002'),
    ('Anthony', 'Solomon', 'solomon@test.com', '$2b$08$7Eag5c9WgbiM7RQBM7mcaOTAJo.CXp5SeYsxSCgu2evrhUH1Xzney', 'Procurement', 'User', 'US003'),
    ('Godwin', 'Andrew', 'andrew@test.com', '$2b$08$7Eag5c9WgbiM7RQBM7mcaOTAJo.CXp5SeYsxSCgu2evrhUH1Xzney', 'Sales', 'User', 'US004'),
    ('Veraclins', 'Veracity', 'admin@admin.com', '$2b$08$7Eag5c9WgbiM7RQBM7mcaOTAJo.CXp5SeYsxSCgu2evrhUH1Xzney', 'Administration', 'Admin', 'AD005')
    RETURNING id;

    INSERT INTO requests (users_id, title, duration, description) VALUES
    (2, 'General Servicing of Sharp Scanner', 3, 'The quarterly routine maintenance service for the Sharp S300 scanner is long overdue and necessary in order to forestall total breakdown'),
    (2, 'General Servicing of Elepaq 3.5KVA Generator', 4, 'The quarterly routine maintenance service for the Elepaq 3.5KVA Generator is long overdue and necessary in order to forestall total breakdown. The love of the lord is the beginning of wisdom.'),
    (3, 'Change HP MFP 200f Printer Flex', 5, 'If you are passing parameters to your queries you will want to avoid string concatenating parameters into the query text directly. This can lead to sql injection vulnerabilities. node-postgres supports paramterized queries, passing your query text unaltered as well as your parameters to the PostgreSQL server where the parameters are safely substituted into the query with battle-tested parameter substitution code within the server itself.'),
    (3, 'Routine Maintenance', 5, 'If you are passing parameters to your queries you will want to avoid string concatenating parameters into the query text directly. This can lead to sql injection vulnerabilities. node-postgres supports paramterized queries, passing your query text unaltered as well as your parameters to the PostgreSQL server where the parameters are safely substituted into the query with battle-tested parameter substitution code within the server itself.'),
    (2, 'Change HP 5000 Printer Flex', 5, 'If you are passing parameters to your queries you will want to avoid string concatenating parameters into the query text directly. This can lead to sql injection vulnerabilities. node-postgres supports paramterized queries, passing your query text unaltered as well as your parameters to the PostgreSQL server where the parameters are safely substituted into the query with battle-tested parameter substitution code within the server itself.'),
    (3, 'Change HP MFP 200f Scanner Flex', 5, 'If you are passing parameters to your queries you will want to avoid string concatenating parameters into the query text directly. This can lead to sql injection vulnerabilities. node-postgres supports paramterized queries, passing your query text unaltered as well as your parameters to the PostgreSQL server where the parameters are safely substituted into the query with battle-tested parameter substitution code within the server itself.'),
    (3, 'Change HP MFP 200f Printer Flex', 5, 'If you are passing parameters to your queries you will want to avoid string concatenating parameters into the query text directly. This can lead to sql injection vulnerabilities. node-postgres supports paramterized queries, passing your query text unaltered as well as your parameters to the PostgreSQL server where the parameters are safely substituted into the query with battle-tested parameter substitution code within the server itself.'),
    (2, 'Upgrade Server System Software', 5, 'If you are passing parameters to your queries you will want to avoid string concatenating parameters into the query text directly. This can lead to sql injection vulnerabilities. node-postgres supports paramterized queries, passing your query text unaltered as well as your parameters to the PostgreSQL server where the parameters are safely substituted into the query with battle-tested parameter substitution code within the server itself.'),
    (2, 'Change HP MFP 200f Printer Flex', 4, 'If you are passing parameters to your queries you will want to avoid string concatenating parameters into the query text directly. This can lead to sql injection vulnerabilities. node-postgres supports paramterized queries, passing your query text unaltered as well as your parameters to the PostgreSQL server where the parameters are safely substituted into the query with battle-tested parameter substitution code within the server itself.')
    RETURNING id;`;

export default prepTablesQuery;
