import { randomUUID } from "node:crypto";
import { sampleStore, type SampleEntityRecord } from "../data/sample-store.js";

function getEntityRecords(entityName: string): SampleEntityRecord[] {
  return sampleStore[entityName] ?? [];
}

export async function getAllRecords(entityName: string) {
  return getEntityRecords(entityName);
}

export async function getRecordById(entityName: string, id: string) {
  return getEntityRecords(entityName).find((record) => record.id === id) ?? null;
}

export async function createRecord(
  entityName: string,
  payload: Record<string, unknown>,
) {
  const nextRecord = {
    id: randomUUID(),
    ...payload,
  };

  if (!sampleStore[entityName]) {
    sampleStore[entityName] = [];
  }

  sampleStore[entityName].push(nextRecord);
  return nextRecord;
}

export async function updateRecord(
  entityName: string,
  id: string,
  payload: Record<string, unknown>,
) {
  const records = getEntityRecords(entityName);
  const index = records.findIndex((record) => record.id === id);

  if (index === -1) {
    return null;
  }

  records[index] = {
    ...records[index],
    ...payload,
    id,
  };

  return records[index];
}

export async function deleteRecord(entityName: string, id: string) {
  const records = getEntityRecords(entityName);
  const index = records.findIndex((record) => record.id === id);

  if (index === -1) {
    return false;
  }

  records.splice(index, 1);
  return true;
}
