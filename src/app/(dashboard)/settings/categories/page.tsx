"use client";
import CustomButton from "@/components/common/custom-button";
import CustomPagination from "@/components/common/custom-pagination";
import { CustomTable } from "@/components/common/custom-table";
import AddCategoryModal from "@/components/setting/add-category-modal";
import { categoriesTableColumns } from "@/components/setting/category-column";
import { useCategories } from "@/hooks/useCategories";
import { CirclePlus } from "lucide-react";
import { useState } from "react";

const CategoriesHomepage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { categories, isLoading, createCategory, isCreating } = useCategories();

  return (
    <div className="bg-white pt-2">
      <div className="flex justify-end">
        <CustomButton
          type="button"
          label="Add Category"
          leftIcon={<CirclePlus />}
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <div className="p-5">
        <CustomTable
          data={categories}
          loading={isLoading}
          columns={categoriesTableColumns}
          emptyState={{ title: "No Categories Found", message: "Category list is empty" }}
        />
      </div>
      <AddCategoryModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={(data) => {
          createCategory(
            { ...data, parentCategoryId: data.parentCategoryId || "" },
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
      <div className="flex justify-between items-center w-full bg-[#F0F5F2] p-2">
        <p className="w-full font-semibold">showing 5 of 12 categories</p>
        <CustomPagination
          handleNextPage={() => { }}
          handlePreviousPage={() => { }}
        />
      </div>
    </div>
  );
};

export default CategoriesHomepage;
