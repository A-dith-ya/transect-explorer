export const loginFormSchema = {
  title: "Login",
  type: "object",
  required: ["username", "password"],
  properties: {
    username: {
      type: "string",
      title: "Username",
    },
    password: {
      type: "string",
      title: "Password",
    },
  },
};
