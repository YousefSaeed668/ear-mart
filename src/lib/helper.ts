type UploadedImage = {
  FileUrl: string;
};
export async function uploadFiles(files: File[]) {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("Files", file);
  });

  const response = await fetch(
    "https://ear-mart.runasp.net/api/File/UploadeFiles",
    {
      method: "POST",
      body: formData,
    }
  );
  if (!response.ok) {
    throw new Error("Failed to Upload Images");
  }
  const data: UploadedImage[] = await response.json();

  return data.map((item) => item.FileUrl);
}
