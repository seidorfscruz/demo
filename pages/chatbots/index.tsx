"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import supabase from "../../apis/supabase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/registry/default/ui/popover";
import { Button } from "@/registry/new-york/ui/button";
import {
  DropdownMenu,
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
import Swal from "sweetalert2";
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
import defaultimg from "../../constant/defaultimg";
import { TagIcon, TagsIcon, UserIcon } from "lucide-react";
import DaianaSpinner from "@/components/ui/DaianaSpinner";


export type Task = {
  name: string | null;
  idBot: string;
  idTenant: string | null;
  description: string | null;
  createdUser: { email: string}
  updatedUser: string | null;
  updatedAt: Date | null;
  createdAt: Date | null;
  team: {
    description: string;
    created_at: Date | null;
    id: string;
    imageUrl: string;
    name: string;
  };
  imageUrl: string | undefined;
};
import Login from '../login/index'
import { useUser } from "@supabase/auth-helpers-react";
export default function Modificatepage() {
  const user = useUser()
  const [selectedFile, setSelectedFile] = useState<File  | string >('');
  const [previewURL, setPreviewURL] = useState<string | null>(null); // Nuevo estado para la URL de vista previa
  const [info, setInfo] = useState<Task[] | null>(null);
  const [teams, setTeams] = useState<any[]>([]);
  const [teamSelected, setTeamSelected] = useState<string>("");
  const [cont, setCont] = useState(0);
  const [botInfoId, setBotInfoId] = useState({
    id: "",
    name: "",
    description: "",
    imageUrl: "",
    imgCont: "",
    idTenant: "",
    team: {
      name: "",
      id: "",
    },
  });

  

  

  const select = async () => {

    const x = await supabase.from("aibot").select("*,team(*),createdUser(*)").eq('idTenant', user?.user_metadata.id_tenantint); if (x.data) {
      setInfo(x.data);
    }
  };
  async function fetchData() {
    const x = await supabase.from("teams").select().eq('idTenant', user?.user_metadata.id_tenantint);
    if (x.error) {
      console.log(x.error);
    } else {
      setTeams(x.data);
    }
  }


  useEffect(() => {
    select();
  }, []);


  //Elimina bot seleccionado de base de datos
  //Elimina image en storage
  const handleDelete = async (id: string) => {
    const xGet = await supabase.from("aibot").select().eq("idBot", id);
    let idTenant = "";
    let imageUrl = "";
    
    if (xGet.data) {
      imageUrl = xGet.data[0].imageUrl;
      idTenant = xGet.data[0].idTenant;

    }
    const x = await supabase.from("aibot").delete().eq("idBot", id);

    if (x.error) {
      Swal.fire("Oops...", "Problem while trying to remove your chatbot", "error");
      return;
    }
    
    if (typeof imageUrl === "number" ||!isNaN(Number(imageUrl))) {
      const xDelete = await supabase.storage
        .from("Images")
        .remove([`imagesChatBots/${idTenant}/${id}/${imageUrl}`]);
        
    }
    select();
    Swal.fire("Success", "Chatbot removed", "success");
    return;
  };


  //Handle EDIT
  //funciones utilizadas para el manejo del seleccionado de avatar
  //setean vista en tiempo real y name en el file input name


  //Setea el bot seleccionado en el estado botInfoId
  //Setea el previewURL con la url de la imagen seleccionada
  //Setea cont con el valor de la imagen seleccionada para luego compara si se cambio o no comparandolo con el valor de imgUrl que es el que modifico
  const handleBaseId = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.id;

    const x = await supabase.from("aibot").select("*,team(*)").eq("idBot", id);
    if (x.error) {
      console.log(x.error);
    } else {
      setCont(x.data[0].imageUrl);
      setBotInfoId({
        name: x.data[0].name,
        description: x.data[0].description,
        imgCont:
          typeof x.data[0].imageUrl === "number" ||
          !isNaN(Number(x.data[0].imageUrl))
            ? x.data[0].imageUrl
            : "no",

        imageUrl:
          typeof x.data[0].imageUrl === "number" ||!isNaN(Number(x.data[0].imageUrl))
            ? `https://fzjgljxomqpukuvmguay.supabase.co/storage/v1/object/public/Images/imagesChatBots/${x.data[0].idTenant}/${x.data[0].idBot}/${x.data[0].imageUrl}}`
            : x.data[0].imageUrl,

        id: x.data[0].idBot,
        idTenant: x.data[0].idTenant,
        team: x.data[0].team,
      });

      if (
        typeof x.data[0].imageUrl === "number" ||
        !isNaN(Number(x.data[0].imageUrl))
      ) {
        setPreviewURL(
          `https://fzjgljxomqpukuvmguay.supabase.co/storage/v1/object/public/Images/imagesChatBots/${x.data[0].idTenant}/${x.data[0].idBot}/${x.data[0].imageUrl}`
        );
      } else {
        setPreviewURL(x.data[0].imageUrl);
      }
    }
  };
//Setea valores en el estado botInfoId cuando se realiza un cambio en el input
//Es lo que se esta renderizando en pantalla
  const handleChangaValue = (
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


//Funcion que se ejecuta al presionar el boton de guardar cambios
//Se realiza un update a la base de datos con los valores del estado botInfoId
//Se compruba primero si viene una imagen default o cargada por el usuario
//Se comprueba si cambia la imagen con el valor de cont y botInfoId.imgCont, si son iguales no se realiza un update a la base de datos
//Si son diferentes se realiza un update a la base de datos y se sube la imagen a la base de datos
//Si la imagen cambiada es default solo se cambia imgurl por la url de la imagen default
  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (typeof cont === "number" || !isNaN(Number(cont))) {
      if (+cont == +botInfoId.imgCont) {
        const x = await supabase
          .from("aibot")
          .update({
            name: botInfoId.name,
            description: botInfoId.description,
            //imageUrl: selectedFile === "default"? previewURL:+botInfoId.imgCont,
            team: teamSelected ? teamSelected : botInfoId.team.id,
          })
          .eq("idBot", botInfoId.id)
          .select();
        UploadStatus(true);
      } else {
        const x = await supabase
          .from("aibot")
          .update({
            name: botInfoId.name,
            description: botInfoId.description,
            imageUrl:
              selectedFile === "default" ? previewURL : +botInfoId.imgCont,
            team: teamSelected ? teamSelected : botInfoId.team.id,
          })
          .eq("idBot", botInfoId.id)
          .select();
        const x1 = await supabase.storage
          .from("Images")
          .upload(
            `imagesChatBots/${botInfoId.idTenant}/${botInfoId.id}/${botInfoId.imgCont}`,
            selectedFile
          );
          const xDelete = await supabase.storage
          .from("Images")
          .remove([`imagesChatBots/${botInfoId.idTenant}/${botInfoId.id}/${cont}`]);
        UploadStatus(true);
      }
    } else {
      if (cont == previewURL) {
        const x = await supabase
          .from("aibot")
          .update({
            name: botInfoId.name,
            description: botInfoId.description,
            //imageUrl: selectedFile === "default"? previewURL:+botInfoId.imgCont,
            team: teamSelected ? teamSelected : botInfoId.team.id,
          })
          .eq("idBot", botInfoId.id)
          .select();
        UploadStatus(true);
      } else {
       
        const x = await supabase
          .from("aibot")
          .update({
            name: botInfoId.name,
            description: botInfoId.description,
            imageUrl: selectedFile === "default" ? previewURL : 1,
            team: teamSelected ? teamSelected : botInfoId.team.id,
          })
          .eq("idBot", botInfoId.id)
          .select();
      }
      const x1 = await supabase.storage
        .from("Images")
        .upload(
          `imagesChatBots/${botInfoId.idTenant}/${botInfoId.id}/1`,
          selectedFile
        );

      UploadStatus(true);
    }
    
  };
//Controla el estado de los mensajes de alerta
  const UploadStatus = (estado: boolean) => {
    select();
    setBotInfoId({
      id: "",
      name: "",
      description: "",
      imageUrl: "",
      imgCont: "",
      idTenant: "",
      team: {
        name: "",
        id: "",
      },
    });
  };

//Funcion que se ejecuta al seleccionar una imagen
// Maneja el cambio de imagen, junto con handleFilechange
//Controla el input fil text
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof botInfoId.imgCont === "number" || !isNaN(Number(cont))) {
      setBotInfoId((prevState) => ({
        ...prevState,
        imgCont: (+botInfoId.imgCont + 1).toString(),
      }));
    } else {
    }
    const file = event.target.files && event.target.files[0];

    if (file) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file)); // Crear la URL de vista previa
    } else {
      setSelectedFile('');
      setPreviewURL(null);
    }
  };

  const handleFileChangeDefault = (url: string) => {
    if (typeof botInfoId.imgCont === "number" || !isNaN(Number(cont))) {
      setBotInfoId((prevState) => ({
        ...prevState,
        imgCont: (+botInfoId.imgCont + 1).toString(),
      }));
    } else {
    }
    setPreviewURL(url);
    const fileInput = document.querySelector<HTMLInputElement>("#docfile");
    setSelectedFile("default");

    if (fileInput) {
      const newFileName = "default.png"; // Reemplaza con el nombre deseado
      const files = fileInput.files;

      if (files && files.length > 0) {
        const file = files[0];

        // Crear un nuevo objeto File con el nuevo nombre
        const newFile = new File([file], newFileName, { type: file.type });

        // Reemplazar el archivo original en el input con el nuevo archivo
        const fileList = new DataTransfer();
        fileList.items.add(newFile);
        fileInput.files = fileList.files;
      }
    }
  };
  if (!user)
  return (
<Login></Login>
  )
