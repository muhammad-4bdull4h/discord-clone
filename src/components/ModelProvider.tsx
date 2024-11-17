"use client";
import React from "react";
import CreateServerModal from "@/components/modals/create-server-model";
import InviteServerModal from "./modals/invite-modal";
import EditServerModal from "./modals/edit-server-model";
import MembersServerModal from "./modals/members-modal";
import CreateChannelModal from "./modals/cerate-channel-modal";
import LeaveServerModal from "./modals/leave-server";
import DeleteServerModal from "./modals/delete-server";
import DeleteChannelModal from "./modals/delete-channel";
import EditChannelModal from "./modals/edit-channel";
import MessageFileModal from "./modals/message-file-model";

function ModelProvider() {
  return (
    <>
      <CreateServerModal />
      <InviteServerModal />
      <EditServerModal />
      <MembersServerModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
      <MessageFileModal />
    </>
  );
}

export default ModelProvider;
