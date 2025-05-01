const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/configdb');
const authRoutes = require('./routes/authroutes');
require('dotenv').config();
// Load environment variables
dotenv.config({ path: './server.env' });

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', process.env.CORS_ORIGIN],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use('/api/auth', authRoutes);
app.use("/api/designs", require("./routes/routesDesigns"));
app.use("/api/elements", require("./routes/elementsRoutes"));
app.use("/api/templates", require("./routes/routesTemplates"));
app.use("/api/export", require("./routes/exportRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api/share", require("./routes/shareRoutes"));
app.use("/api/collaborations", require("./routes/collaborationRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
