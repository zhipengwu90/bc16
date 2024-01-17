import { BlobServiceClient } from "@azure/storage-blob";
export async function POST(request) {
  const dataJson = await request.json();
  const data = [dataJson];
  try {
    const SAS_URL = process.env.NEXT_PUBLIC_SAS_URL;

    const blobService = new BlobServiceClient(SAS_URL);

    const containerClient = blobService.getContainerClient("verified");

    // Generate a blob name based on the folder name
    const blobName = `${dataJson.folderName}.json`;

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    // Check if the blob already exists

    const blobExists = await blockBlobClient.exists();

    if (blobExists) {
      // If blob exists, download the existing JSON data
      const existingData = await blockBlobClient.downloadToBuffer();
      const existingJson = existingData.toString();

      // Parse the existing JSON data
      let existingJsonArray;
      try {
        existingJsonArray = JSON.parse(existingJson);
      } catch (error) {
        console.error(`Error parsing existing JSON: ${error}`);
        return;
      }

      // Append new data to existing JSON array
      existingJsonArray = [...existingJsonArray, ...data];
      console.log(existingJsonArray);
      // Convert the updated data to JSON string
      const updatedJsonData = JSON.stringify(existingJsonArray, null, 2);

      // Upload the updated JSON data to the blob
      await blockBlobClient.upload(updatedJsonData, updatedJsonData.length, {
        blobHTTPHeaders: { blobContentType: "application/json" },
      });
      return new Response("Success", { status: 200 });
    } else {
      // If blob doesn't exist, create a new JSON array
      const jsonData = JSON.stringify(data, null, 2);

      //     // Upload the new JSON array to the blob
      await blockBlobClient.upload(jsonData, jsonData.length, {
        blobHTTPHeaders: { blobContentType: "application/json" },
      });
      return new Response("Success", { status: 200 });
    }
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}
