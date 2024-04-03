export const groupFormSchema = {
  title: "Add Group",
  type: "object",
  required: ["groupName"],
  properties: {
    groupName: {
      type: "string",
      title: "Group Name",
      minLength: 3,
      maxLength: 50,
    },
    groupUserEmails: {
      type: "array",
      title: "Member Emails",
      minItems: 0,
      items: {
        type: "string",
        format: "email",
      },
    },
  },
};
