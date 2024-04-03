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
      format: "email",
    },
    password: {
      type: "string",
      title: "Password",
    },
  },
};
