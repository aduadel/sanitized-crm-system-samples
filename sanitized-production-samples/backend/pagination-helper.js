/**
 * Paginate an array of items.
 *
 * @param {Array} data - The full dataset to paginate.
 * @param {number} [page=1] - The current page number (1-based).
 * @param {number} [itemsPerPage=10] - Number of items per page.
 * @returns {{
 *   totalItems: number,
 *   totalPages: number,
 *   currentPage: number,
 *   items: Array
 * }}
 *
 * @example
 * const result = paginate(users, 2, 5);
 * console.log(result.items); // Returns items from page 2
 */
export const paginate = (data, page = 1, itemsPerPage = 10) => {
  // Validate input
  if (!Array.isArray(data)) {
    throw new Error("Expected 'data' to be an array.");
  }

  const currentPage = Number(page);
  const limit = Number(itemsPerPage);

  if (currentPage < 1 || isNaN(currentPage)) {
    throw new Error("Invalid 'page' value. Must be a positive number.");
  }

  if (limit < 1 || isNaN(limit)) {
    throw new Error("Invalid 'itemsPerPage' value. Must be a positive number.");
  }

  // Calculate pagination
  const startIndex = (currentPage - 1) * limit;
  const endIndex = Math.min(startIndex + limit, data.length);

  const paginatedItems = data.slice(startIndex, endIndex);

  return {
    totalItems: data.length,
    totalPages: Math.ceil(data.length / limit),
    currentPage,
    items: paginatedItems,
  };
};
