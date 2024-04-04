export const registerFormSchema = {
  title: "Register Form",
  type: "object",
  required: ["username", "userEmail", "password"],
  properties: {
    username: {
      type: "string",
      title: "Username",
      minLength: 6,
      maxLength: 20,
    },
    userEmail: {
      type: "string",
      title: "Email",
      format: "email",
    },
    password: {
      type: "string",
      title: "Password",
      minLength: 8,
      maxLength: 20,
    },
  },
};