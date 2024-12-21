import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getEnv } from "@src/utils/getEnv";

class CloudflareService {
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
      throw new Error(`File upload failed: ${error}`);
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
}

export const cloudflareService = new CloudflareService();
