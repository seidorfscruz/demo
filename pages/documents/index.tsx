import { Layout } from '@/components/layouts'
import { Button } from '@/registry/default/ui/button';
import { MouseEvent } from 'react';
import axios from 'axios';


const DocumentsPage = () => {

    const onClick = (): void => {
        const files = document.querySelector<HTMLInputElement>('#docfile')?.files![0];
        
        const formData = new FormData();
        formData.append('files', files!);
        formData.append('chunkSize', '1000');
        formData.append('chunkOverlap', '30');
        formData.append('stripNewLines', 'true');
        formData.append('question', 'Hey, how are you?');
        
        axios.post('https://flowise.seidoranalytics.com/api/v1/prediction/e4740be0-f776-4d56-8bda-77134309fa5d', formData, { headers: { 'Content-Type': 'multipart/form-data' }})
                .then(function () { console.log('Success'); })
                .catch(function () { console.log('Failure'); });
    }

  return (
    <Layout title='Documents page'>
        <div className="hidden flex-col md:flex">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Upload your documents</h2>
                </div>
                
                <div className='flex flex-col pt-5 w-96'>
                    <input type="file" name="docfile" id="docfile" />
                    <Button className='mt-2' onClick={ onClick }>Upload</Button>
                </div>
            </div>
        </div>
    </Layout>
  )
};

export default DocumentsPage