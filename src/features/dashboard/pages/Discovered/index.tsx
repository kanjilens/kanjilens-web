import { useEffect, useState } from "react";

import { DiscoveredFilter } from "@features/dashboard/components/DiscoveredFilter";
import { PaginationControls } from "@components/ui/Button/PaginationControls";

import { useFilteredPagination } from "@shared/hooks/useFilteredPagination";
import Header from "@components/layout/Header";
import type { DashboardContentProps } from "@features/dashboard";
import { DashboardWrapper } from "@features/dashboard/components/DashboardWrapper";
import {
  KanjiStatus,
  type Kanji,
} from "@features/kanji/types/kanji.types";
import { CardList } from "@features/kanji/components/KanjiCard/CardList";
import { CardListSkeletom } from "@features/kanji/components/KanjiCard/CardListSkeleton";
import { useKanji } from "@features/kanji/hooks/useKanji";
import {
  discoveredFilter,
  type DiscoveredFilters,
} from "@features/iam/utils/filter";

const sortOptions = (
  [KanjiStatus.SEEN, KanjiStatus.NEW] as const
).map((category) => ({
  value: category,
  label:
    category.charAt(0).toUpperCase() + category.slice(1),
}));

export const DiscoveredContent = ({
  description,
  name,
  buttons,
}: DashboardContentProps) => {
  const getItemsPerPage = () => {
    if (typeof window === "undefined") return 8;
    if (window.innerWidth < 640) return 4;
    if (window.innerWidth < 1024) return 6;
    return 8;
  };

  const [itemsPerPage, setItemsPerPage] =
    useState(getItemsPerPage);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
    };

    window.addEventListener("resize", handleResize);
    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

  const { kanjis, loading } = useKanji();

  const {
    data: paginatedData,
    filters,
    updateFilters,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useFilteredPagination<Kanji, DiscoveredFilters>({
    data: kanjis,
    itemsPerPage,
    initialFilters: {
      search: "",
      sort: "",
    },
    filterFn: discoveredFilter,
  });

  const renderComponent = () => {
    if (loading) {
      return <CardListSkeletom length={8} />;
    }
    if (paginatedData.length === 0 && !loading) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center text-gray-600">
          <div className="text-4xl font-bold text-center items-center flex">
            <span className="material-symbols-outlined lg">
              search
            </span>
            何も見つかりませんでした
          </div>
          <p className="mt-4 text-lg">
            Nenhum item encontrado — tente outra busca ou
            remova filtros
          </p>
          <div className="mt-2 text-2xl">
            漢字 • 見付 • 探
          </div>
        </div>
      );
    }

    return <CardList data={paginatedData} />;
  };

  return (
    <DashboardWrapper
      smallPadding="p-4 pt-[70px]"
      backgroundImage="src/assets/images/discovered_background.svg"
      backgroundColor="#eef2f1"
    >
      <Header
        description={description}
        name={name}
        titleVariant="h4"
      >
        {buttons}
      </Header>
      <div className="flex flex-col pb-[36px] h-full justify-start gap-8">
        <DiscoveredFilter
          search={filters.search}
          sort={filters.sort}
          sortOptions={sortOptions}
          onSearchChange={(value) =>
            updateFilters({
              search: value,
            })
          }
          onSortChange={(value) =>
            updateFilters({
              sort: value,
            })
          }
        />
        <div className="flex flex-col justify-between h-full">
          {renderComponent()}
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            maxButtons={3}
          />
        </div>
      </div>
    </DashboardWrapper>
  );
};
