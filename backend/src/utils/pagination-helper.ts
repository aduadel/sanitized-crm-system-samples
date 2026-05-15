export type PaginatedResult<T> = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  items: T[];
};

export function paginate<T>(
  data: T[],
  page = 1,
  itemsPerPage = 10,
): PaginatedResult<T> {
  if (!Array.isArray(data)) {
    throw new Error("Expected 'data' to be an array.");
  }

  const currentPage = Number(page);
  const limit = Number(itemsPerPage);

  if (currentPage < 1 || Number.isNaN(currentPage)) {
    throw new Error("Invalid 'page' value. Must be a positive number.");
  }

  if (limit < 1 || Number.isNaN(limit)) {
    throw new Error("Invalid 'itemsPerPage' value. Must be a positive number.");
  }

  const startIndex = (currentPage - 1) * limit;
  const endIndex = Math.min(startIndex + limit, data.length);

  return {
    totalItems: data.length,
    totalPages: Math.ceil(data.length / limit),
    currentPage,
    items: data.slice(startIndex, endIndex),
  };
}
