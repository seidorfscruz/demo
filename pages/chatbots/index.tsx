"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import supabase from "../../apis/supabase";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/registry/default/ui/select";

import { Button } from "@/registry/new-york/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu";
import { Layout } from "@/components/layouts";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import Swal, { SweetAlertResult } from "sweetalert2";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/default/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/default/ui/alert-dialog";
import styles from "./styles.module.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/registry/default/ui/dialog";
import { Label } from "@/registry/default/ui/label";
import { Input } from "@/registry/default/ui/input";
import { Textarea } from "@/registry/default/ui/textarea";
import {
  ChevronDownIcon,
  CircleIcon,
  PlusIcon,
  StarIcon,
} from "@radix-ui/react-icons";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { Separator } from "@/registry/new-york/ui/separator";
import Categories from "@/components/ui/Categories";

export type Task = {
  name: string | null;
  idBot: string;
  idTenant: string | null;
  description: string | null;
  createdUser: string | null;
  updatedUser: string | null;
  updatedAt: Date | null;
  createdAt: Date | null;
  team: {
    description:string
    created_at: Date | null;
    id: string
    imageUrl:string
    name:string
  };
  imageUrl: string | null;
};

export default function Modificatepage() {
  const [info, setInfo] = useState<Task[] | null>(null);
  const [teams, setTeams] = useState<any[]>([])
  const [teamSelected, setTeamSelected] = useState<string>('')
  const [botInfoId, setBotInfoId] = useState({
    id: "",
    name: "",
    description: "",
    imageUrl: "",
      team:{
        name: '',
        id: ''
        }
  });

  const select = async () => {
    const x = await supabase.from("aibot").select("*,team(*)");
    console.log(x.data);
    setInfo(x.data);
  };

  useEffect(() => {
    select();
  }, []);

  const handleDelete = async (id: string) => {
    console.log(id);
    const x = await supabase.from("aibot").delete().eq("idBot", id);

    if (x.error) {
      console.log(x.error);
      Swal.fire("¡Hola, usuario!", "Bot no pudo ser eliminado ", "warning");
    } else {
      select();
      Swal.fire("¡Hola, usuario!", "Bot eliminado exitosamente", "success");
    }
  };

  const handleNombreUsuarioChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBotInfoId((prevDocument) => ({
      ...prevDocument,
      [name]: value,
    }));
  };
  const handleBaseId = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.id;

    const x = await supabase.from("aibot").select("*,team(*)").eq("idBot", id)
    if (x.error) {
      console.log(x.error)
    } else {
      setBotInfoId({
        name: x.data[0].name,
        description: x.data[0].description,
        imageUrl: x.data[0].imageUrl,
        id: x.data[0].idBot,
        team:x.data[0].team
      });
    }
  };
  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const x = await supabase
      .from("aibot")
      .update({
        name: botInfoId.name,
        description: botInfoId.description,
        imageUrl: botInfoId.imageUrl,
        team: teamSelected
      })
      .eq("idBot", botInfoId.id)
      .select();

    if (x.error) {
      return Swal.fire(
        "¡Hola, usuario!",
        "no se puedo realizar la modificacion",
        "error"
      );
    } else {
      select();
      return Swal.fire(
        "¡Hola, usuario!",
        "Cambios guardados correctamente",
        "success"
      );
    }
  };

  async function fetchData() {
    const x = await supabase.from("teams").select();
    if (x.error) {
      console.log(x.error);
    } else {
      setTeams(x.data);
    }
    console.log(teams)
  }
  


  return (
    <Layout title="ChatBots page">
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">ChatBots</h2>
            
            <div className="flex justify-end items-center w-6/12" style={{ marginTop: '0px' }}>
              <div className="relative me-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="absolute top-2 left-2 h-6 w-6 text-muted-foreground"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <Input
                  className="pl-10"
                  style={{ width: '400px' }}
                  placeholder="Search..."
                />
              </div>

              <Link href='new-chatbot' className="flex items-center">
                {" "}
                <Button style={{ width: '180px' }}>Create new chatbot</Button>
              </Link>
            </div>
          </div>

          <Categories categories={['Innovation', 'Human Resources', 'Documents', 'Company', 'Accounting', 'Secrets', 'Public', 'Latest', 'Newest', 'All']} />
        </div>
      </div>
      <div className={styles.cardcontainer}>
        {info ? (
          info.map((e) => (
            <div key={e.idBot} className={styles.card}>
              <Card id={e.idBot}>
                <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
                  <div className="space-y-1">
                    <CardTitle className={styles.nameCard}>{e.name}</CardTitle>
                    <CardDescription className={styles.descriptionCard}>
                      {e.description}
                    </CardDescription>

                    <CardDescription className={styles.footerCard}>
                      <div className="flex space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
                          {e.team?.name}
                        </div>
                        <div className="flex items-center">
                          <StarIcon className="mr-1 h-3 w-3" />
                          {e.createdUser}
                        </div>
                        <div>
                          {e.createdAt
                            ? e.createdAt.toString().slice(0, 7)
                            : "2023-10"}
                        </div>
                      </div>
                    </CardDescription>
                  </div>

                  <div>
                    <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
                      <Button variant="secondary" className="px-3 shadow-none">
                        <StarIcon className="mr-2 h-4 w-4" />
                        Star
                      </Button>
                      <Separator orientation="vertical" className="h-[20px]" />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="secondary"
                            className="px-2 shadow-none"
                          >
                            <ChevronDownIcon className="h-4 w-4 text-secondary-foreground" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          alignOffset={-5}
                          className="w-[200px]"
                          forceMount
                        >
                          <DropdownMenuLabel>Suggested Lists</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <Link href={`/documents/${e.idBot}`}>
                            <p className={styles.pbtton}>Upload documents</p>
                          </Link>
                          <DropdownMenuSeparator />

                          <Dialog>
                            <DialogTrigger
                              id={e.idBot}
                              onClick={(event) => {
                                handleBaseId(event);
                                fetchData()
                              }}
                              className={styles.dialog}
                            >
                              <p className={styles.pbtton}>Edit bot</p>
                            </DialogTrigger>
                            <DropdownMenuSeparator />
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Edit bot</DialogTitle>
                                <DialogDescription>
                                  Make changes to your bot here. Click save when
                                  you re done.
                                </DialogDescription>
                                <div className={styles.avatarform}>
                                  <Avatar className="w-20 h-20">
                                    <AvatarImage
                                      src={botInfoId.imageUrl || ""}
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                  </Avatar>
                                </div>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="name" className="text-right">
                                    Name
                                  </Label>
                                  <Input
                                    onChange={handleNombreUsuarioChange}
                                    name="name"
                                    value={botInfoId.name}
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="img" className="text-right">
                                    Avatar
                                  </Label>
                                  <Input
                                    onChange={handleNombreUsuarioChange}
                                    name="imageUrl"
                                    value={botInfoId.imageUrl}
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label
                                    htmlFor="username"
                                    className="text-right"
                                  >
                                    Descriptions
                                  </Label>
                                  <Textarea
                                    onChange={handleNombreUsuarioChange}
                                    name="description"
                                    value={botInfoId.description}
                                    className="col-span-3"
                                  />
                                </div>
                                <Select onValueChange={ (value) => setTeamSelected(value) }>
                      
                        <SelectTrigger>
                          <SelectValue defaultValue={botInfoId.team.id} placeholder={botInfoId.team.name} />
                        </SelectTrigger>
                      
                      <SelectContent>
                        {teams?.map((team) => {
                          return (
                            <SelectItem key={team.id} value={team.id}>
                              {team.name}
                            </SelectItem>
                          );
                        })}
                        
                      
                      </SelectContent>
                    </Select>

                              </div>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button onClick={handleUpdate} type="button">
                                    Save changes
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          <AlertDialog>
                            <AlertDialogTrigger>
                              <span className={styles.pbttonD}>Delete bot</span>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete your document and remove
                                  your data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className={styles.btnDelete}
                                  value={e.idBot}
                                  onClick={(event) => {
                                    event.preventDefault();
                                    handleDelete(e.idBot); // Pasa el idBot directamente a la función handleDelete
                                  }}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          <DropdownMenuSeparator />

                          <DropdownMenuItem>
                            <PlusIcon className="mr-2 h-4 w-4" /> Create List
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className={styles.avatar}>
                      <Avatar className="w-25 h-25">
                        <AvatarImage src={e.imageUrl ? e.imageUrl : ""} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          ))
        ) : (
          <div>no hay datos</div>
        )}
      </div>
    </Layout>
  );
}
