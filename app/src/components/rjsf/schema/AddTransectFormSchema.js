export const addTransectFormSchema = {

    title: "Add Transect",
    type: "object",
    required: ["transectName", "region", "coordinates"],
    properties: {
        transectName: {
            type: "string",
            title: "Transect Name",
        },
        region: {
            title: "Region",
            enum: ["Option 1", "Option 2", "Option 3"],
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
            }
        },
        files: {
            type:"array",
            title: "Attachments",
            items:{
                type: "string",
                format: "data-url",
            }
        }
    },
  };