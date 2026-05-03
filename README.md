# AutoTestGen — Automated REST API Test Case Generator

> An intelligent, LLM-powered system that ingests OpenAPI/Swagger specifications and automatically generates comprehensive functional test cases.

Architecture: 
```
api-test-generator/
├── client/                  # React.js frontend
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── pages/           # Route-level views
│   │   └── services/        # API call helpers
│   └── package.json
│
├── server/                  # Node.js + Express backend
│   ├── src/
│   │   ├── routes/          # REST endpoints
│   │   ├── services/
│   │   │   ├── specParser/  # swagger-parser integration
│   │   │   ├── llm/         # Claude API prompt engineering
│   │   │   ├── executor/    # Test execution engine (Axios)
│   │   └── app.js
│   └── package.json
│
└── README.md
```
Prerequisites

1. Node.js ≥ 18.x
2. npm ≥ 9.x
3. An Anthropic API key (console.anthropic.com)

# Installation: 

## 1. Clone the repository:
   ```
     git clone https://github.com/manjunath-mn/api-test-generator.git
     cd api-test-generator
   ```

## 2. Configure environment variables
In server
```
  cp .env.example .env
```

## 3. Edit .env:
```
PORT=5000
ANTHROPIC_API_KEY=your_api_key_here
CLIENT_URL=http://localhost:5173
```

## 4. Install dependencies
### Backend
```
cd server && npm install
```

### Frontend
```
cd ../client && npm install
```

## 5. Run the application

### In /server
```
npm run dev
```
### In /client (separate terminal)
```
npm start
```
The app will be available at http://localhost:3000.
