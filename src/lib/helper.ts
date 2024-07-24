export async function uploadFiles(files: File[]) {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("Files", file);
  });

  const response = await fetch(
    "http://ear-mart.runasp.net/api/File/UploadeFiles",
    {
      method: "POST",
      body: formData,
    }
  );
  if (!response.ok) {
    throw new Error("Failed to Upload Images");
  }
  const data = await response.json();
  return data;
}
