import { Router } from "express";
import {
  createRecord,
  deleteRecord,
  getAllRecords,
  getRecordById,
  updateRecord,
} from "../controllers/generic-crud-controller.js";

export const entityRouter = Router();

entityRouter.get("/:entity", (req, res, next) => {
  return getAllRecords(String(req.params.entity))(req, res, next);
});

entityRouter.get("/:entity/:id", (req, res, next) => {
  return getRecordById(String(req.params.entity))(req, res, next);
});

entityRouter.post("/:entity", (req, res, next) => {
  return createRecord(String(req.params.entity))(req, res, next);
});

entityRouter.put("/:entity/:id", (req, res, next) => {
  return updateRecord(String(req.params.entity))(req, res, next);
});

entityRouter.delete("/:entity/:id", (req, res, next) => {
  return deleteRecord(String(req.params.entity))(req, res, next);
});
