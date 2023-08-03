import { Layout } from '@/components/layouts'
import { Button } from '@/registry/default/ui/button';
import { Separator } from "@/registry/default/ui/separator"
import { MouseEvent } from 'react';
import { Input } from "@/registry/default/ui/input"
import { useState } from "react";
import axios from 'axios';
import styles from './styles.module.css';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { Textarea } from "@/registry/default/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/default/ui/avatar"
import { Label } from "@/registry/default/ui/label"
import {Table,TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow,} from "@/registry/default/ui/table"
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/registry/default/ui/select"
import {HoverCard,HoverCardContent,HoverCardTrigger,} from "@/registry/default/ui/hover-card"
import { Alert, AlertDescription, AlertTitle } from "/registry/default/ui//alert"
import Swal from 'sweetalert2';
import React from 'react'
import { Card } from 'semantic-ui-react'





const DocumentsPage = () => {

    const [nombres, setNombres] = useState("");
    const [descriptions, setDescriptions] = useState("");
    const [type, setType] = useState("");


    const onClick = (): void => {
        const files = document.querySelector<HTMLInputElement>('#docfile')?.files![0];
        const formData = new FormData();
        formData.append('files', files!);
        formData.append('chunkSize', '1000');
        formData.append('chunkOverlap', '30');
        formData.append('stripNewLines', 'true');
        formData.append('question', 'Hey, how are you?');

        setNombres(null)
        const fileInfoDiv = document.getElementById('file-info');
        fileInfoDiv.textContent = 'No file selected';
        
        axios.post('https://flowise.seidoranalytics.com/api/v1/prediction/e4740be0-f776-4d56-8bda-77134309fa5d', formData, { headers: { 'Content-Type': 'multipart/form-data' }})
                .then(function () { Swal.fire('¡Hola, usuario!', 'Cargado exitosamente', 'success');})
                .catch(function () { Swal.fire('¡Hola, usuario!', 'Su archivo no se ha podido cargar correctamente', 'error');})
    }

    const handleSelectChange = (event) => {
        console.log('hola')
        setType(event.target.value);
      };
    
    
        function handleFileChange(event) {
          const fileInput = event.target;
          const fileInfoDiv = document.getElementById('file-info');
          
          if (fileInput.files.length > 0) {
            const fileName = fileInput.files[0].name;
            setNombres(fileName)
            fileInfoDiv.textContent = `Selected file: ${fileName}`;
          } else {
            fileInfoDiv.textContent = 'No file selected';
          }
        }

        

  return (
        
    <Layout  title='Documents page'>
        <div className ={styles.body}>
        <div className ={styles.sidebar}>
        <Label htmlFor="email">Your files
        </Label>
<div className ={styles.hover}>
<h1>Estructura.js</h1>
<h3>25/05/2022</h3>
<p>adsdsada sdadas dasdsad asda
    dasdsadsda
    sadsdaads
</p>
</div>
<div className ={styles.hover}>
<h1>Algo.js</h1>
<h3>25/05/2023</h3>
<p>ads dsadas dadasd asdsad asda
    dasdsadsda
    sadsdaads
</p>
</div>


</div>

       
        
        <div className ={styles.content}>

                
        <div className={styles.main}>

          
<div className={styles.avatar}>
<Avatar className="w-40 h-40">
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

</div>
<div className={styles.select}>
<Label>Select an option</Label>
<select onChange={handleSelectChange}   id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option selected>Choose a type</option>
  <option value="CA">Economy</option>
  <option value="FR">Finance</option>
  <option value="DE">Human resources</option>
</select>
</div>

<div className={styles.descriptions}>
<Label htmlFor="email">Your descriptions</Label>
<Textarea onChange={handleSelectChange} />
</div>    

<div className={styles.descriptions}>
      <label htmlFor="docfile" className="flex flex-col items-center justify-center w-full h-25 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
      <FaCloudUploadAlt className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
           
           Select file PDF, TXT OR JSON (MAX. 1GBx)</p>
 
      </label>
      <div id="file-info" className="text-xs text-gray-500 dark:text-gray-400"></div>
      <input id="docfile" type="file" className="hidden" onChange={handleFileChange} />
      {nombres?<Button variant="outline" onClick={ onClick }>Upload</Button>:""}
</div>
  

          

        </div>
        </div>
        </div>
    </Layout>
    
  )
};

export default DocumentsPage