"use client";
import CustomButton from "@/components/common/custom-button";
import CustomPagination from "@/components/common/custom-pagination";
import { CustomTable } from "@/components/common/custom-table";
import AddCategoryModal from "@/components/setting/add-category-modal";
import { categoriesTableColumns } from "@/components/setting/category-column";
import { dummyCategories } from "@/constants/data";
import { CirclePlus } from "lucide-react";
import { useState } from "react";

const CategoriesHomepage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
          data={dummyCategories}
          loading={false}
          columns={categoriesTableColumns}
        />
      </div>
      <AddCategoryModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        parentCategories={["Electronics", "Cosmetics"]}
        onAddCategory={() => {}}
      />
      <div className="flex justify-between items-center w-full bg-[#F0F5F2] p-2">
        <p className="w-full font-semibold">showing 5 of 12 categories</p>
        <CustomPagination
          handleNextPage={() => {}}
          handlePreviousPage={() => {}}
        />
      </div>
    </div>
  );
};

export default CategoriesHomepage;
