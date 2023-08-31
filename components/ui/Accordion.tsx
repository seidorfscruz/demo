import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Props } from '@/interfaces'

const BasicAccordion: React.FC<Props> = ({children, title}) => {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <span className='text-gray-400 text-xs'>{ title }</span>
            {/* <span className='scroll-m-20 text-2xl font-bold tracking-tight mb-4'>{ title }</span> */}
          {/* <Typography>{ title }</Typography> */}
        </AccordionSummary>
        <AccordionDetails>
          { children }
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default BasicAccordion;