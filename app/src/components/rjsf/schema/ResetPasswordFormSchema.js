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
      format: "password",
    },
    passwordNew: {
      type: "string",
      title: "New Password",
      format: "password",
    },
  },
};
