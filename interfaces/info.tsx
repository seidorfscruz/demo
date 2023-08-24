export interface Document {
  createdBy: string;
  created_at: Date;
  description: string;
  id: string;
  idBot: string;
  name:string;
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


