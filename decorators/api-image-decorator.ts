import { applyDecorators, UnsupportedMediaTypeException, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { multerStorage, storageDir } from "../utils/storage";
import * as path from "path";

export function ApiImage() {
    return applyDecorators(
        UseInterceptors(
            FileFieldsInterceptor(
                [
                    {
                        name: "image",
                        maxCount: 1
                    }
                ],
                {
                    storage: multerStorage(path.join(storageDir(), "streamer-images")),
                    fileFilter: (req, file, callback) => {
                        if (!file.mimetype.startsWith("image/")) {
                            return callback(
                                new UnsupportedMediaTypeException("Only image files are allowed"),
                                false
                            );
                        }
                        callback(null, true);
                    }
                }
            )
        ),
    );
}
