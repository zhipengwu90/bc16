import { BlobServiceClient } from "@azure/storage-blob";

export async function POST(request) {
  try {
    const { fileName, folderName, jsonData } = await request.json();

    const SAS_URL = process.env.NEXT_MODIFY_SAS_URL;

    const blobService = new BlobServiceClient(SAS_URL);

    const containerClient = blobService.getContainerClient(folderName);

    // Generate a blob name based on the folder name
    const blobName = fileName;

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Check if the blob already exists
    const blobExists = await blockBlobClient.exists();
    const updatedJsonData = JSON.stringify(jsonData, null, 2);
    if (blobExists) {
      // Trim ".json" from fileName
      const trimmedFileName = fileName.replace(".json", "");

      // Generate a blob name based on the trimmed fileName and append Date.now()
      const newBlobName = `${trimmedFileName}_${Date.now()}.json`;
      const newBlockBlobClient =
        containerClient.getBlockBlobClient(newBlobName);
      await newBlockBlobClient.upload(updatedJsonData, updatedJsonData.length);
    } else {

      await blockBlobClient.upload(updatedJsonData, updatedJsonData.length);
    }

    return new Response("success", { status: 200 });
  } catch (error) {
    console.error("Caught an error:", error);
    return new Response(error.message, { status: 500 });
  }
}
