# 💰 Finance App

Fullstack application for controlling **financial transactions**, with an **interactive dashboard** containing a monthly summary, graphs and a detailed list of transactions.

---

## 🚀 Technologies Used

- **Frontend**
  - React.js (Vite)
  - Recharts (interactive graphics)
  - CSS with dark theme (corporate/tech)

- **Backend**
  - Node.js + Express
  - PostgreSQL
  - Sequelize (ORM)
  - dotenv (environment variables)
  - cors, nodemon, etc.

- **Database**
  - PostgreSQL 15+

---

## 📂 Folder Structure
/backend

├── node_modules/ # Sequelize Settings

├── db.js # API Routes (transactions, summary)

├── server.js # Express Server

└── .env # Bank settings for backend

/frontend

├── src/

│ ├── components/ 

    ├── Charts.jsx
    
    ├── Summary.jsx
    
    ├── TransactionForm.jsx
    
    ├── TransactionList.jsx  

│ ├── services/ 

    ├── api.js for HTTP calls

│ ├── App.js # Main component

│ ├── .env # Bank settings for frontend

│ ├── init.sql #Table to run in the database

│ └── App.css # Global style

└── settings.json

---

## 🛠️ Database Configuration

1. Create a database in PostgreSQL (suggested name: `financas`):

``sql
`CREATE DATABASE financas;`

2. Configure the variables in the file /backend/.env

DB_HOST=localhost

DB_PORT=5432

DB_NAME=financas

DB_USER=your_username

DB_PASS=your_password

⚠️ Note: Use the same username/password you use in local PostgreSQL.

4. Run migrations (if using Sequelize CLI) or let models sync on first start:

bash
   npx sequelize-cli db:migrate

▶️ Running the Backend

1. Enter the folder /backend
bash
  cd backend

2. Install the dependencies:
bash
  npm install...

3. Start the server:
bash
  npm run dev

The backend will run on http://localhost:4000

💻 Running the Frontend

1. Enter the folder /frontend
bash
  cd frontend

2. Install the dependencies:
bash
  npm install...

3. Launch the app:
bash
  npm run dev

The frontend will run on http://localhost:5173

# 📊 Features

➕ Add transaction (income or expense)

❌ Remove transaction

📑 Monthly summary (profits, expenses, balance)

📈 Dashboard with interactive charts

🕒 Detailed listing with date/time


# 🎨 Style

Corporate Dark Theme

Responsive Layout

Grid Dashboard (Summary + Charts Side by Side)


# 🔮 Future Improvements

User authentication (login/registration)

Advanced filters by period and category

Export reports to PDF/Excel

Deployment on Railway/Render (backend) and Vercel/Netlify (frontend)

# 📸 Screenshots

- Backend API Testing:
![teste de backend](https://github.com/user-attachments/assets/fbe94c8b-bf59-4bc7-943c-3002bad6a63b)

- Frontend App Testing:
![teste frontend](https://github.com/user-attachments/assets/49beb6e2-df65-44cf-a720-503bfe1d397d)

- Frontend App Dashboard:
![teste dashboard](https://github.com/user-attachments/assets/5dad0bf3-05c7-4647-b5b1-1ab2518d5b14)

- Frontend App Transaction List:
![teste transactions](https://github.com/user-attachments/assets/b103b78f-0434-4cd5-8610-f96863a38b47)
