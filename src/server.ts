


import mongoose from "mongoose";
import config from "./app/config";
import { io, server } from "./app";

import { AuthModel } from "./app/Modules/Auth/Auth.model";
import { ListingsModel } from "./app/Modules/Listings/Listings.model";


const PORT = process.env.PORT || 3000;
async function main() {
  try {
    // mongoose.set("debug", true);
    await mongoose.connect(config.database_url as string);
    console.log("✅ Connected to MongoDB");

    // Watch MongoDB for real-time changes
    const taskStream = ListingsModel.watch();
    taskStream.on("change", (change) => {
      console.log("🟢 MongoDB Change Event:", change);
      io.emit("taskUpdated", change);
    });
    const authStream = AuthModel.watch();
    authStream.on("change", (change) => {
      console.log("🟢 MongoDB Change Event:", change);
      io.emit("authUpdated", change);
    });

    io.on("connection", (socket) => {
      console.log("⚡ Client connected:", socket.id);
      socket.on("disconnect", () => console.log("❌ Client disconnected"));
    });

    // Start the server
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${config.port}`);
    });

  } catch (error) {
    console.error("❌ Error starting server:", error);
  }
}

main();







