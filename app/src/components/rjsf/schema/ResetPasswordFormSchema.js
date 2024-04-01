export const resetPasswordFormSchema = {
  title: "Reset Password",
  type: "object",
  required: ["username", "password", "passwordNew"],
  properties: {
    username: {
      type: "string",
      title: "Username",
    },
    password: {
      type: "string",
      title: "Password",
    },
    passwordNew: {
      type: "string",
      title: "New Password",
    },
  },
};
