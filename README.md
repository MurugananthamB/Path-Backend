# 📊 Pathology Backend API

A powerful and scalable backend API built to simplify patient management, test processing, barcode generation, and report handling for Pathology applications.  
Fast, secure, and optimized for healthcare workflows.

---

## 🚀 Features

- 🔐 **Secure Authentication** using JWT & bcrypt
- 🦢 **Patient & Test Management APIs**
- 🖨️ **Barcode Generation** for samples using **bwip-js**
- 📝 **Dynamic PDF & Excel Report Support**
- 🌐 **CORS Enabled** for cross-origin access
- 📄 **Environment Configurations** using `.env`
- ⚙️ Built on **Node.js, Express & MongoDB**

---

## 🛠️ Tech Stack

| Technology   | Usage                               |
|-------------|-------------------------------------|
| Node.js     | Server runtime                      |
| Express.js  | API framework                       |
| MongoDB     | Database (via Mongoose)             |
| JWT         | Authentication                      |
| bcrypt / bcryptjs | Password hashing              |
| EJS         | Templating for reports (optional)   |
| bwip-js / jsbarcode | Barcode generation          |
| dotenv      | Environment variables               |
| cors        | Cross-origin resource sharing       |
| nodemon     | Development server                  |

---

## 📂 Project Structure

```
├── models/          // Mongoose Models
├── routes/          // API Routes
├── server.js        // Main server file
├── .env             // Environment configs
├── package.json     // Dependencies & scripts
└── README.md
```

---

## 🚀 Installation & Running Locally

```bash
# Clone the repo
git clone https://github.com/MurugananthamB/Path-Backend.git
cd Path-Backend

# Install dependencies
npm install

# Create a .env file and set up your environment variables
touch .env

# Start the server
npm start
```

---

## 🌐 API Endpoints

| Method | Endpoint              | Description                          |
|-------|-----------------------|--------------------------------------|
| POST  | `/api/patients`        | Add new patient                      |
| GET   | `/api/patients`        | Get all patients                     |
| POST  | `/api/tests`           | Add test data                        |
| GET   | `/api/tests`           | Fetch tests                          |
| POST  | `/api/auth/login`      | User login                           |
| GET   | `/api/reports/:id`     | Generate report PDF / Excel          |

*(Customize these based on your routes folder)*

---

## 📦 Dependencies

- bcrypt
- bcryptjs
- body-parser
- bwip-js
- canvas
- cors
- dotenv
- ejs
- express
- jsbarcode
- jsonwebtoken
- mongoose
- nodemon

---

## 📜 License

This project is licensed under the ISC License.

---

## 👌 Contribution

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.
