

# 🖥️ CodeRaiders: Online Coding Platform

[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=white)](https://firebase.google.com/)


**CodeRaiders** is a comprehensive online coding platform designed to empower developers of all skill levels. This platform offers a space to write and execute code, practice coding skills, and compete in coding contests.



## ✨ Features

### ⚔️ Coding Playground
- Write, compile, and execute code in a user-friendly editor.
- Support for at least one compiled language.
- Real-time error feedback and performance metrics.

### 🏋️‍♂️ Coding Arena
- Practice with pre-existing coding problems or upload new problems.
- Detailed problem descriptions, constraints, and test cases.
- Solutions can be tested against multiple test cases.

### 🎮 Coding Battleground
- Participate in ongoing contests and view real-time leaderboards.
- Create and host your own coding contests.

## 🛠️ Project Structure

The project is divided into two main parts: **Client** and **Server**.

### 🌐 Client
- **Components**: Reusable React components used throughout the platform.
- **Hooks**: Custom React hooks for managing state and effects.
- **Pages**: Individual pages for different parts of the application, such as the home page, login, signup, practice, contests, etc.
- **Assets**: Static assets like images and styles.

```
client/
│── src/
│   ├── assets/             
│   ├── Components/         
│   ├── Hooks/              
│   ├── Pages/              
│   ├── App.jsx             
│   ├── index.jsx           
│   └── ...                 
└── ...
```
### 🔧 Server
- **Codes**: Directory where user-submitted code is stored temporarily for execution.
- **Problems**: Contains JSON files that store coding problems and test cases.
- **Outputs**: Stores the outputs generated after code execution.
- **Scripts**: 
  - `addProblems.js`: Script for adding new problems to the platform.
  - `executeCodeFile.js`: Executes the user-submitted code against provided test cases.
  - `generateCodeFile.js`: Generates the code file from the user's input.

```
server/
│── codes/                 
│── outputs/                
│── problems/               
│   ├── testcases/          
│   └── problems.json       
│── executeCodeFile.js      
│── generateCodeFile.js     
│── addProblems.js          
└── ...
```

## 🚀 Getting Started

### 📋 Prerequisites
- Node.js
- MongoDB (for storing user data and problems)
- Any code editor (e.g., Visual Studio Code)

### 💻 Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/coderaiders.git
    ```

2. Navigate to the project directory:
    ```sh
    cd coderaiders
    ```

3. Install dependencies for both client and server:
    ```sh
    cd Client
    npm install
    cd ../Server
    npm install
    ```

4. Set up your environment variables in the `Server/.env` file:
    ```env
    MONGODB_URI=mongodb://localhost:27017/coderaiders
    ```

5. Run the development server:
    ```sh
    cd Client
    npm start
    cd ../Server
    node index.js
    ```

6. Open the application in your browser:
    ```
    http://localhost:3000
    ```

## 🎯 Usage

- **Coding Playground**: Start coding by navigating to the Playground section.
- **Coding Arena**: Select a problem to solve or upload a new one.
- **Coding Battleground**: Join a contest or create your own.

## 🤝 Contributing

We welcome contributions! Please fork this repository, create a new branch, make your changes, and submit a pull request.

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/my-feature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/my-feature`.
5. Open a pull request.

## License

This project is licensed under the MIT License.


