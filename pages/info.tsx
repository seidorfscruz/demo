export interface Document {
  autor: string;
  date: string;
  descriptions: string;
  id: string;
  name: string;
}

export interface BotInfo {
  name: string;
  id: string;
  descriptions: string;
  date: string;
  autor: string;
  type?: string;
  img: string;
  docs: Document[];
}

export const Info: BotInfo[] = [
  {
    name: "Finanzas",
    id: "1",
    descriptions: "Soy un bot de Finanzas",
    date: "25/08/2023",
    autor: "Maria",
    img:'https://images.pexels.com/photos/5980870/pexels-photo-5980870.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    docs: [
      {
        autor: "usuario1",
        date: "9/8/2023",
        descriptions: "sadasdasd",
        id: "43938",
        name: "finazasdoc.pdf",
      },
      {
        autor: "usuario1",
        date: "10/8/2023",
        descriptions: "sadasdasd",
        id: "43938",
        name: "finanzas.pdf",
      }
    ],
  },
  {
    name: "Legales",
    id: "2",
    descriptions: "Soy un bot para archivos legales",
    date:"29/06/2023",
    autor: "Fernando",
    type: "bot",
    img:'https://images.pexels.com/photos/7841451/pexels-photo-7841451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    docs: [
        {
          autor: "usuario recursos",
          date: "9/8/2023",
          descriptions: "sadasdasd",
          id: "43938",
          name: "humanresourcesv2.pdf",
        },
        {
          autor: "usuario recursos",
          date: "10/8/2023",
          descriptions: "sadasdasd",
          id: "43938",
          name: "humanresources.pdf",
        }
      ],
  },
  {
    name: "rrhh",
    id: "3",
    descriptions: "Soy un bot para archivos de rrhh",
    date: "12/12/2012",
    autor: "Martin",
    type: "bot",
    img:'https://images.pexels.com/photos/1888033/pexels-photo-1888033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    docs: [
        {
          autor: "usuario1",
          date: "9/8/2023",
          descriptions: "sadasdasd",
          id: "43938",
          name: "rrhh.pdf",
        },
        {
          autor: "usuario1",
          date: "10/8/2023",
          descriptions: "sadasdasd",
          id: "43938",
          name: "rrhh.pdf",
        }
      ],
  },
];
