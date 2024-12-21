export const fileSettings = {
  image: {
    acceptedTypes: ["image/png", "image/jpeg"],
    maxSizeInBytes: 2 * 1024 * 1024, // 2 MB
    errorMessage: "Invalid file type. Only PNG, JPEG files under 2MB are allowed.",
  },
  model: {
    acceptedTypes: ["glb", "model/gltf-binary"],
    maxSizeInBytes: 10 * 1024 * 1024, // 10 MB
    errorMessage: "Invalid file type. Only GLB files under 10MB are allowed.",
  },
};
