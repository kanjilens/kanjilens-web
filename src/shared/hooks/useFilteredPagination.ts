import { useCallback, useMemo, useState } from "react";

interface UseFilteredPaginationProps<T, F> {
  data: T[];
  itemsPerPage?: number;
  initialFilters: F;
  filterFn: (item: T, filters: F) => boolean;
}

export function useFilteredPagination<T, F>({
  data,
  itemsPerPage = 10,
  initialFilters,
  filterFn,
}: UseFilteredPaginationProps<T, F>) {
  const [filters, setFilters] = useState<F>(initialFilters);

  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    return data.filter((item) => filterFn(item, filters));
  }, [data, filters, filterFn]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredData.length / itemsPerPage),
  );

  const pageData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;

    const end = start + itemsPerPage;

    return filteredData.slice(start, end);
  }, [filteredData, currentPage, itemsPerPage]);

  const updateFilters = useCallback(
    (partial: Partial<F>) => {
      setFilters((prev) => ({
        ...prev,
        ...partial,
      }));

      setCurrentPage(1);
    },
    [setFilters, setCurrentPage],
  );

  return {
    filters,
    updateFilters,

    currentPage,
    setCurrentPage,

    totalPages,

    data: pageData,

    totalItems: filteredData.length,
  };
}
