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

const loginUISchema = {
  ...authUISchema,
  "ui:order": ["username", "password"],
};

const addTransectUISchema = {
  observation: {
    "ui:widget": "textarea",
  }
}

const UISchemas = { registerUISchema, loginUISchema, addTransectUISchema};


export default UISchemas;
