
// src/mock/searchLocal.ts
import { MOCK_ARTICLES } from "./articles";

export function searchArticlesLocal({
  search = "",
  category,
  tag,
  sortBy = "created_date",     // or 'title'
  sortOrder = "desc",          // 'asc' | 'desc'
  page = 1,
  itemsPerPage = 5,
}) {
  // 1) Filter
  const q = search.trim().toLowerCase();
  let filtered = MOCK_ARTICLES.filter((a) => {
    const matchesText =
      !q ||
      a.title.toLowerCase().includes(q) ||
      a.body.toLowerCase().includes(q);
    const matchesCategory = !category || a.category === category;
    const matchesTag = !tag || a.field_tags?.includes(tag);
    return matchesText && matchesCategory && matchesTag;
  });

  // 2) Sort
  filtered.sort((a, b) => {
    const va = a[sortBy];
    const vb = b[sortBy];

    // handle dates vs strings
    const na = sortBy === "created_date" ? new Date(va).getTime() : String(va).toLowerCase();
    const nb = sortBy === "created_date" ? new Date(vb).getTime() : String(vb).toLowerCase();

    if (na < nb) return sortOrder === "desc" ? -1 : 1;
    if (na > nb) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  console.log(filtered)

  // 3) Pagination
  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  // const start = (page - 1) * itemsPerPage;
  // const pageItems = filtered.slice(start, start + itemsPerPage);

  console.log(totalPages)


  return {
    items: filtered,
    totalPages,
    totalItems,
  };
}
