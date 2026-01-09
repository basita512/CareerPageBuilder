import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { asyncHandler } from '../utils/errors.util';
import { ApiError } from '../utils/errors.util';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export class UploadController {
    // Helper to handle stream upload
    private static uploadToCloudinary(file: Express.Multer.File, options: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
                if (error) return reject(new ApiError(500, 'Cloudinary upload failed'));
                resolve(result);
            });
            uploadStream.end(file.buffer);
        });
    }

    static uploadImage = asyncHandler(async (req: Request, res: Response) => {
        if (!req.file) {
            throw new ApiError(400, 'No file provided');
        }

        const result = await UploadController.uploadToCloudinary(req.file, {
            folder: 'careers-builder',
            transformation: [
                { width: 1920, height: 1080, crop: 'limit' },
                { quality: 'auto', fetch_format: 'auto' },
            ],
        });

        res.json({
            success: true,
            data: {
                url: result.secure_url,
                publicId: result.public_id,
            },
        });
    });

    static uploadVideo = asyncHandler(async (req: Request, res: Response) => {
        if (!req.file) {
            throw new ApiError(400, 'No file provided');
        }

        const result = await UploadController.uploadToCloudinary(req.file, {
            folder: 'careers-builder/videos',
            resource_type: 'video',
        });

        res.json({
            success: true,
            data: {
                url: result.secure_url,
                publicId: result.public_id,
            },
        });
    });

    static uploadResume = asyncHandler(async (req: Request, res: Response) => {
        if (!req.file) {
            throw new ApiError(400, 'No file provided');
        }

        const result = await UploadController.uploadToCloudinary(req.file, {
            folder: 'careers-builder/resumes',
            resource_type: 'auto',
            use_filename: true,
            unique_filename: true,
        });

        res.json({
            success: true,
            data: {
                url: result.secure_url,
                publicId: result.public_id,
                originalName: req.file.originalname
            },
        });
    });
}
