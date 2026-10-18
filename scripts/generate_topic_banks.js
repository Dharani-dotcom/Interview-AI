// Generator script for comprehensive interview question banks
// Topics: Express.js, MongoDB, MERN Stack, Agentic AI, Gen AI, RAG, Java, Python, Database/SQL, JavaScript, C++, System Design, HR
const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, '../src/data/topics');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

console.log("Generating full question banks in:", targetDir);
