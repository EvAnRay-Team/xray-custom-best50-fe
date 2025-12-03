const files = import.meta.glob("./**/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export const getAsset = (relativePath: string) => files[`./${relativePath}`];

export default files;
