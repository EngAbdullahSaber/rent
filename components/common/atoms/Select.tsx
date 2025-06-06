"use client";
import { useTranslate } from "@/config/useTranslation";
import { useEffect, useRef, useState } from "react";

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps {
  keyData: string;
  label?: string;
  placeholder?: string;
  className?: string;
  classNameLabel?: string;
  width?: string;
  height?: string;
  setValue?: (key: string, value: any) => void;
  data?: SelectOption[];
  value?: any;
  disabled?: boolean;
  searchable?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  data = [],
  classNameLabel = "",
  keyData,
  label,
  className = "",
  width = "w-full",
  height = "h-[40px]",
  placeholder = "Select...",
  setValue,
  value,
  disabled = false,
  searchable = true,
}) => {
  const { lang, t } = useTranslate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const selectRef = useRef<HTMLDivElement>(null);

  // Set initial selected option based on value prop
  useEffect(() => {
    if (value && data.length > 0) {
      const foundOption = data.find((option) => option.value === value);
      if (foundOption) {
        setSelectedOption(foundOption);
      }
    } else {
      setSelectedOption(null);
    }
  }, [value, data]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: SelectOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    setValue?.(keyData, option.value);
  };

  const filteredOptions = data.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`${width} mb-4`} ref={selectRef}>
      {label && (
        <label
          className={`block text-sm font-medium text-gray-700 mb-1 ${classNameLabel}`}
          htmlFor={keyData}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          className={`${height} ${className} w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-left focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            disabled
              ? "bg-gray-100 cursor-not-allowed opacity-70"
              : "hover:border-gray-400"
          }`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span
            className={`truncate ${!selectedOption ? "text-gray-400" : ""}`}
          >
            {selectedOption ? selectedOption.label : t(placeholder)}
          </span>
          <svg
            className={`h-5 w-5 text-gray-400 transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-auto">
            {searchable && (
              <div className="px-3 py-2 sticky top-0 bg-white border-b">
                <input
                  type="text"
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
              </div>
            )}

            <div className="py-1">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-blue-50 ${
                      selectedOption?.value === option.value
                        ? "bg-blue-100 text-blue-800"
                        : ""
                    }`}
                    onClick={() => handleSelect(option)}
                  >
                    {option.label}
                  </button>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-gray-500">
                  No options found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
