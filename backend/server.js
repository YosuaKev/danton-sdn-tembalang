// server.js
import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("Available routes:");
  console.log("Auth Routes:");
  console.log("- POST   /api/auth/signup");
  console.log("- POST   /api/auth/login");
  
  console.log("\nProfile Routes:");
  console.log("- GET    /api/profile");
  console.log("- PUT    /api/profile");
  
  console.log("\nGuru Routes:");
  console.log("- GET    /api/gurus");
  console.log("- POST   /api/gurus");
  console.log("- GET    /api/gurus/:id");
  console.log("- PUT    /api/gurus/:id");
  console.log("- DELETE /api/gurus/:id");
  
  console.log("\nSiswa Routes:");
  console.log("- GET    /api/siswas");
  console.log("- POST   /api/siswas");
  console.log("- GET    /api/siswas/:id");
  console.log("- PUT    /api/siswas/:id");
  console.log("- DELETE /api/siswas/:id");
});