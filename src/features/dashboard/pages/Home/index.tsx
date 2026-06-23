import Header from "@components/layout/Header";
import {
  SummaryCard,
  SummaryCardSkeleton,
} from "@components/ui/Card/SummaryCard";
import { TextHeader } from "@components/ui/Typography/TextHeader";
import { SectionFallback } from "@components/ui/Global/Skeleton/SectionFallback";
import type { DashboardContentProps } from "@features/dashboard";
import { DashboardSection } from "@features/dashboard/components/DashboardSection";
import { DashboardWrapper } from "@features/dashboard/components/DashboardWrapper";
import {
  formatTodayDate,
  isDateThisWeek,
} from "@shared/utils/date";
import { KanjiStatus } from "@features/kanji/types/kanji.types";
import { useKanji } from "@features/kanji/hooks/useKanji";

const MAX_ITEMS_BY_SECTION = 4;

export const Home = ({
  name,
  description,
}: DashboardContentProps) => {
  const { kanjis, loading } = useKanji();
  const today = formatTodayDate();

  return (
    <DashboardWrapper
      backgroundImage="src/assets/images/discovered_background.svg"
      smallPadding="p-4 pt-[70px]"
      internalClassname="bg-[#EEF2F1] md:bg-[#FFFFFF]"
    >
      <div className="pb-[35px]">
        <Header description={description} name={name} />
        <div className="grid grid-cols-2 gap-[10px] pt-2 sm:flex sm:flex-row sm:flex-wrap sm:gap-[16px] mb-8">
          {loading ? (
            <>
              <SummaryCardSkeleton />
              <SummaryCardSkeleton />
              <SummaryCardSkeleton />
            </>
          ) : (
            <>
              <SummaryCard
                title="Total de kanjis"
                value={kanjis.length}
                description="kanjis cadastrados"
                icon="import_contacts"
              />
              <SummaryCard
                title="kanjis Vistos"
                value={
                  kanjis.filter(
                    (i) => i.status === KanjiStatus.SEEN,
                  ).length
                }
                description="marcados como visto"
                icon="visibility"
              />
              <SummaryCard
                title="Esta semana"
                value={
                  kanjis.filter((i) =>
                    isDateThisWeek(i.addedAt),
                  ).length
                }
                description="kanjis adicionados"
                icon="calendar_today"
              />
            </>
          )}
        </div>
        <DashboardSection
          data={kanjis.filter(
            (_, i) => i < MAX_ITEMS_BY_SECTION,
          )}
          subtitle={today}
          loading={loading}
          emptyComponent={<SectionFallback />}
        >
          <TextHeader
            icon="calendar_today"
            information="Kanjis de Hoje"
            variant="v1"
          />
        </DashboardSection>
        <DashboardSection
          data={kanjis.filter(
            (_, i) => i < MAX_ITEMS_BY_SECTION,
          )}
          subtitle={
            "Últimos kanjis adicionados à sua coleção"
          }
          loading={loading}
          emptyComponent={
            <SectionFallback
              icon=""
              text="Nenhum kanji adicionado"
            />
          }
        >
          <TextHeader
            information="Kanjis Recentes"
            variant="v1"
          />
        </DashboardSection>
      </div>
    </DashboardWrapper>
  );
};
