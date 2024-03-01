// --------------------------------- Authentication UI Schema ----------------------------------

const authUISchema = {
  username: {},
  password: {
    "ui:widget": "password",
  },
};

const registerUISchema = {
  ...authUISchema,
  email: {},
  "ui:order": ["username", "email", "password"],
};

const loginUISchema = {
  ...authUISchema,
  "ui:order": ["username", "password"],
};

const UISchemas = { registerUISchema, loginUISchema };

export default UISchemas;
