import type { ProjectFormData } from "@/types";
import ErrorMessage from "../ErrorMessage";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

type ProjectFormProps = {
  errors: FieldErrors<ProjectFormData>;
  register: UseFormRegister<ProjectFormData>;
};

//Usamos intellisense de VsCode, hovereamos en register y errors en CreateProjectView y tenemos su TYPE- tenemos que importar igualmente esos types de react-hook-form para que los reconozca TS.

export default function ProjectForm({ errors, register }: ProjectFormProps) {
  return (
    <>
      <div className="mb-5 space-y-3">
        <label htmlFor="projectName" className="text-sm uppercase font-bold">
          Nombre del Proyecto
        </label>
        <input
          id="projectName"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Nombre del Proyecto"
          {...register("projectName", {
            required: "El Titulo del Proyecto es obligatorio",
          })}
        />

        {errors.projectName && <ErrorMessage>{errors.projectName.message}</ErrorMessage>}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="clientName" className="text-sm uppercase font-bold">
          Nombre Cliente
        </label>
        <input
          id="clientName"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Nombre del Cliente"
          {...register("clientName", {
            required: "El Nombre del Cliente es obligatorio",
          })}
        />

        {errors.clientName && <ErrorMessage>{errors.clientName.message}</ErrorMessage>}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="description" className="text-sm uppercase font-bold">
          Descripción
        </label>
        <textarea
          id="description"
          className="w-full p-3  border border-gray-200"
          placeholder="Descripción del Proyecto"
          {...register("description", {
            required: "Una descripción del proyecto es obligatoria",
          })}
        />

        {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
      </div>
    </>
  );
}

/**
 * 
type ProjectFormProps = {
  errors: FieldErrors<ProjectFormData>;
  register: UseFormRegister<ProjectFormData>;
};
 * Esto antes tenia en el generic <  > los campos y el type de cada uno que se obtiene de hoverear en errors y register... los types FieldErrors y UseFormRegister se MANTIENEN porque son de hook-form y se importan en este archivo pero el generic ya es de NUESTRO TYPE el ProjectFormData que creamos para evitar la repeticion y los any en la APP. 
 * 














 */