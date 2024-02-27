export const loginFormSchema = {
  title: "Login Form",
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
