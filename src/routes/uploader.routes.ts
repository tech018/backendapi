import express from "express";
import attachement from "../modules/attachments.module";

const router = express.Router();

router.route("/multi").post(attachement.uploader);

export default router;
