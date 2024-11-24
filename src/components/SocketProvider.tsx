/*eslint-disable @typescript-eslint/no-explicit-any*/
"use client"; // Ensure this is used in a Next.js client component

import React, { createContext, useContext, useEffect, useState } from "react";
import { io as ClientIO } from "socket.io-client";

type SocketContextType = {
  //eslint-disable @typescript-eslint/no-explicit-any
  socket: any | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

// Custom hook to use the Socket context
export const useSocket = () => {
  return useContext(SocketContext);
};

// Socket Provider Component
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  //eslint-disable @typescript-eslint/no-explicit-any
  const [socket, setSocket] = useState<any | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Create a new socket instance
    const socketInstance = ClientIO(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL, {
      path: "/socket.io", // Ensure this matches your server configuration
      transports: ["websocket", "polling"], // Fallback options
    });

    // Connection event
    socketInstance.on("connect", () => {
      setIsConnected(true);
      console.log("Connected to Socket.IO server");
    });

    // Disconnection event
    socketInstance.on("disconnect", () => {
      setIsConnected(false);
      console.log("Disconnected from Socket.IO server");
    });

    // Handle connection errors
    socketInstance.on("connect_error", (error) => {
      console.error("Connection Error:", error);
    });

    // Handle connection timeout
    socketInstance.on("connect_timeout", (timeout) => {
      console.error("Connection Timeout:", timeout);
    });

    setSocket(socketInstance);

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
