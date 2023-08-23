"use client"

import * as React from "react"
import {useEffect, useState} from 'react'
import supabase from "../../apis/supabase";
import { DotsHorizontalIcon,} from "@radix-ui/react-icons"
import { Button } from "@/registry/new-york/ui/button"
import {DropdownMenu,DropdownMenuCheckboxItem,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger,} from "@/registry/new-york/ui/dropdown-menu"
import { Layout } from "@/components/layouts"
import Link from "next/link"
import {Avatar,AvatarFallback,AvatarImage,} from "@/registry/default/ui/avatar"
import Swal, { SweetAlertResult } from "sweetalert2";
import {Table,TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow,} from "@/registry/default/ui/table"
import {AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogTitle,AlertDialogTrigger,} from "@/registry/default/ui/alert-dialog"
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
} from "@/registry/default/ui/dialog"
import { Label } from "@/registry/default/ui/label";
import { Input } from "@/registry/default/ui/input";
import { Textarea } from "@/registry/default/ui/textarea";

export type Task = {
  name: string | null;
    idBot: string;
    idTenant:string | null;
    description: string | null;
    createdUser:string | null;
    updatedUser:string | null;
    updatedAt: Date | null; 
    createdAt: Date | null;
    team: string | null;
    imageUrl: string | null;
   
}


export default function DataTableDemo() {
  const [info, setInfo] =useState<Task[] | null>(null)
  const [botInfoId, setBotInfoId] = useState({
    id: '',
    name: '',
    description: '',
    imageUrl:'',
    

  })



  const select = async () => {
    const x = await supabase.from("aibot").select("*");
    setInfo(x.data);
    
  };
  
  useEffect(() => {

  select()
    
  }, []); 

  const handleDelete =async  (id: string) =>{
    console.log(id)
    const x = await supabase
    .from('aibot')
    .delete()
    .eq('idBot', id)
  
    if(x.error){
      console.log(x.error)
  Swal.fire(
    "¡Hola, usuario!",
    "Bot no pudo ser eliminado ",
    "warning"
  )} else {
    select()
    Swal.fire(
      "¡Hola, usuario!",
      "Bot eliminado exitosamente",
      "success")
    
  }}


  
  const handleNombreUsuarioChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>)  => {
    const { name, value } = e.target;
    setBotInfoId((prevDocument) => ({
      ...prevDocument,
      [name]: value,
    }));
 };
 const handleBaseId = async (event: React.MouseEvent<HTMLButtonElement>) => {

   const id = event.currentTarget.id
  

  const x = await supabase.from('aibot').select("*").eq('idBot', id)
  if (x.error) {

  } else {

    setBotInfoId({
      name: x.data[0].name,
      description: x.data[0].description,
      imageUrl: x.data[0].imageUrl,
      id: x.data[0].idBot,
    })
  }
}
const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {

  const x = await supabase
    .from('aibot')
    .update({ name: botInfoId.name, description: botInfoId.description, imageUrl: botInfoId.imageUrl  })
    .eq('idBot', botInfoId.id)
    .select()

  if (x.error) {
    return Swal.fire("¡Hola, usuario!", "no se puedo realizar la modificacion", "error");
  } else {
    select()
    return Swal.fire("¡Hola, usuario!", "Cambios guardados correctamente", "success");
  }
}


  return (
    <Layout title="ChatBots page">
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">ChatBots</h2>
          <Link href={'addbot'}> <Button>Add new bot</Button></Link>
          </div>
        </div>
      </div>


      <div className="w-11/12 mx-auto">
     
      <Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Avatar</TableHead>
      <TableHead>Name</TableHead>
      <TableHead>Description</TableHead>
      <TableHead>CreatedBy</TableHead>
      <TableHead>Date</TableHead>
      <TableHead >Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {info ? (
      info.map((e) => (
        <TableRow key={e.idBot}>
          <TableCell>
          <Avatar className="w-10 h-10">
      <AvatarImage src={e.imageUrl || ''} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar></TableCell>
          <TableCell className="font-medium">{e.name}</TableCell>
          <TableCell>{e.description}</TableCell>
          <TableCell>{e.createdUser}</TableCell>
          <TableCell>{e.createdAt?.toString().slice(0, 10)}</TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <Link href={`/documents/${e.idBot}`}>
                  <p className={styles.pbtton}>
                    Upload document
                    
                  </p>
                </Link>
                <DropdownMenuSeparator />

                <Dialog>
                        <DialogTrigger className={styles.dialog}>
                       
                <button id={e.idBot} onClick={(event) => { handleBaseId(event) }} className={styles.pbtton}>Edit bot</button>
                
                </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Edit bot</DialogTitle>
                            <DialogDescription>
                              Make changes to your bot here. Click save when you're done.
                            </DialogDescription>
                            <div className={styles.avatarform}> 
                            <Avatar className="w-20 h-20">
        <AvatarImage src={botInfoId.imageUrl || ''} />
        <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                </div>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">
                                Name
                              </Label>
                              <Input onChange={handleNombreUsuarioChange} name="name" value={botInfoId.name} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="img" className="text-right">
                                Avatar
                              </Label>
                              <Input onChange={handleNombreUsuarioChange} name="imageUrl"  value={botInfoId.imageUrl} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="username" className="text-right">
                                Descriptions
                              </Label>
                              <Textarea onChange={handleNombreUsuarioChange} name="description" value={botInfoId.description}  className="col-span-3" />
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button onClick={handleUpdate}  type="button">Save changes</Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>


                <AlertDialog>
  <AlertDialogTrigger>
  <DropdownMenuSeparator />
                  <p className={styles.pbtton}>Delete bot</p>
           
                </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your document
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction value={e.idBot} 
      onClick={(event) => {
        event.preventDefault();
        handleDelete(e.idBot); // Pasa el idBot directamente a la función handleDelete
      }}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell colSpan={6} className="h-24 text-center">
          No results.
        </TableCell>
      </TableRow>
    )}
  </TableBody>
</Table>
      </div>
    </Layout>
  )
}