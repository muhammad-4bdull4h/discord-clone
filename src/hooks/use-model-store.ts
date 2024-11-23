import { Channel, ChannelType, Server } from "@prisma/client";
import { set } from "react-hook-form";
import { create } from "zustand";

export type ModelType =
  | "createServer"
  | "invite"
  | "editServer"
  | "members"
  | "createChannel"
  | "leaveServer"
  | "deleteServer"
  | "deleteChannel"
  | "editChannel"
  | "messageFile"
  | "deleteMessage";
interface ModelData {
  server?: Server;
  channelType?: ChannelType;
  channel?: Channel;
  apiUrl?: string;
  query?: Record<string, any>;
}

interface ModelStore {
  type: ModelType | null;
  data: ModelData;
  isOpen: boolean;
  onOpen: (type: ModelType, data?: ModelData) => void;
  onClose: () => void;
}

export const useModel = create<ModelStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type, data = {}) => set({ type, isOpen: true, data: data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
