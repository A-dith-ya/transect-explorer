export const resetUsernameFormSchema = {
  title: "Reset Username",
  type: "object",
  required: ["username", "usernameNew", "password"],
  properties: {
    username: {
      type: "string",
      title: "Username",
    },
    usernameNew: {
      type: "string",
      title: "New Username",
    },
    password: {
      type: "string",
      title: "Password",
      format: "password",
    },
  },
};
