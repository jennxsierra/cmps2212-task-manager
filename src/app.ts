import express from "express";
import path from "path";
import logger from "./middleware/logger";
import { getLocalIpAddress } from "./utils/networkUtils";
import taskRoutes from "./routes/taskRoutes";

const app = express();

// Use the logger middleware
app.use(logger);

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" folder
app.use(express.static(path.join(process.cwd(), "public")));

// Set EJS as the templating engine and set the views directory
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src/views"));

// Mount the task management routes
app.use("/", taskRoutes);

// 404 Error handler
app.use((_req, res) => {
  res.status(404).render("error", { message: "Page Not Found" });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  const ipAddress = getLocalIpAddress();
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(
    `Access the server from another computer at http://${ipAddress}:${PORT}`
  );
});
