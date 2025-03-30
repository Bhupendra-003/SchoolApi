# School Management API

## Project Overview
This project is a **School Management API** built using **Node.js, Express.js, and MySQL**. The API allows users to:
- **Add new schools** with location details.
- **Retrieve a list of schools** sorted by proximity to a user-specified location.

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Hosting:** (To be deployed on Railway/Render)
- **API Testing:** Postman

---

##  Setup Instructions
### 1️ Clone the Repository
```sh
git clone https://github.com/Bhupendra-003/SchoolApi.git
```

### 2️ Install Dependencies
```sh
npm install
```

### 3️ Configure Database
1. Create a MySQL database.
2. Run the following SQL script to create the `schools` table:
```sql
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
```

### 4️ Set Up Environment Variables
Create a `.env` file and add:
```
DB_HOST=your-mysql-host
DB_USER=your-mysql-user
DB_PASS=your-mysql-password
DB_NAME=your-mysql-database
```

### 5️ Start the Server
```sh
npm start
```
The API will be running at `http://localhost:3000`

---

##  API Endpoints

###  Add School
**Endpoint:** `POST /api/addSchool`
**Description:** Adds a new school to the database.
**Request Body:**
```json
{
  "name": "ABC High School",
  "address": "123 Main St, City, Country",
  "latitude": 28.7041,
  "longitude": 77.1025
}
```
**Response:**
```json
{
  "message": "School added successfully!"
}
```

###  List Schools (Sorted by Proximity)
**Endpoint:** `GET /api/listSchools`
**Query Parameters:**
- `userLatitude` (required)
- `userLongitude` (required)

**Example Request:**
```
GET /api/listSchools?latitude=28.7041&longitude=77.1025
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "ABC High School",
    "address": "123 Main St, City, Country",
    "latitude": 28.7041,
    "longitude": 77.1025,
    "distance": 2.5
  },
  ...
]
```

---

##  Postman Collection
To test the APIs, visit the Postman collection:
[Postman Collection](https://school-api-team-9006.postman.co/workspace/My-Workspace~16e78c9a-8719-4659-861b-b315bb2c69f4/collection/42403179-a6374170-b930-43c3-ae1b-27e784e20ec7?action=share&creator=42403179)

---

##  Author
**Bhupendra Singh Rajput**  
