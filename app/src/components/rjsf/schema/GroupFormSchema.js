export const groupFormSchema = {
  title: "Group Form",
  type: "object",
  required: ["groupName"],
  properties: {
    groupName: {
      type: "string",
      title: "Group Name",
    },
    groupUserEmails: {
      type: "array",
      title: "Group Member Emails",
      items: {
        type: "string",
      },
    },
  },
};
