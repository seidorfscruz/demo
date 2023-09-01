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
import defaultimg from "../../constant/defaultimg";
import { X } from "lucide-react";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";

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
    description: string;
    created_at: Date | null;
    id: string;
    imageUrl: string;
    name: string;
  };
  imageUrl: string | null;
};

export default function Modificatepage() {
  const [selectedFile, setSelectedFile] = useState<File | null | string >(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null); // Nuevo estado para la URL de vista previa
  const [info, setInfo] = useState<Task[] | null>(null);
  const [teams, setTeams] = useState<any[]>([]);
  const [teamSelected, setTeamSelected] = useState<string>('');
  const [cont, setCont] = useState(0);
  const [botInfoId, setBotInfoId] = useState({
    id: "",
    name: "",
    description: "",
    imageUrl: "",
    imgCont:"",
    idTenant: "",
    team: {
      name: "",
      id: "",
    },
  });

  const select = async () => {
    const x = await supabase.from("aibot").select("*,team(*)");
   if(x.data){

    setInfo(x.data);
    console.log(info)
   }
  };

  useEffect(() => {
    select();
  }, []);

  const handleDelete = async (id: string) => {
    const xGet = await supabase.from("aibot").select().eq("idBot", id)
    let idTenant = ''
    let imageUrl = ''
  if(xGet.data){
   idTenant = xGet.data[0].idTenant;
   imageUrl = xGet.data[0].imageUrl;
   
  }
    const x = await supabase.from("aibot").delete().eq("idBot", id);
    
    if (x.error) {
      console.log(x.error);
      Swal.fire("¡Hola, usuario!", "Bot no pudo ser eliminado ", "warning");
      return;
    } 
console.log(imageUrl)
console.log(`/imagesChatBots/${idTenant}/${id}`)
    if(imageUrl === "new"){
      console.log('llegue')
       const xDelete = await supabase.storage
        .from("Images")
        .remove([`imagesChatBots/${idTenant}/${id}`]);
  
    }
    console.log(x)
    select();
    Swal.fire("Hello, User!", "Bot successfully removed", "success");
    return;
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

    const x = await supabase.from("aibot").select("*,team(*)").eq("idBot", id);
    if (x.error) {
      console.log(x.error); 
    } else {
      setCont(x.data[0].imageUrl)
      setBotInfoId({
        name: x.data[0].name,
        description: x.data[0].description,
        imgCont: typeof x.data[0].imageUrl === 'number' ||!isNaN(Number(x.data[0].imageUrl))? x.data[0].imageUrl:'no',

        imageUrl:  typeof x.data[0].imageUrl === 'number' ||!isNaN(Number(x.data[0].imageUrl))?
         `https://fzjgljxomqpukuvmguay.supabase.co/storage/v1/object/public/Images/imagesChatBots/${x.data[0].idTenant}/${x.data[0].idBot}/${x.data[0].imageUrl}}`
        : x.data[0].imageUrl,

        id: x.data[0].idBot,
        idTenant: x.data[0].idTenant,
        team: x.data[0].team,
      });
      console.log(x.data[0].imageUrl)
      if(typeof x.data[0].imageUrl === 'number' ||!isNaN(Number(x.data[0].imageUrl)) ){
        setPreviewURL(`https://fzjgljxomqpukuvmguay.supabase.co/storage/v1/object/public/Images/imagesChatBots/${x.data[0].idTenant}/${x.data[0].idBot}/${x.data[0].imageUrl}`)
      }else {
      setPreviewURL(x.data[0].imageUrl)
    }
  }
  };
  
  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(cont)
if(typeof cont === 'number' ||!isNaN(Number(cont))){
  console.log(botInfoId.imgCont.toString())
  console.log(cont)
  if(cont== botInfoId.imgCont.toString()){
    const x = await supabase
    .from("aibot")
    .update({
      name: botInfoId.name,
      description: botInfoId.description,
      //imageUrl: selectedFile === "default"? previewURL:+botInfoId.imgCont,
      team: teamSelected? teamSelected: botInfoId.team.id,
    })
    .eq("idBot", botInfoId.id)
    .select();

    select()
}else {
  console.log(botInfoId.imgCont)
    const x = await supabase
    .from("aibot")
    .update({
      name: botInfoId.name,
      description: botInfoId.description,
      imageUrl: selectedFile === "default"? previewURL:+botInfoId.imgCont,
      team: teamSelected? teamSelected: botInfoId.team.id,
    })
    .eq("idBot", botInfoId.id)
    .select();
console.log(cont)
    const x1 = await supabase.storage
        .from("Images")
        .upload(
          `imagesChatBots/${botInfoId.idTenant}/${botInfoId.id}/${botInfoId.imgCont}`,
          selectedFile)


            select()
} 

}else {
  console.log(previewURL)
  console.log(cont)
  if(cont == previewURL ){
    const x = await supabase
    .from("aibot")
    .update({
      name: botInfoId.name,
      description: botInfoId.description,
      //imageUrl: selectedFile === "default"? previewURL:+botInfoId.imgCont,
      team: teamSelected? teamSelected: botInfoId.team.id,
    })
    .eq("idBot", botInfoId.id)
    .select();

    select()
  } else {
    console.log(botInfoId.imgCont)
    console.log('llegue')
    const x = await supabase
    .from("aibot")
    .update({
      name: botInfoId.name,
      description: botInfoId.description,
      imageUrl: selectedFile === "default"? previewURL:1,
      team: teamSelected? teamSelected: botInfoId.team.id,
    })
    .eq("idBot", botInfoId.id)
    .select();
  }
  const x1 = await supabase.storage
  .from("Images")
  .upload(
    `imagesChatBots/${botInfoId.idTenant}/${botInfoId.id}/${botInfoId.imgCont}`,
    selectedFile)

//IMG CONT REVISAR SI ES NUMERO O NO
//FIJAR EN LA SUMA DE CONT QUIZAS SUMAR A UN STRING
      select()


}

    // if (x.error) {
    //   console.log(x.error);
    //   return Swal.fire(
    //     "¡Hola, usuario!",
    //     "no se puedo realizar la modificacion",
    //     "error"
    //   );
    //   } 
      
    //   if(typeof botInfoId.imgCont === 'number' || !isNaN(Number(botInfoId.imgCont))){
    //     console.log(botInfoId.imageUrl)
    //     console.log(botInfoId.imgCont)
    //     console.log('llegue')
    //   }
    //   select()
      //   const x1 = await supabase.storage
      //   .from("Images")
      //   .upload(
      //     `imagesChatBots/${botInfoId.idTenant}/${botInfoId.id}`,
      //     selectedFile, {
      //       cacheControl: '3600',
      //       upsert: true
      //     }
      //   )
      //   console.log(x1)
      // }
      
    //   select();
    //   console.log(info)
    //   return Swal.fire(
    //     "¡Hola, usuario!",
    //     "Cambios guardados correctamente",
    //     "success"
    //   );
    // }
    
  };



  async function fetchData() {
    const x = await supabase.from("teams").select();
    if (x.error) {
      console.log(x.error);
    } else {
      setTeams(x.data);
    }
  
  }


  //Handle EDIT
  //funciones utilizadas para el manejo del seleccionado de avatar
  //setean vista en tiempo real y name en el file input name
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   if(typeof botInfoId.imgCont === 'number' ||!isNaN(Number(cont))){
    setBotInfoId((prevState) => ({
      ...prevState,
      imgCont: (+botInfoId.imgCont + 1).toString(),
    }));
   }else { 

   }
    const file = event.target.files && event.target.files[0];

    if (file) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file)); // Crear la URL de vista previa
    } else {
      setSelectedFile(null);
      setPreviewURL(null);
    }
    console.log(file)
  };


  const handleFileChangeDefault = (url: string) => {
    
    if(typeof botInfoId.imgCont === 'number' ||!isNaN(Number(cont))){
      setBotInfoId((prevState) => ({
        ...prevState,
        imgCont: (+botInfoId.imgCont + 1).toString(),
      }));
     }else { 
  
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

        // Comprueba el nuevo nombre del archivo en el input
        console.log(
          "Nuevo nombre del archivo en el input:",
          fileInput.files[0].name
        );
      } else {
        console.log("No se ha seleccionado ningún archivo.");
      }
    } else {
      console.log("No se encontró el input de tipo file.");
    }
  };
  return (
    <Layout title="ChatBots page">
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">ChatBots</h2>
            <Link href={"addbot"}>
              {" "}
              <Button>Add new bot</Button>
            </Link>
          </div>
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
                                  Make changes to your bot here. Click save when
                                  you re done.
                                </DialogDescription>
                                <div className={styles.avatarform}>
                                <Avatar className="w-20 h-20">
          {previewURL ? ( // Mostrar la vista previa si está disponible
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
                                  id="docfile"
                                  type="file"
                                    onChange={handleFileChange}
                                    name="imageUrl"
                                   // value={botInfoId.imageUrl}
                                    className="col-span-3"
                                  />
                                                <p>Or </p>
              <Popover >
  <PopoverTrigger asChild>
    <Button className={styles.PopoverContent} variant="outline">
      SELECTED IMAGE DEFAULT
    </Button>
  </PopoverTrigger>
  <PopoverContent className={styles.PopoverContent}>
    <PopoverClose>
      <div className="flex flex-wrap">
        {defaultimg?.map((img) => (
          <div key={img.value} className="w-1/4 p-2">
            <Avatar
             onClick={() => handleFileChangeDefault(img.value)}
              className={styles.avatarPop}
            >
              <AvatarImage src={img.value} />
              <AvatarFallback>CN</AvatarFallback>
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
                                    onChange={handleNombreUsuarioChange}
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
                          <DropdownMenuSeparator />

                          <DropdownMenuItem>
                            <PlusIcon className="mr-2 h-4 w-4" /> Create List
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className={styles.avatar}>
                      <Avatar className="w-25 h-25">
                        <AvatarImage src={typeof e.imageUrl === 'number' ||!isNaN(Number(e.imageUrl))?   `https://fzjgljxomqpukuvmguay.supabase.co/storage/v1/object/public/Images/imagesChatBots/${e.idTenant}/${e.idBot}/${e.imageUrl}`: e.imageUrl} />
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
