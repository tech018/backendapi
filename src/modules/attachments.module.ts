import multer from "multer";
import { Request, Response } from "express";
import attachment from "../service/attachments.service";
import httpStatus from "http-status";

const uploader = async (req: Request, res: Response) => {
  try {
    await attachment.uploadAttachments(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        res
          .status(httpStatus.BAD_REQUEST)
          .json({
            message: `uploading error: ${err.message}`,
          })
          .end();
        return;
      } else if (err) {
        // An unknown error occurred when uploading.
        if (err.name == "ExtensionError") {
          res
            .status(httpStatus.REQUEST_ENTITY_TOO_LARGE)
            .json({ message: err.message })
            .end();
        } else {
          res
            .status(httpStatus.BAD_REQUEST)
            .json({
              message: `unknown uploading error: ${err.message}`,
            })
            .end();
        }
        return;
      }
      res.status(httpStatus.OK).json({ data: req.files });
    });
  } catch (error) {
    console.log("error 500", error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

export default {
  uploader,
};
