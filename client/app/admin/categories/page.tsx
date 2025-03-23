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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

interface CategoryType {
  id: number;
  name: string;
  department_id: number;
  create_at: string;
}

interface DepartmentType {
  id: number;
  name: string;
  create_at: string;
}

export default function Categories() {
  const [formCat, setFormCat] = useState({
    name: "",
    department_id: "",
  });
  const [catId, setCatId] = useState(-1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormCat({ ...formCat, [e.target.id]: e.target.value });
  };

  const handleDepChange = (value: string) => {
    setFormCat({ ...formCat, department_id: value });
  };

  const { data, isLoading } = useQuery({
    queryKey: ["categoriesQuery"],
    queryFn: async (): Promise<CategoryType[]> => {
      const response = await axiosApi("/category");
      return response.data;
    },
  });

  const data_dep = useQuery({
    queryKey: ["departmentsQuery"],
    queryFn: async (): Promise<DepartmentType[]> => {
      const response = await axiosApi("/department");
      return response.data;
    },
  });

  async function updateCat() {
    console.log(JSON.stringify(formCat));
    console.log(catId);

    const response = await axiosApi(`/category/${catId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(formCat),
    });

    console.log(response.status);

    if (response.status === 200) {
      window.alert("Categoria atualizada com sucesso!");
      location.reload();
    }
  }

  async function createCat() {
    console.log(JSON.stringify(formCat));

    const response = await axiosApi(`/category/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(formCat),
    }).catch(function (error) {
      window.alert(
        "Erro ao criar categoria! Verifique se você preencheu todos os campos"
      );
    });

    if (!response) return;

    if (response.status === 200) {
      window.alert("Categoria criada com sucesso!");
      location.reload();
    }
  }

  async function deleteCat() {
    if (!confirm("Você tem certeza que quer deletar essa categoria ?")) return;

    const response = await axiosApi(`/category/${catId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      location.reload();
      window.alert("Categoria excluida sucesso!");
    }
  }

  if (isLoading || data_dep.isLoading) return null;

  console.log("data", data);
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
                <BreadcrumbPage>Categorias</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <main className="m-auto mt-9 flex flex-col gap-6 pb-20 items-center">
        <h2 className="text-3xl font-bold"> Categorias </h2>
        <div className=" flex justify-center items-center w-full gap-5">
          {data?.map((cat) => (
            <Sheet key={cat.id}>
              <SheetTrigger asChild>
                <Button variant="outline" onClick={() => setCatId(cat.id)}>
                  {" "}
                  {cat.name}
                </Button>
              </SheetTrigger>

              <SheetContent side="bottom">
                <SheetHeader>
                  <SheetTitle>Editar Categoria</SheetTitle>
                  <SheetDescription>
                    Modifique a categoria aqui
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
                      defaultValue={cat.name}
                      className="col-span-3"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      {" "}
                      Departamento{" "}
                    </Label>

                    <Select
                      defaultValue={"" + cat.department_id}
                      onValueChange={handleDepChange}
                    >
                      <SelectTrigger className="w-[180px]">
                        {" "}
                        <SelectValue placeholder="Selecione o Departamento" />{" "}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Departamento</SelectLabel>

                          {data_dep.data?.map((dep) => (
                            <SelectItem
                              id={"" + dep.id}
                              value={"" + dep.id}
                              key={"" + dep.id}
                            >
                              {" "}
                              {dep.name}{" "}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="button" onClick={updateCat}>
                      Save changes
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={deleteCat}
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
              <Button variant="outline"> + </Button>
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
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    {" "}
                    Departamento{" "}
                  </Label>

                  <Select onValueChange={handleDepChange}>
                    <SelectTrigger className="w-[180px]">
                      {" "}
                      <SelectValue placeholder="Selecione o Departamento" />{" "}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Departamento</SelectLabel>

                        {data_dep.data?.map((dep) => (
                          <SelectItem
                            id={"" + dep.id}
                            value={"" + dep.id}
                            key={"" + dep.id}
                          >
                            {" "}
                            {dep.name}{" "}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <SheetFooter>
                <SheetClose asChild>
                  <Button type="button" onClick={createCat}>
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
