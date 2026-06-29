import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput = ({
  value,
  onChange,
}: Props) => {
  return (
    <div className="relative flex justify-center items-center gap-1">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="Search people..."
        className="
          w-full
          rounded-lg
          border
          border-gray-300
          bg-white
          py-2
          pl-10
          pr-4
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-200
        "
      />
    </div>
  );
};

export default SearchInput;