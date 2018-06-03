export const createRequestsTableQuery = `DROP TABLE requests;
  CREATE TABLE requests(
    id SERIAL PRIMARY KEY, 
    users_id INTEGER NOT NULL,
    title VARCHAR NOT NULL, 
    duration INTEGER NOT NULL, 
    description TEXT NOT NULL, 
    status status DEFAULT 'pending', 
    created_at TIMESTAMP DEFAULT NOW(), 
    updated_at TIMESTAMP DEFAULT NOW());`;

export const createUsersTableQuery = `DROP TABLE users;
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
    updated_at TIMESTAMP DEFAULT NOW());`;
