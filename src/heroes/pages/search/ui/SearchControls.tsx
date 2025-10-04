import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Grid, Search, SortAsc } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useSearchPageQueryParams } from "@/heroes/hooks/useSearchPageQueryParams";
import { isValidNumber } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";

import { ComboboxControl } from "@/heroes/pages/search/ui/ComboboxControl";

const teams = [
  { value: "Liga de la Justicia", label: "Liga de la Justicia" },
  { value: "Vengadores", label: "Vengadores" },
  { value: "Batfamilia", label: "Batfamilia" },
  { value: "Jóvenes Titanes", label: "Jóvenes Titanes" },
  { value: "Suicide Squad", label: "Suicide Squad" },
  { value: "Solo", label: "Solo" },
  { value: "X-Men", label: "X-Men" },
];

const categories = [
  { value: "Hero", label: "Heroe" },
  { value: "Villain", label: "Villano" },
  { value: "Antihero", label: "Anti heroe" },
];

const statuses = [
  { value: "Active", label: "Activo" },
  { value: "Deceased", label: "Muerto" },
];

const universes = [
  { value: "DC", label: "DC" },
  { value: "Marvel", label: "Marvel" },
];

export const SearchControls = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    filters: { name, strength, team, category, universe, status },
    isAdvancedFilters,
    toggleAdvancedFilters,
    handleFilterChange,
    clearFilters,
  } = useSearchPageQueryParams();

  const handleKeyDownEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = inputRef.current?.value;

    if (e.key === "Enter") {
      handleFilterChange("name", value?.trim());
    }
  };

  const clearAllFilters = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    clearFilters();
  };

  return (
    <>
      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            autoFocus={true}
            placeholder="Buscar héroes, villanos, poderes, equipos..."
            className="bg-white pl-12 h-12 text-lg"
            ref={inputRef}
            onKeyDown={handleKeyDownEnter}
            defaultValue={name}
          />
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Button
            variant={isAdvancedFilters ? "default" : "outline"}
            className="h-12"
            onClick={toggleAdvancedFilters}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>

          <Button variant="outline" className="h-12">
            <SortAsc className="h-4 w-4 mr-2" />
            Ordenar por nombre
          </Button>

          <Button variant="outline" className="h-12">
            <Grid className="h-4 w-4" />
          </Button>

          {/*<Button className="h-12">*/}
          {/*  <Plus className="h-4 w-4 mr-2" />*/}
          {/*  Add Character*/}
          {/*</Button>*/}
        </div>
      </div>

      {/* Advanced Filters */}
      <Accordion
        type="single"
        collapsible
        value={isAdvancedFilters.toString()}
        data-testid="accordion"
      >
        <AccordionItem value="true">
          <AccordionContent>
            <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border">
              {/*Limpiar filtros*/}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Filtros avanzados</h3>
                <Button variant="ghost" onClick={() => clearAllFilters()}>
                  Limpiar filtros
                </Button>
              </div>

              {/*Combo boxes*/}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/*Combobox teams*/}
                <div className="space-y-2">
                  <ComboboxControl
                    items={teams}
                    filterField={"team"}
                    value={team}
                    label={"Equipo"}
                  />
                </div>
                {/*Combobox categories*/}
                <div className="space-y-2">
                  <ComboboxControl
                    items={categories}
                    filterField={"category"}
                    value={category}
                    label={"Categoria"}
                  />
                </div>
                {/*combobox universes*/}
                <div className="space-y-2">
                  <ComboboxControl
                    items={universes}
                    filterField={"universe"}
                    value={universe}
                    label={"Universo"}
                  />
                </div>
                {/*Combobox status*/}
                <div className="space-y-2">
                  <ComboboxControl
                    items={statuses}
                    filterField={"status"}
                    value={status}
                    label={"Estado"}
                  />
                </div>
              </div>

              {/*Barra de fuerza*/}
              <div className="mt-4">
                <label className="text-sm font-medium">
                  Nivel mínimo de fuerza:{" "}
                  {isValidNumber(strength) ? +strength : 1}/10
                </label>
                <Slider
                  className={"mt-5"}
                  value={isValidNumber(strength) ? [+strength] : [1]}
                  onValueChange={(value) =>
                    handleFilterChange("strength", value.toString())
                  }
                  min={1}
                  max={10}
                  step={1}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};
