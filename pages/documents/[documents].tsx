import styles from "./styles.module.css";
import { Layout } from "@/components/layouts";
import { Button } from "@/registry/default/ui/button";
import { Textarea } from "@/registry/default/ui/textarea";
import { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/default/ui/avatar";
import { Label } from "@/registry/default/ui/label";
import Swal from "sweetalert2";
import React from "react";
import { useRouter } from "next/router";
import { Document } from "../info";
import { Input } from "@/registry/default/ui/input";
import { supabase } from "@/apis";
import { Task } from "../chatbots/index";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/registry/default/ui/table"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/registry/default/ui/alert-dialog"
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
import { error } from "console";


// const DocumentsPage = () => {

// const router = useRouter();
// const [name,setName] = useState<string>("")
// const [img,setImg] = useState<string>("")
// const [basededatos, setBasededatos] = useState<Document[]>([])
// const [nombres, setNombres] = useState<string | null>("");
// const [descriptions, setDescriptions] = useState<string>("");
// const [loading, setLoading] = useState<boolean>(false)

const DocumentsPage = () => {
  const router = useRouter();
  const [basededatos, setBasededatos] = useState<Document[]>([]);
  const [nameReal, setNameReal] = useState<string | null>("");
  const [description, setDescription] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [bot, setBot] = useState<Task[]>([]);
  const idBot = router.query.documents
  const [documentId, setDocumentId] = useState({
    id: '',
    name: '',
    description: ''
  })

  const currentDate = new Date();
  // Obtén el día, el mes y el año por separado
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Los meses en JavaScript son indexados desde 0, por lo que sumamos 1.
  const year = currentDate.getFullYear();
  // Formatea la fecha al formato día/mes/año
  const formattedDate = `${day}/${month}/${year}`;

  useEffect(() => {
    const idBotValue = router.query.documents;
    select();
  }, [router.query.documents]);



  const select = async () => {
    const aux = router.query.documents;
    const x = await supabase.from("document").select("*").eq("idBot", aux);
    const x1 = await supabase.from("aibot").select("*").eq("idBot", aux);
    if (x1.data !== null) setBot(x1.data);
    if (x.data !== null) setBasededatos(x.data);
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {

    const x = await supabase.from('document').delete().eq('id', e.currentTarget.value)
    if (x.error) {
      Swal.fire("¡Hola, usuario!", "El documento no pudo ser eliminado ", "warning")
    } else {
      select()
      Swal.fire("¡Hola, usuario!", "Documento eliminado correctamente", "success")
    }
  }



  const onClick = async () => {


    if (!description || !name || !nameReal) {
      return Swal.fire("¡Hola, usuario!", "select a type or add description", "error");
    }

    const x = await supabase
      .from('document')
      .insert([
        {
          createdBy: 'User1',
          description,
          name,
          nameReal,
          idBot,
        },
      ])
      .select()



    // const files =
    //   document.querySelector<HTMLInputElement>("#docfile")?.files![0];
    // const formData = new FormData();
    // formData.append("files", files!);
    // formData.append("chunkSize", "1000");
    // formData.append("chunkOverlap", "30");
    // formData.append("stripNewLines", "true");
    // formData.append("question", "Hey, how are you?");

    setLoading(true);

    if (x.error) {
      console.log(x.error)
      setLoading(false);
      return Swal.fire(
        "¡Hola, usuario!",
        "Error al subir el documento",
        "error"
      );
    } else {
      setDescription('')
      setName('')
      setNameReal('')
      setLoading(false);
      select();
      return Swal.fire(
        "¡Hola, usuario!",
        "Documento subido correctamente",
        "success"
      );

    }
    // axios
    //   .post(
    //     "https://flowise.seidoranalytics.com/api/v1/prediction/1060b49a-44c6-43de-98b7-fe047331ddf1",
    //     formData,
    //     { headers: { "Content-Type": "multipart/form-data" } }
    //   )
    //   .then((responese) => setLoading(false))
    //   .then(function () {
    //     Swal.fire("¡Hola, usuario!", "Cargado exitosamente", "success");
    //   })
    //   .catch((responese) => setLoading(false))
    //   .catch(function () {
    //     Swal.fire(
    //       "¡Hola, usuario!",
    //       "Su archivo no se ha podido cargar correctamente",
    //       "error"
    //     );
    //   });
  };

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const fileInput: HTMLInputElement | null = event.target;
    if (fileInput?.files && fileInput.files.length > 0) {
      const fileName = fileInput.files[0].name;
      setNameReal(fileName)
    }
  }

  const handleNombreUsuarioChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDocumentId((prevDocument) => ({
      ...prevDocument,
      [name]: value,
    }));


  };

  const handleBaseId = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.value

    const x = await supabase.from('document').select("*").eq('id', id)
    if (x.error) {

    } else {

      setDocumentId({
        name: x.data[0].name,
        description: x.data[0].description,
        id: x.data[0].id,
      })
    }
  }

  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {

    const x = await supabase
      .from('document')
      .update({ name: documentId.name, description: documentId.description })
      .eq('id', documentId.id)
      .select()

    if (x.error) {
      return Swal.fire("¡Hola, usuario!", "no se puedo realizar la modificacion", "error");
    } else {
      select()
      return Swal.fire("¡Hola, usuario!", "Cambios guardados correctamente", "success");
    }
  }


  return (
    <Layout title="Documents page">

      <div className={styles.body}>
        <div className={styles.sidebar}>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {`${bot[0]?.name ? bot[0].name : ""}`} documents
    </h2>
          <div className="container mx-auto py-10">

            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead style={{ width: "15%" }} className="w-[100px]">Name</TableHead>
                  <TableHead style={{ width: "45%" }}>Description</TableHead>
                  <TableHead style={{ width: "17%" }}>CreatedBy</TableHead>
                  <TableHead style={{ width: "13%" }}>Date</TableHead>
                  <TableHead style={{ width: "5%" }}>Edit</TableHead>
                  <TableHead style={{ width: "5%" }} className="text-right">Delete</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {basededatos.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell className="font-medium">{e.name}</TableCell>
                    <TableCell>{e.description}</TableCell>
                    <TableCell >{e.createdBy}</TableCell>
                    <TableCell>{e.created_at.toString().slice(0, 10)}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger>
                          <button value={e.id} onClick={(event) => { handleBaseId(event) }}
                            className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                          </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Edit document</DialogTitle>
                            <DialogDescription>
                              Make changes to your document here. Click save when you're done.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">
                                Name
                              </Label>
                              <Input name="name" value={documentId.name} onChange={handleNombreUsuarioChange} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="username" className="text-right">
                                Descriptions
                              </Label>
                              <Textarea name="description" value={documentId.description} onChange={handleNombreUsuarioChange} className="col-span-3" />
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button onClick={handleUpdate} type="button">Save changes</Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>

<!--         <h1>{`${name}` } </h1>
<div className="container mx-auto py-10">
      <DataTable  columns={columns} data={ basededatos } />
    </div> -->

                    <TableCell className="text-right">
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <button value={e.id} className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
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
                            <AlertDialogAction value={e.id}
                              onClick={(e) => {
                                handleDelete(e);
                              }}>Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>

                ))}
              </TableBody>
            </Table>


          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.main}>
         
            <div className={styles.avatar}>
              <Avatar className="w-40 h-40">
                <AvatarImage src={bot[0]?.imageUrl ? bot[0].imageUrl : ""} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
                                <Label>Add new document to bot   <span className={styles.spanBotname}>{`${bot[0]?.name ? bot[0].name : ""}`}</span></Label>
            <div className={styles.descriptions}>
              <Label htmlFor="email">Name</Label>

              <Input value={name} onChange={(e) => setName(e.target.value)} />

              <Label htmlFor="email">Description</Label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
              
              <div className={styles.descriptions}>
                <Label htmlFor="email">Your descriptions</Label>
                <Textarea onChange={ handleChangeText } />
              </div>
              
            <div className={styles.descriptions}>
              <Label
                htmlFor="docfile"
                className="flex flex-col items-center justify-center w-full h-25 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <FaCloudUploadAlt className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                <p className={styles.pfile}>
                  {nameReal
                    ? ` Select file:
                    ${nameReal}`
                    : "Select  PDF (MAX. 50mb)"}
                </p>
              </Label>
              <Input
                id="docfile"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              {nameReal ? (
                <Button disabled={loading} variant="outline" onClick={onClick}>
                  Upload
                </Button>
              ) : (
                ""
              )}
            </div>
            {loading && <span className={styles.loader}></span>}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DocumentsPage;
