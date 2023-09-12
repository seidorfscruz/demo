import styles from "./styles.module.css";
import { Layout } from "@/components/layouts";
import { Button } from "@/registry/default/ui/button";
import { Textarea } from "@/registry/default/ui/textarea";
import { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import { Label } from "@/registry/default/ui/label";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { Document } from "../../interfaces/info";
import { Input } from "@/registry/default/ui/input";
import { supabase } from "@/apis";
import { Task } from "../chatbots/index";
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
import { Separator } from "@/registry/default/ui/separator";
import Login from '../login/index'
import { useUser } from "@supabase/auth-helpers-react";



const DocumentsPage = () => {
  const user = useUser()
  const router = useRouter();
  const [basededatos, setBasededatos] = useState<Document[]>([]);
  const [nameReal, setNameReal] = useState<string | null>("");
  const [description, setDescription] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [bot, setBot] = useState<Task[]>([]);
  const idBot = router.query.documents;
  const [documentId, setDocumentId] = useState({
    id: "",
    name: "",
    description: "",
  });

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
    const x = await supabase
      .from("document")
      .delete()
      .eq("id", e.currentTarget.value);
    if (x.error) {
      Swal.fire(
        "Error",
        "Problem while trying to delete the document",
        "error"
      );
    } else {
      select();
      Swal.fire(
        "Hecho",
        "Document deleted",
        "success"
      );
    }
  };

  const onClick = async () => {
    if (!description || !name || !nameReal) {
      return Swal.fire(
        "Warning",
        "Add a description, please",
        "warning"
      );
    }

    const x = await supabase
      .from("document")
      .insert([
        {
          createdBy: "Seidor Analytics",
          description,
          name,
          nameReal,
          idBot,
        },
      ])
      .select();

    setLoading(true);

    if (x.error) {
      console.log(x.error);
      setLoading(false);
      return Swal.fire(
        "Oops...",
        "Error uploading the document",
        "error"
      );
    } else {
      setDescription("");
      setName("");
      setNameReal("");
      setLoading(false);
      select();
      return Swal.fire(
        "Done",
        "Document uploaded",
        "success"
      );
    }
  };

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const fileInput: HTMLInputElement | null = event.target;
    if (fileInput?.files && fileInput.files.length > 0) {
      const fileName = fileInput.files[0].name;
      setNameReal(fileName);
    }
  }

  const handleNombreUsuarioChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDocumentId((prevDocument) => ({
      ...prevDocument,
      [name]: value,
    }));
  };

  const handleBaseId = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.value;
    const x = await supabase.from("document").select("*").eq("id", id);
    if (x.error) {
    } else {
      setDocumentId({
        name: x.data[0].name,
        description: x.data[0].description,
        id: x.data[0].id,
      });
    }
  };

  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const x = await supabase
      .from("document")
      .update({ name: documentId.name, description: documentId.description })
      .eq("id", documentId.id)
      .select();

    if (x.error) {
      return Swal.fire(
        "Oops...",
        "Problem while trying to update the document",
        "error"
      );
    } else {
      select();
      return Swal.fire(
        "Done",
        "Document updated",
        "success"
      );
    }
  };

  if (!user)
  return (
<Login></Login>
  )

  return (
    <Layout title="Documents page">
      <div className={styles.body}>
        <div className={styles.sidebar}>
          <div className="flex flex-col items-center space-y-4 p-8 pt-6">
            <h2 className="text-3xl font-bold tracking-tight">
              {`${bot[0]?.name ? bot[0].name : ""}`} documents
            </h2>
            <TableCaption>This is the list of documents that feeds your chatbot</TableCaption>
          </div>
          
          <div className="container mx-auto py-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead style={{ width: "15%" }} className="w-[100px]">
                    Name
                  </TableHead>
                  <TableHead style={{ width: "45%" }}>Description</TableHead>
                  <TableHead style={{ width: "17%" }}>CreatedBy</TableHead>
                  <TableHead style={{ width: "13%" }}>Date uploaded</TableHead>
                  <TableHead style={{ width: "5%" }}>Edit</TableHead>
                  <TableHead style={{ width: "5%" }}>Delete</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {basededatos.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell className="font-medium">{e.name}</TableCell>
                    <TableCell>{e.description}</TableCell>
                    <TableCell>{e.createdBy}</TableCell>
                    <TableCell>
                      {e.created_at.toString().slice(0, 10)}
                    </TableCell>

                    <TableCell>
                      <Dialog>
                        <DialogTrigger>
                          <button
                            value={e.id}
                            onClick={(event) => {
                              handleBaseId(event);
                            }}
                            className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#000000"
                              strokeWidth="2"
                            >
                              <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                              <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                            </svg>
                          </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Edit document</DialogTitle>
                            <DialogDescription>
                              Make changes to your document here. Click save
                              when you re done.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">
                                Name
                              </Label>
                              <Input
                                disabled={ loading }
                                name="name"
                                value={documentId.name}
                                onChange={handleNombreUsuarioChange}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="username" className="text-right">
                                Descriptions
                              </Label>
                              <Textarea
                                disabled={ loading }
                                name="description"
                                value={documentId.description}
                                onChange={handleNombreUsuarioChange}
                                className="col-span-3"
                              />
                            </div>
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
                    </TableCell>

                    <TableCell className="text-right">
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <button
                            value={e.id}
                            className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 22 22"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your document and remove your
                              data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              value={e.id}
                              onClick={(e) => {
                                handleDelete(e);
                              }}
                            >
                              Continue
                            </AlertDialogAction>
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
            <div className="py-8">
              <Avatar className="w-40 h-40 p-1 border-4 border-dashed rounded-lg border-primary/10 hover:opacity-75 transition">
                <AvatarImage src={bot[0]?.imageUrl ? bot[0].imageUrl : ""} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            
            <div className="space-y-2 w-full col-span-2 pb-5">
              <div className="pb-5">
                <h3 className="text-lg text-center font-semibold">Documents upload</h3>
                <p className="text-sm text-center text-muted-foreground">{ `Add new document to your chatbot` }</p>
              </div>
              <Separator className="bg-primary/10" />
            </div>

            <div className='flex flex-col w-11/12'>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  disabled={ loading }
                  className="mt-2"
                  value={ name }
                  placeholder="Give your file a name"
                  onChange={(e) => setName(e.target.value)}
                />
                <small className="text-primary/25">This name will identify your document</small>
              </div>

              <div className="mt-5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  disabled={ loading }
                  className="mt-2"
                  placeholder="Give it a short description" 
                  value={ description }
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className="w-full leading-none mt-1">
                  <small className='text-primary/25'>A short description about the content of your document</small>
                </div>
              </div>
              
            <div className='w-12/12 mt-5'>
              <Label
                htmlFor="docfile"
                className="flex flex-col items-center justify-center w-full h-25 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 pt-2 pb-3"
              >
                <FaCloudUploadAlt className="w-8 h-8 mb-1 text-gray-500 dark:text-gray-400" />
                <p>
                  {
                    nameReal ? `${nameReal}` : 'Select file (Max 50mb)'
                  }
                </p>
              </Label>
              <Input
                disabled={ loading }
                id="docfile"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="flex justify-center my-5">
                <Button className="w-full" disabled={ loading || nameReal === '' } variant="outline" onClick={onClick}>
                  Upload
                </Button>
              </div>

            </div>
            </div>

            {loading && <span className={styles.loader}></span>}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DocumentsPage;
