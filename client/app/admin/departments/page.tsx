"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { axiosApi } from "@/lib/axios-client";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

interface DepartmentType {
  id: number;
  name: string;
  create_at: string;
}

export default function Departments() {
  const [formDep, setFormDep] = useState({
    name: "",
  });
  const [depId, setDepId] = useState(-1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDep({ ...formDep, [e.target.id]: e.target.value });
  };
  const { data, isLoading } = useQuery({
    queryKey: ["categoriesQuery"],
    queryFn: async (): Promise<DepartmentType[]> => {
      const response = await axiosApi("/department");
      return response.data;
    },
  });

  async function updateDep() {
    console.log(JSON.stringify(formDep));
    console.log(depId);

    const response = await axiosApi(`/department/${depId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(formDep),
    });

    console.log(response.status);

    if (response.status === 200) {
      location.reload();
      window.alert("Departamento atualizada com sucesso!");
    }
  }

  async function createDep() {
    console.log(JSON.stringify(formDep));

    const response = await axiosApi(`/department/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(formDep),
    }).catch(function (error) {
      window.alert(
        "Erro ao criar departamento! Verifique se o nome inserido é válido."
      );
    });

    if (!response) return;

    if (response.status === 200) {
      window.alert("Departamento criado com sucesso!");
      location.reload();
    }
  }

  async function deleteDep() {
    if (!confirm("Você tem certeza que quer deletar essa categoria ?")) return;

    const response = await axiosApi(`/department/${depId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      location.reload();
      window.alert("Departamento excluido sucesso!");
    }
  }

  if (isLoading) return null;

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Departamentos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <main className="m-auto mt-9 flex flex-col gap-6 pb-20 items-center">
        <h2 className="text-3xl font-bold"> Departamentos </h2>
        <div className=" flex justify-center items-center w-full gap-5">
          {data?.map((dep) => (
            <Sheet key={dep.id}>
              <SheetTrigger asChild>
                <Button variant="outline" onClick={() => setDepId(dep.id)} data-testid={`department-${dep.id}`}>
                  {" "}
                  {dep.name}{" "}
                </Button>
              </SheetTrigger>

              <SheetContent side="bottom">
                <SheetHeader>
                  <SheetTitle>Editar Departamento</SheetTitle>
                  <SheetDescription>Modifique o Departamento</SheetDescription>
                </SheetHeader>

                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      {" "}
                      Nome{" "}
                    </Label>
                    <Input
                      id="name"
                      defaultValue={dep.name}
                      className="col-span-3"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="button" onClick={updateDep} data-testid="save-department-button">
                      Save changes
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={deleteDep}
                      data-testid="delete-department-button"
                    >
                      Delete
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          ))}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" data-testid="add-department-button"> + </Button>
            </SheetTrigger>

            <SheetContent side="top">
              <SheetHeader>
                <SheetTitle>Criar Categoria</SheetTitle>
                <SheetDescription>
                  Coloque as informações da categoria
                </SheetDescription>
              </SheetHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    {" "}
                    Nome{" "}
                  </Label>
                  <Input
                    id="name"
                    className="col-span-3"
                    onChange={handleChange}
                    data-testid="department-name-input"
                  />
                </div>
              </div>

              <SheetFooter>
                <SheetClose asChild>
                  <Button type="button" onClick={createDep}  data-testid="save-department-button">
                    Save
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </main>
    </>
  );
}
