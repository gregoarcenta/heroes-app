import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useSearchParams } from "react-router";

interface Props {
  totalPages: number;
  currentPage: number;
}

export const CustomPagination = ({ totalPages, currentPage }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageSize = (page: number) => {
    if (page < 1 || page > totalPages) return;

    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => handlePageSize(currentPage - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
        Anterior
      </Button>

      {Array.from({ length: totalPages }).map((_, index) => (
        <Button
          variant={currentPage === index + 1 ? "default" : "outline"}
          size="sm"
          key={index}
          onClick={() => handlePageSize(index + 1)}
        >
          {index + 1}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => handlePageSize(currentPage + 1)}
      >
        Siguiente
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
