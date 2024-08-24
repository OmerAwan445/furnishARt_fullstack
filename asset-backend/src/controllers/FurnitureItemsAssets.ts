import { catchAsyncError } from "@src/utils/catchAsyncError";
import { Request } from "express";
import path from "path";
import fs from 'fs';
import { AppError } from "@src/Errors/AppError";
/*  */
const modelsDirectory = path.resolve('src/assets/3D-Models');
const imagesDirectory = path.resolve('src/assets/furniture-images');

export const getFurnitureItem3DModelFromID = catchAsyncError(async (req: Request<{ id?: string }, any, any>, res) => {
    const fileName = req.params.id;
    const glbPath = path.join(modelsDirectory, `${fileName}.glb`);
    const gltfPath = path.join(modelsDirectory, `${fileName}.gltf`);
    
    let modelPath = '';
    
    if (fs.existsSync(glbPath)) {
      modelPath = glbPath;
    } else if (fs.existsSync(gltfPath)) {
        modelPath = gltfPath;
    }
    if (modelPath) {
      res.setHeader('Content-Type', 'model/gltf-binary');
      res.setHeader('Content-Length', fs.statSync(modelPath).size);
        
        res.status(200).sendFile(modelPath);
    } else {
        throw new AppError("Model not found", 404);
    }
});


export const getFurnitureItemImageFromID = catchAsyncError(async (req: Request<{ productId?: string, fileName?: string }, any, any>, res) => {
    const { productId, fileName } = req.params;
    if (!productId || !fileName) {
        throw new AppError("ProductId and fileName are required", 400);
    }

    const imagePath = path.join(imagesDirectory, productId, fileName);

    if (fs.existsSync(imagePath)) {
      res.status(200).sendFile(imagePath);
    } else {
      res.status(404).send('Image not found');
    }
});
