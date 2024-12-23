import { DeleteObjectCommand, DeleteObjectsCommand, HeadObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { AppError } from "@src/errors/AppError";
import { getEnv } from "@src/utils/getEnv";

export class CloudflareService {
  private s3Client: S3Client;
  private endpoint = getEnv("Cloudflare.endpoint")!;
  private accessKey = getEnv("Cloudflare.accessKey")!;
  private secretKey = getEnv("Cloudflare.secretKey")!;
  private bucketName = getEnv("Cloudflare.bucket_name")!;
  private bucketPublicUrl = getEnv("Cloudflare.bucket_public_url")!;

  constructor() {
    this.s3Client = new S3Client({
      region: "auto",
      endpoint: this.endpoint, // Cloudflare R2 endpoint
      credentials: {
        accessKeyId: this.accessKey,
        secretAccessKey: this.secretKey,
      },
    });
  }

  public async uploadFile(buffer: Buffer, key: string, contentType: string): Promise<string> {
    const params = {
      Bucket: this.bucketName,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    };

    try {
      await this.s3Client.send(new PutObjectCommand(params));
      const fileUrl = `${this.bucketPublicUrl}/${key}`;
      return fileUrl;
    } catch (error) {
      throw new AppError(`File upload failed: ${error}`, 400);
    }
  }

  public async uploadImageFiles(files: any, folderName: string): Promise<string[]> {
    const urls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const originalExtension = files[i].originalname.split(".").pop();
      const key = `${folderName}/${i + 1}.${originalExtension}`;
      const url = await this.uploadFile(files[i].buffer, key, files[i].mimetype);
      urls.push(url);
    }

    return urls;
  }

  public async uploadModelFile(file: any, folderName: string, itemId: number): Promise<string> {
    const originalExtension = file.originalname.split(".").pop();
    const key = `${folderName}/${itemId}.${originalExtension}`;
    const url = await this.uploadFile(file.buffer, key, file.mimetype);
    return url;
  }
  public async deleteModel(folderName: string, itemId: number, extension: string): Promise<void> {
    const key = `${folderName}/${itemId}.${extension}`;
    const params = {
      Bucket: this.bucketName,
      Key: key,
    };

    try {
      // Check if the object exists
      const headParams = { Bucket: this.bucketName, Key: key };
      const headResponse = await this.s3Client.send(new HeadObjectCommand(headParams));

      if (headResponse) {
        // Object exists, proceed to delete
        await this.s3Client.send(new DeleteObjectCommand(params));
      }
    } catch (error: any) {
      // If the error is because the object does not exist, ignore it
      if (error.name !== "NotFound") {
        throw new AppError(`Failed to delete model: ${error.message}`, 400);
      }
    }
  }
  public async deleteFolder(folderName: string): Promise<void> {
    try {
      // List all objects in the folder
      const listParams = {
        Bucket: this.bucketName,
        Prefix: `${folderName}/`,
      };

      const listResponse = await this.s3Client.send(new ListObjectsV2Command(listParams));

      if (!listResponse.Contents || listResponse.Contents.length === 0) {
        // Gracefully handle empty folder
        console.log(`No files found in folder: ${folderName}`);
        return;
      }

      // Prepare delete objects array
      const objectsToDelete = listResponse.Contents.map((object) => ({
        Key: object.Key!,
      }));

      // Delete all objects in the folder
      const deleteParams = {
        Bucket: this.bucketName,
        Delete: { Objects: objectsToDelete },
      };

      await this.s3Client.send(new DeleteObjectsCommand(deleteParams));
    } catch (error: any) {
      throw new AppError(`Failed to delete folder: ${error.message}`, 400);
    }
  }
}

export const cloudflareService = new CloudflareService();
