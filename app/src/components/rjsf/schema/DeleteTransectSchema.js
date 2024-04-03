export const deleteTransectFormSchema = {
  title: "Delete Transect",
  type: "object",
  required: ["delete"],
  properties: {
    delete: {
      type: "string",
      title: "Type 'delete transect' to confirm",
    },
  },
};