console.log(info)
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
      
      <div>
        {info ? (
          <div className='grid grid-cols-5 p-4 gap-4'>
            {
              info.map((e) => (
                //wep
                <div key={e.idBot}>
                  <Card id={e.idBot} className="h-full">
                    <div className="flex justify-end">
                      {/* <Button variant="secondary" className="px-3 shadow-none">
                        <StarIcon className="mr-2 h-4 w-4" />
                        Star
                      </Button>
                      <Separator orientation="vertical" className="bg-primary/10 h-[20px]" /> */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="px-2">
                            <ChevronDownIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          alignOffset={-5}
                          className="w-[200px]"
                          forceMount
                        >
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
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
                                fetchData();
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
                                  Make changes to your chatbot here. Click save when
                                  you re done.
                                </DialogDescription>
                                <div className={styles.avatarform}>
                                  <Avatar className="w-20 h-20">
                                    {previewURL ? (
                                      <AvatarImage src={previewURL} />
                                    ) : (
                                      <AvatarFallback>CN</AvatarFallback>
                                    )}
                                  </Avatar>
                                </div>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="name" className="text-right">
                                    Name
                                  </Label>
                                  <Input
                                    onChange={handleChangaValue}
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
                                    id="docfile"
                                    type="file"
                                    onChange={handleFileChange}
                                    name="imageUrl"
                                    // value={botInfoId.imageUrl}
                                    className="col-span-3"
                                  />
                                  <p>Or </p>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        className={styles.PopoverContent}
                                        variant="outline"
                                      >
                                        SELECTED IMAGE DEFAULT
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                      className={styles.PopoverContent}
                                    >
                                      <PopoverClose>
                                        <div className="flex flex-wrap">
                                          {defaultimg?.map((img) => (
                                            <div
                                              key={img.value}
                                              className="w-1/4 p-2"
                                            >
                                              <Avatar
                                                onClick={() =>
                                                  handleFileChangeDefault(
                                                    img.value
                                                  )
                                                }
                                                className={styles.avatarPop}
                                              >
                                                <AvatarImage src={img.value} />
                                                <AvatarFallback>
                                                  CN
                                                </AvatarFallback>
                                              </Avatar>
                                            </div>
                                          ))}
                                        </div>
                                      </PopoverClose>
                                    </PopoverContent>
                                  </Popover>
                                </div>

                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label
                                    htmlFor="username"
                                    className="text-right"
                                  >
                                    Descriptions
                                  </Label>
                                  <Textarea
                                    onChange={handleChangaValue}
                                    name="description"
                                    value={botInfoId.description}
                                    className="col-span-3"
                                  />
                                </div>
                                <Select
                                  onValueChange={(value) =>
                                    setTeamSelected(value)
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue
                                      defaultValue={teamSelected}
                                      placeholder={botInfoId.team.name}
                                    />
                                  </SelectTrigger>

                                  <SelectContent>
                                    {teams?.map((team) => {
                                      return (
                                        <SelectItem
                                          key={team.id}
                                          value={team.id}
                                        >
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
                          {/* <DropdownMenuSeparator /> */}

                          {/* <DropdownMenuItem>
                            <PlusIcon className="mr-2 h-4 w-4" /> Create List
                          </DropdownMenuItem> */}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <CardHeader className="flex flex-col justify-between p-2 pb-4 pt-0" style={{ height: '90%'}}>
                      <div>
                        <div className="flex justify-center">
                          <Avatar className="w-40 h-40 rounded-sm">
                            <AvatarImage
                              src={
                                typeof e.imageUrl === "number" ||
                                !isNaN(Number(e.imageUrl))
                                  ? `https://fzjgljxomqpukuvmguay.supabase.co/storage/v1/object/public/Images/imagesChatBots/${e.idTenant}/${e.idBot}/${e.imageUrl}`
                                  : e.imageUrl
                              }
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                        </div>

                        <CardTitle className="text-center pt-6">
                          {e.name}
                        </CardTitle>
                        <CardDescription className="text-center text-xs">
                          {e.description}
                        </CardDescription>
                      </div>
                      
                      <div className="pt-2">
                        <CardDescription className='flex justify-center'>
                          <div className="flex space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <TagIcon className="h-3 w-3 text-sky-400 me-1" />
                              {e.team?.name}
                            </div>
                            <div className="flex justify-center items-center">
                              <UserIcon className="h-3 w-3" />
                              {e.createdUser?.email.toString().slice(0, 10)}
                            </div>
                            <div>
                              {e.createdAt
                                ? e.createdAt.toString().slice(0, 7)
                                : "2023-10"}
                            </div>
                          </div>
                        </CardDescription>
                      </div>
                    </CardHeader>
                  </Card>
                </div>
              ))
            }
          </div>
        ) : (
          <div style={{ height: 'calc(100vh - 230px)' }} className="flex items-center justify-center">
            <DaianaSpinner />
          </div>
        )}
      </div>
    </Layout>
  );
}
