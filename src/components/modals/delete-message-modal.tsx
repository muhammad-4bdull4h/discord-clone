"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModel } from "@/hooks/use-model-store";
import { Button } from "../ui/button";
import axios from "axios";
import qs from "query-string";

function DeleteMessageModal() {
  const { type, isOpen, onClose, data } = useModel();

  const isModelOpen = isOpen && type === "deleteMessage";
  const { apiUrl, query } = data;

  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);
      const url = qs.stringifyUrl({
        url: apiUrl || "",
        query: {
          ...query,
          action: "delete",
        },
      });
       await axios.patch(
        url,
        {},
        {
          withCredentials: true,
        }
      );

      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="model server">
      <Dialog open={isModelOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Delete Message
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              Are you sure you want to do this? <br /> This message will be
              permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="bg-gray-100 px-6 py-4">
            <div className="flex items-center justify-between w-full">
              <Button disabled={loading} onClick={onClose} variant="ghost">
                Cancel
              </Button>
              <Button disabled={loading} onClick={onClick} variant="primary">
                Confirm
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DeleteMessageModal;
