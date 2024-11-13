"use client";
import React from "react";
import { useSocket } from "./SocketProvider";
import { Badge } from "./ui/badge";

function SocketIndicator() {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <Badge variant="outline" className="bg-yellow-600 text-white ">
        Falling: polling every 1s
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="bg-emerald-600 text-white ">
      Live: Real time updates
    </Badge>
  );
}

export default SocketIndicator;
