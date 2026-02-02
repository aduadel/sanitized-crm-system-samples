import * as crudService from "../services/generic-crud-service.js";
import { paginate } from "../utils/pagination-helper.js";

const DEFAULT_PAGE_SIZE = 50;

/**
 * Returns an Express handler that lists all records for a given entity.
 *
 * - If no `page` query param is provided, it returns the full list.
 * - If `page` (and optionally `limit`) are provided, it returns a paginated result.
 *
 * @param {string} entityName - Logical name of the entity/table.
 * @returns {import("express").RequestHandler}
 */
export const getAllRecords = (entityName) => async (req, res) => {
  try {
    const records = await crudService.getAllRecords(entityName);

    const page = req.query.page ? parseInt(req.query.page, 10) : null;
    const limit = req.query.limit
      ? parseInt(req.query.limit, 10)
      : DEFAULT_PAGE_SIZE;

    // If no pagination requested, return full list
    if (!page) {
      return res.status(200).json(records);
    }

    const paginatedResult = paginate(records, page, limit);

    return res.status(200).json(paginatedResult);
  } catch (error) {
    // In a real app, use a logger instead of console.log
    console.error("getAllRecords error:", error);
    return res.status(500).json({ message: "Failed to fetch records" });
  }
};

/**
 * Returns an Express handler that fetches a single record by id.
 *
 * @param {string} entityName - Logical name of the entity/table.
 * @returns {import("express").RequestHandler}
 */
export const getRecordById = (entityName) => async (req, res) => {
  try {
    const { id } = req.params;
    const record = await crudService.getRecordById(entityName, id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    return res.status(200).json(record);
  } catch (error) {
    console.error("getRecordById error:", error);
    return res.status(500).json({ message: "Failed to fetch record" });
  }
};

/**
 * Returns an Express handler that creates a new record.
 *
 * Optionally attaches `createdBy` / `updatedBy` audit fields
 * if `req.user` is present (set by an auth middleware).
 *
 * @param {string} entityName - Logical name of the entity/table.
 * @returns {import("express").RequestHandler}
 */
export const createRecord = (entityName) => async (req, res) => {
  try {
    // Example: attach audit fields if your auth middleware sets req.user
    if (req.user?.id) {
      req.body.createdBy = req.user.id;
      req.body.updatedBy = req.user.id;
    }

    const newRecord = await crudService.createRecord(entityName, req.body);
    return res.status(201).json(newRecord);
  } catch (error) {
    console.error("createRecord error:", error);
    return res.status(500).json({ message: "Failed to create record" });
  }
};

/**
 * Returns an Express handler that updates an existing record by id.
 *
 * @param {string} entityName - Logical name of the entity/table.
 * @returns {import("express").RequestHandler}
 */
export const updateRecord = (entityName) => async (req, res) => {
  try {
    const { id } = req.params;

    // Example: track who updated the record
    if (req.user?.id) {
      req.body.updatedBy = req.user.id;
    }

    const updatedRecord = await crudService.updateRecord(
      entityName,
      id,
      req.body
    );

    if (!updatedRecord) {
      return res.status(404).json({ message: "Record not found" });
    }

    return res.status(200).json(updatedRecord);
  } catch (error) {
    console.error("updateRecord error:", error);
    return res.status(500).json({ message: "Failed to update record" });
  }
};

/**
 * Returns an Express handler that deletes a record by id.
 *
 * @param {string} entityName - Logical name of the entity/table.
 * @returns {import("express").RequestHandler}
 */
export const deleteRecord = (entityName) => async (req, res) => {
  try {
    const { id } = req.params;
    const success = await crudService.deleteRecord(entityName, id);

    if (!success) {
      return res.status(404).json({ message: "Record not found" });
    }

    return res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error("deleteRecord error:", error);
    return res.status(500).json({ message: "Failed to delete record" });
  }
};
