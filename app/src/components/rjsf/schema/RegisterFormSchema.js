export const registerFormSchema = {
  title: "Register Form",
  type: "object",
  required: ["username", "userEmail", "password"],
  properties: {
    username: {
      type: "string",
      title: "Username",
    },
    userEmail: {
      type: "string",
      title: "Email",
    },
    password: {
      type: "string",
      title: "Password",
    },
  },

};
