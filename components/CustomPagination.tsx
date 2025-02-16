import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "./ui/button";

const CustomPagination = ({page,setPage,count}:{page:number,count:number,setPage:any}) => {
  return (
    <div className="w-full text-gray-200 flex justify-center">
      <Pagination className="w-full  flex justify-center">
        <PaginationContent className="flex gap-4">
         <button disabled ={page === 1}> <PaginationItem  onClick={() => setPage((prev: any) => prev - 1)}>
            <PaginationPrevious href="#" />
          </PaginationItem></button>
          <PaginationItem>
            <PaginationLink href="#">{page}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem onClick={() => setPage((prev: any) => prev + 1)}>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CustomPagination;
