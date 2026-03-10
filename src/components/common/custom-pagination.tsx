import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

type CustomPaginationProps = {
  handlePreviousPage: () => void;
  handleNextPage: () => void;
};

const CustomPagination: React.FC<CustomPaginationProps> = ({
  handlePreviousPage,
  handleNextPage,
}) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={handlePreviousPage} />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={handleNextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
