import app from "./app.js";

// This file is only used for local development
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  
  // Display available routes
  const routes = [
    { method: "POST", path: "/api/auth/signup" },
    { method: "POST", path: "/api/auth/login" },
    { method: "GET", path: "/api/gurus" },
    { method: "POST", path: "/api/gurus" },
    { method: "GET", path: "/api/gurus/:id" },
    { method: "PUT", path: "/api/gurus/:id" },
    { method: "DELETE", path: "/api/gurus/:id" },
    { method: "GET", path: "/api/siswas" },
    { method: "POST", path: "/api/siswas" },
    { method: "GET", path: "/api/siswas/:id" },
    { method: "PUT", path: "/api/siswas/:id" },
    { method: "DELETE", path: "/api/siswas/:id" },
    { method: "GET", path: "/api/profil" },
    { method: "POST", path: "/api/profil" },
    { method: "GET", path: "/api/footer" },
    { method: "POST", path: "/api/footer" },
    { method: "GET", path: "/api/galeri" },
    { method: "POST", path: "/api/galeri" },
    { method: "GET", path: "/api/kontak" },
    { method: "POST", path: "/api/kontak" }
  ];

  console.log("\nAvailable Routes:");
  routes.forEach(route => {
    console.log(`- ${route.method.padEnd(6)} ${route.path}`);
  });
});