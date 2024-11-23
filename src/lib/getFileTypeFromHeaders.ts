import axios from "axios";

export async function getFileTypeFromHeaders(url: string) {
  try {
    if (!url) {
      return null;
    }
    const response = await axios.head(url);
    const contentType = response.headers["content-type"];

    if (contentType) {
      if (contentType.includes("image")) {
        return "image";
      } else if (contentType.includes("pdf")) {
        return "pdf";
      }
    }
    return "unknown";
  } catch (error) {
    console.error("Error:", error);
    return "unknown";
  }
}
