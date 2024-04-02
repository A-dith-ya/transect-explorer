export const addTransectFormSchema = (groupOptions) => {
  return {
    title: "Add Transect",
    type: "object",
    required: ["transectName", "group", "region", "coordinates"],
    properties: {
      transectName: {
        type: "string",
        title: "Transect Name",
      },
      group: {
        title: "Group",
        enum: groupOptions.map((option) => option.label),
      },
      region: {
        title: "Region",
        enum: [
          "Northeast Pacific",
          "Coast and Mountains",
          "Georgian Depression",
          "Central Interior",
          "Sub-Boreal Interior",
          "Southern Interior Mountains",
          "Southern Alaska Mountains",
          "Southern Interior",
          "Boreal Plains",
          "Taiga Plains",
        ],
      },
      observation: {
        title: "Observation",
        type: "string",
        widget: "textarea",
      },
      coordinates: {
        type: "array",
        title: "Coordinates",
        minItems: 3,
        items: {
          type: "string",
        },
      },
      files: {
        type: "array",
        title: "Attachments",
        items: {
          type: "string",
          format: "data-url",
        },
      },
    },
  };
};
