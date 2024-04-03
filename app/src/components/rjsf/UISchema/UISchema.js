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
  "ui:order": ["username", "userEmail", "password"],
};

const resetUsernameUISchema = {
  ...authUISchema,
  usenameNew: {},
  "ui:order": ["username", "usernameNew", "password"],
};

const resetEmailUISchema = {
  ...authUISchema,
  usenameNew: {},
  password: {
    "ui:widget": "password",
  },

  "ui:order": ["email", "emailNew", "password"],
};

const resetPasswordUISchema = {
  ...authUISchema,
  password: {
    "ui:widget": "password",
  },
  passwordNew: {
    "ui:widget": "password",
  },
  "ui:order": ["email", "password", "passwordNew"],
};

const loginUISchema = {
  ...authUISchema,
  "ui:order": ["username", "password"],
};

const addTransectUISchema = {
  observation: {
    "ui:widget": "textarea",
  },
};

const deleteTransectUISchema = {
  delete: {
    "ui:widget": "text",
  },
};

const UISchemas = {
  registerUISchema,
  loginUISchema,
  addTransectUISchema,
  deleteTransectUISchema,
  resetUsernameUISchema,
  resetEmailUISchema,
  resetPasswordUISchema,
};

export default UISchemas;
