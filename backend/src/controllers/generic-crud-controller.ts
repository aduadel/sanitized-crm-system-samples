import type { RequestHandler } from "express";
import * as crudService from "../services/generic-crud-service.js";
import { paginate } from "../utils/pagination-helper.js";

const DEFAULT_PAGE_SIZE = 50;

export const getAllRecords = (entityName: string): RequestHandler =>
  async (req, res) => {
    try {
      const records = await crudService.getAllRecords(entityName);
      const page = req.query.page ? parseInt(String(req.query.page), 10) : null;
      const limit = req.query.limit
        ? parseInt(String(req.query.limit), 10)
        : DEFAULT_PAGE_SIZE;

      if (!page) {
        return res.status(200).json(records);
      }

      return res.status(200).json(paginate(records, page, limit));
    } catch (error) {
      console.error("getAllRecords error:", error);
      return res.status(500).json({ message: "Failed to fetch records" });
    }
  };

export const getRecordById = (entityName: string): RequestHandler =>
  async (req, res) => {
    try {
      const record = await crudService.getRecordById(
        entityName,
        String(req.params.id),
      );

      if (!record) {
        return res.status(404).json({ message: "Record not found" });
      }

      return res.status(200).json(record);
    } catch (error) {
      console.error("getRecordById error:", error);
      return res.status(500).json({ message: "Failed to fetch record" });
    }
  };

export const createRecord = (entityName: string): RequestHandler =>
  async (req, res) => {
    try {
      const payload = { ...req.body } as Record<string, unknown>;

      if (req.user?.id) {
        payload.createdBy = req.user.id;
        payload.updatedBy = req.user.id;
      }

      const record = await crudService.createRecord(entityName, payload);
      return res.status(201).json(record);
    } catch (error) {
      console.error("createRecord error:", error);
      return res.status(500).json({ message: "Failed to create record" });
    }
  };

export const updateRecord = (entityName: string): RequestHandler =>
  async (req, res) => {
    try {
      const payload = { ...req.body } as Record<string, unknown>;

      if (req.user?.id) {
        payload.updatedBy = req.user.id;
      }

      const record = await crudService.updateRecord(
        entityName,
        String(req.params.id),
        payload,
      );

      if (!record) {
        return res.status(404).json({ message: "Record not found" });
      }

      return res.status(200).json(record);
    } catch (error) {
      console.error("updateRecord error:", error);
      return res.status(500).json({ message: "Failed to update record" });
    }
  };

export const deleteRecord = (entityName: string): RequestHandler =>
  async (req, res) => {
    try {
      const success = await crudService.deleteRecord(
        entityName,
        String(req.params.id),
      );

      if (!success) {
        return res.status(404).json({ message: "Record not found" });
      }

      return res.status(200).json({ message: "Record deleted successfully" });
    } catch (error) {
      console.error("deleteRecord error:", error);
      return res.status(500).json({ message: "Failed to delete record" });
    }
  };
