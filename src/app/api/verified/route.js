import { BlobServiceClient } from "@azure/storage-blob";
export async function POST(request) {
  try {
    const dataJson = await request.json();
    const data = [dataJson];
    console.log(data);
    const SAS_URL = process.env.NEXT_PUBLIC_SAS_URL;
    console.log(SAS_URL);
    const blobService = new BlobServiceClient(SAS_URL);
    console.log("url" + blobService);
    const containerClient = blobService.getContainerClient("verified");
    console.log("containerClient" + containerClient);
    // Generate a blob name based on the folder name
    const blobName = `${dataJson.folderName}.json`;

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    console.log("blockBlobClient" + blockBlobClient);
    // Check if the blob already exists

    // const blobExists = await blockBlobClient.exists();
    // console.log("blobExists" + blobExists);

    // if (blobExists) {
    //   // If blob exists, download the existing JSON data
    //   const existingData = await blockBlobClient.downloadToBuffer();
    //   console.log("existingData" + existingData);
    //   const existingJson = existingData.toString();

    //   // Parse the existing JSON data
    //   let existingJsonArray;
    //   try {
    //     existingJsonArray = JSON.parse(existingJson);
    //   } catch (error) {
    //     console.error(`Error parsing existing JSON: ${error}`);
    //     return;
    //   }

    //   // Append new data to existing JSON array
    //   existingJsonArray = [...existingJsonArray, ...data];
    //   console.log(existingJsonArray);
    //   // Convert the updated data to JSON string
    //   const updatedJsonData = JSON.stringify(existingJsonArray, null, 2);

    //   // Upload the updated JSON data to the blob
    //   await blockBlobClient.upload(updatedJsonData, updatedJsonData.length, {
    //     blobHTTPHeaders: { blobContentType: "application/json" },
    //   });
    //   return new Response("Success", { status: 200 });
    // } else {
    // If blob doesn't exist, create a new JSON array
    const jsonData = JSON.stringify(data, null, 2);
    console.log("jsonData" + jsonData);
    //     // Upload the new JSON array to the blob
    try {
      //   await blockBlobClient.upload(jsonData, jsonData.length, {
      //     blobHTTPHeaders: { blobContentType: "application/json" },
      //   });

      const uploadBlobResponse = await blockBlobClient.upload(
        jsonData,
        jsonData.length
      );
      console.log("uploading");
    } catch (error) {
      console.error("Caught an uploading error:", error);
      return new Response(error.message, { status: 500 });
    } finally {
      console.log(`File "${blobName}" updated successfully.`);
      return new Response("Success", { status: 200 });
    }

    // }
  } catch (error) {
    console.error("Caught an outside error:", error);
    return new Response(error.message, { status: 500 });
  }
}
