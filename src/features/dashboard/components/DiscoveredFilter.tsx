import { Input } from "@components/ui/Input";
import { Select } from "@components/ui/Input/Select";

interface DiscoveredFilterProps {
  search: string;
  sort: string;

  sortOptions: {
    value: string;
    label: string;
  }[];

  onSearchChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

export const DiscoveredFilter = ({
  search,
  sort,
  sortOptions,
  onSearchChange,
  onSortChange,
}: DiscoveredFilterProps) => {
  return (
    <div className="flex flex-row flex-wrap lg:flex-nowrap gap-0 lg:gap-4 justify-between items-center mb-1">
      <Input
        value={search}
        placeholder="Buscar Kanjis..."
        icon="search"
        label="Buscar"
        showLabel={false}
        iconClassName="text-[#0D9488] sm2"
        containerClassname="w-full h-fit lg:min-h-[62px]"
        className="outline-none text-[14px] w-full"
        wrapperClassName="bg-[#FFFFFF] rounded-[8px] w-full border-[#E5E7EB]"
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <Select
        value={sort}
        defaultOption="Todos"
        label="Selecionar Filtro"
        showLabel={false}
        onChange={(e) => onSortChange(e.target.value)}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
};
