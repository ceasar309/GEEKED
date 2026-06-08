"use client";

import { useState } from "react";
import { IoChevronDown, IoClose } from "react-icons/io5";

const categories = ["Tops", "Bottoms", "Dresses", "Outerwear", "Accessories", "Footwear"];
const genders = ["Women", "Men", "Unisex"];
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colors = ["Black", "White", "Beige", "Gold", "Red", "Blue", "Green", "Pink"];
const brands = ["GEEKED", "GEEKED Sport", "Urban GEEKED", "Gold Label"];
const priceRanges = [
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "$200 - $500", min: 200, max: 500 },
  { label: "Over $500", min: 500, max: Infinity },
];

interface ProductFiltersProps {
  onFilterChange: (filters: any) => void;
}

export default function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    category: true,
    gender: false,
    size: false,
    color: false,
    brand: false,
    price: false,
  });
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleFilter = (group: string, value: string) => {
    setSelectedFilters((prev) => {
      const current = prev[group] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      const newFilters = { ...prev, [group]: updated };
      if (updated.length === 0) delete newFilters[group];
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const clearAll = () => {
    setSelectedFilters({});
    onFilterChange({});
  };

  const hasFilters = Object.keys(selectedFilters).length > 0;

  const renderFilterGroup = (title: string, key: string, options: string[]) => (
    <div className="border-b border-neutral-200 dark:border-neutral-700 py-4">
      <button
        onClick={() => toggleSection(key)}
        className="flex items-center justify-between w-full text-sm font-medium tracking-wider uppercase"
      >
        {title}
        <IoChevronDown
          size={14}
          className={`transition-transform duration-200 ${openSections[key] ? "rotate-180" : ""}`}
        />
      </button>
      {openSections[key] && (
        <div className="mt-3 space-y-2">
          {options.map((option) => (
            <label key={option} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={(selectedFilters[key] || []).includes(option)}
                onChange={() => toggleFilter(key, option)}
                className="accent-black dark:accent-white"
              />
              <span className="text-sm text-neutral-600 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                {option}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-1">
      {hasFilters && (
        <button
          onClick={clearAll}
          className="flex items-center gap-1 text-xs text-neutral-500 hover:text-black dark:hover:text-white transition-colors mb-2"
        >
          <IoClose size={14} />
          Clear all filters
        </button>
      )}
      {renderFilterGroup("Category", "category", categories)}
      {renderFilterGroup("Gender", "gender", genders)}
      {renderFilterGroup("Size", "size", sizes)}
      {renderFilterGroup("Color", "color", colors)}
      {renderFilterGroup("Brand", "brand", brands)}
      <div className="border-b border-neutral-200 dark:border-neutral-700 py-4">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full text-sm font-medium tracking-wider uppercase"
        >
          Price Range
          <IoChevronDown
            size={14}
            className={`transition-transform duration-200 ${openSections.price ? "rotate-180" : ""}`}
          />
        </button>
        {openSections.price && (
          <div className="mt-3 space-y-2">
            {priceRanges.map((range) => (
              <label key={range.label} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={(selectedFilters.price || []).includes(range.label)}
                  onChange={() => toggleFilter("price", range.label)}
                  className="accent-black dark:accent-white"
                />
                <span className="text-sm text-neutral-600 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                  {range.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
