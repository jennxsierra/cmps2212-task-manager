import express from "express";
import path from "path";
import taskRoutes from "./routes/taskRoutes";

const app = express();

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" folder
app.use(express.static(path.join(process.cwd(), "public")));

// Set EJS as the templating engine and set the views directory
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src/views"));

// Logging middleware to log request details
app.use((_req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${_req.method} ${_req.url}`);
  next();
});

// Mount the task management routes
app.use("/", taskRoutes);

// 404 Error handler
app.use((_req, res) => {
  res.status(404).render("error", { message: "Page Not Found" });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
