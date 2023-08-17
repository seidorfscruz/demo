import { Layout } from "@/components/layouts";
import { Button } from "@/registry/default/ui/button";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Textarea } from "@/registry/default/ui/textarea";
import {Avatar,AvatarFallback,AvatarImage,} from "@/registry/default/ui/avatar";
import { Label } from "@/registry/default/ui/label";
import Swal from "sweetalert2";
import React from "react";
import { Payment, columns } from "./columnas"
import { DataTable } from "./data-table"

const DocumentsPage = () => {

  
  const [basededatos, setBasededatos] = useState<Payment[]>([]);
  const [nombres, setNombres] = useState<string | null>("");
  const [descriptions, setDescriptions] = useState<string>("");
  const [loading, setLoading] = useState(false)




  const currentDate = new Date();

  // Obtén el día, el mes y el año por separado
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Los meses en JavaScript son indexados desde 0, por lo que sumamos 1.
  const year = currentDate.getFullYear();
  // Formatea la fecha al formato día/mes/año
  const formattedDate = `${day}/${month}/${year}`;

  const getAllDataFromLocalStorage = () => {
    if (typeof window !== "undefined") {
      const allData = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key  = localStorage.key(i) as string;
        const value: string | null = localStorage.getItem(key);
        allData.push({ key, value });
      }
      return allData;
    }
  };

  function funcionAux(){

    getAllDataFromLocalStorage()
  }


  const getPublicDataFromLocalStorage = () => {
    if (typeof window !== "undefined") {
      const array  = [];
      const data:  {key: string | null; value: string | null;}[] | undefined = getAllDataFromLocalStorage();
      if(data !== undefined){
            for (let i = 0; i <= data.length - 1; i++) {
              console.log(data)
              array.push(data[i].value as any);
              // array.push(JSON.parse(data[i].value as string));
            }

            const info = array.map((objeto) => console.log(JSON.parse(objeto)));
            // const info = array.filter((objeto) => objeto.isData === true);
            // setBasededatos(info);
          }
    }
  };

  const onClick = ():  any => {
    if (!descriptions || !nombres) {
      return Swal.fire(
        "¡Hola, usuario!",
        "select a type or add description",
        "error"
      );
    }

    const data = {
      name: nombres,
      descriptions: descriptions,
      autor: "usuario1",
      date: formattedDate,
      isData: true,
      id: (Math.floor(Math.random() * 90000) + 10000).toString()
    };

    

    const files = document.querySelector<HTMLInputElement>("#docfile")?.files![0];
    const formData = new FormData();
    formData.append("files", files!);
    formData.append("chunkSize", "1000");
    formData.append("chunkOverlap", "30");
    formData.append("stripNewLines", "true");
    formData.append("question", "Hey, how are you?");

    setNombres(null);
    const fileInfoDiv = document.getElementById("file-info");
    setLoading(true)


    axios.post("https://flowise.seidoranalytics.com/api/v1/prediction/1060b49a-44c6-43de-98b7-fe047331ddf1", formData,{ headers: { "Content-Type": "multipart/form-data" } })
      .then(responese => setLoading(false))
      .then(response => localStorage.setItem(nombres, JSON.stringify(data)))
      .then(response => getPublicDataFromLocalStorage())
      .then(function () {Swal.fire("¡Hola, usuario!", "Cargado exitosamente", "success");})
      .catch(responese => setLoading(false))
      .catch(function () {Swal.fire( "¡Hola, usuario!","Su archivo no se ha podido cargar correctamente", "error" );
    });
  };


  const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptions(event.target.value);
  };

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const fileInput: HTMLInputElement | null = event.target;
    if (fileInput?.files && fileInput.files.length > 0) {
      const fileName = fileInput.files[0].name;
      setNombres(fileName);
    }
  }

  useEffect(() => {
    getPublicDataFromLocalStorage();
    // DemoPage()
    
  }, []);



  return (
    <Layout title="Documents page">
      <div className={styles.body}>
        <div className={styles.sidebar}>

<div className="container mx-auto py-10">
      <DataTable  columns={columns} data={basededatos} />
    </div>

        </div>

        <div className={styles.content}>
          <div className={styles.main}>
            <div className={styles.avatar}>
              <Avatar className="w-40 h-40">
                <AvatarImage src={"https://github.com/shadcn.png"} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>


            <div className={styles.descriptions}>
              <Label htmlFor="email">Your descriptions</Label>
              <Textarea onChange={ handleChangeText } />
            </div>
            <div className={styles.descriptions}>
              <label
                htmlFor="docfile"
                className="flex flex-col items-center justify-center w-full h-25 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <FaCloudUploadAlt className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  {nombres
                    ? `Filed Select: ${nombres}`
                    : "Select file PDF, TXT OR JSON (MAX. 1GBx)"}
                </p>
              </label>
              <input
                id="docfile"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              {nombres ? (
                <Button disabled={loading} variant="outline" onClick={onClick}>
                  Upload
                </Button>
              ) : (
                ""
                )}
            </div>
{loading &&<span className={styles.loader}></span>}

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DocumentsPage;
