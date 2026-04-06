"use client";
import CustomButton from "@/components/common/custom-button";
import { CustomTable } from "@/components/common/custom-table";
import AddCategoryModal from "@/components/setting/add-category-modal";
import { categoriesTableColumns } from "@/components/setting/category-column";
import { Input } from "@/components/ui/input";
import { useCategories } from "@/hooks/useCategories";
import { useDebounce } from "@/hooks/useDebounce";
import { CategoryType } from "@/types/category.type";
import { CirclePlus, Search } from "lucide-react";
import { useMemo, useState } from "react";

const DeepSearch = (categories: CategoryType[], searchTerm: string): CategoryType[] => {
  const lowerSearch = searchTerm.toLowerCase();
  return categories.reduce<CategoryType[]>((acc, category) => {
    const nameMatches = category.name.toLowerCase().includes(lowerSearch);
    const matchingChildren = Array.isArray(category.childCategories)
      ? DeepSearch(
        category.childCategories.filter(
          (child): child is CategoryType => typeof child !== "string"
        ),
        searchTerm
      )
      : [];
    if (nameMatches || matchingChildren.length > 0) {
      acc.push({
        ...category,
        childCategories: matchingChildren,
      });
    }
    return acc;
  }, []);
};

const CategoriesHomepage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { categories, isLoading, createCategory, isCreating } = useCategories();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const filteredCategories = useMemo(() => {
    if (!debouncedSearch.trim()) return categories;
    return DeepSearch(categories, debouncedSearch);
  }, [categories, debouncedSearch]);


  return (
    <div className="bg-white pt-2">
      <div className=" px-5 py-3 flex items-center justify-between gap-5">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search Categories..."
            className="pl-10 h-11 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <CustomButton
          type="button"
          label="Add Category"
          leftIcon={<CirclePlus />}
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <div className="p-5">
        <CustomTable
          data={filteredCategories}
          loading={isLoading}
          columns={categoriesTableColumns}
          emptyState={{
            title: searchTerm ? "No results found" : "No Categories Found",
            message: searchTerm
              ? `We couldn't find any categories matching "${searchTerm}"`
              : "Category list is empty"
          }}
        />
      </div>
      <AddCategoryModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={(data) => {
          createCategory(
            {
              ...data,
              parentCategoryId: data.parentCategoryId || "",
              description: data.description || "",
            },
            {
              onSuccess: () => {
                setIsModalOpen(false);
              },
            }
          );
        }}
        isSubmitting={isCreating}
        parentCategories={categories}
      />
    </div>
  );
};

export default CategoriesHomepage;
