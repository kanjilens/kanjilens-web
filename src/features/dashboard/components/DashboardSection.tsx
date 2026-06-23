import type { PropsWithChildren, ReactNode } from "react";
import { Typography } from "@components/ui/Typography";
import type { Kanji } from "@features/kanji/types/kanji.types";
import { CardListSkeletom } from "@features/kanji/components/KanjiCard/CardListSkeleton";
import type { CardVariants } from "@features/kanji/types";
import { CardList } from "@features/kanji/components/KanjiCard/CardList";

export const DashboardSection = ({
  data,
  loading,
  subtitle,
  children,
  emptyComponent,
}: {
  data: Kanji[];
  subtitle: string;
  loading: boolean;
  emptyComponent: ReactNode;
} & PropsWithChildren) => {
  const childrenArray = Array.isArray(children)
    ? children
    : [children];

  const variant: CardVariants = "start";

  const renderComponent = () => {
    if (loading) {
      return <CardListSkeletom />;
    }
    if (data.length === 0 && !loading) {
      return emptyComponent;
    }
    return <CardList data={data} variant={variant} />;
  };
  return (
    <section className="flex flex-col bg-[#FFFFFF] gap-1 p-6 min-h-[266px] mb-4 border-2 border-[#077A7D] rounded-[14px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      {childrenArray[0]}
      {subtitle && (
        <Typography variant="subtitle" className="pb-4">
          {subtitle}
        </Typography>
      )}
      {renderComponent()}
    </section>
  );
};
