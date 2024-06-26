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
      minLength: 6,
      maxLength: 50,
    },
    password: {
      type: "string",
      title: "Password",
      format: "password",
    },
  },
};
