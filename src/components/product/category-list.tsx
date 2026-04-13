import { useCategories } from "@/hooks/useCategories";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const CategoryList = () => {
  const { categories, isLoading } = useCategories();
  if (isLoading) return null;

  console.log(categories);

  return (
    <div>
      <div className="">
        <div className="">
          <Label>Category</Label>
          <select className="border rounded-md p-2 text-sm w-full">
            <option value="" className="w-full">Select a category</option>
            {categories.map((category) => (
              <option value={category._id}>{category.name}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
