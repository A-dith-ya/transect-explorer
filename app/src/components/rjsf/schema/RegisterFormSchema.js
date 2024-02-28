export const registerFormSchema = {
  title: "Register Form",
  type: "object",
  required: ["username", "email", "password"],
  properties: {
    username: {
      type: "string",
      title: "Username",
    },
    email: {
      type: "string",
      title: "Email",
    },
    password: {
      type: "string",
      title: "Password",
    },
  },
};
