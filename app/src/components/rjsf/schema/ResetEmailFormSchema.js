export const resetEmailFormSchema = {
  title: "Reset Email",
  type: "object",
  required: ["email", "emailNew", "password"],
  properties: {
    email: {
      type: "string",
      title: "Email",
    },
    emailNew: {
      type: "string",
      title: "New Email",
    },
    password: {
      type: "string",
      title: "Password",
    },
  },
};
