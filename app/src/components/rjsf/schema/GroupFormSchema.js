export const groupFormSchema = {
  title: "Add Group",
  type: "object",
  required: ["groupName"],
  properties: {
    groupName: {
      type: "string",
      title: "Group Name",
    },
    groupUserEmails: {
      type: "array",
      title: "Member Emails",
      minItems: 1,
      items: {
        type: "string",
      },
    },
  },
};
