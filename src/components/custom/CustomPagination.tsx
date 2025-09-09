import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  totalPages: number;
}

export const CustomPagination = ({ totalPages }: Props) => {
  let page = 2;
  return (
    <div className="flex items-center justify-center space-x-2">
      <Button variant="outline" size="sm" disabled={page === 1}>
        <ChevronLeft className="h-4 w-4" />
        Anterior
      </Button>

      {Array.from({ length: totalPages }).map((_, index) => (
        <Button
          variant={page === index + 1 ? "default" : "outline"}
          size="sm"
          key={index}
        >
          {index + 1}
        </Button>
      ))}

      <Button variant="outline" size="sm" disabled={page === totalPages}>
        Siguiente
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
