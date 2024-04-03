export const resetEmailFormSchema = {
  title: "Reset Email",
  type: "object",
  required: ["username", "emailNew", "password"],
  properties: {
    username: {
      type: "string",
      title: "Username",
    },
    password: {
      type: "string",
      title: "Password",
      format: "password",
    },
    emailNew: {
      type: "string",
      title: "New Email",
      format: "email",
    },
  },
};
