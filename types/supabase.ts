export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      aibot: {
        Row: {
          createdAt: string | null
          createdUser: string | null
          description: string | null
          disabled: boolean | null
          idBot: number
          idTenant: number
          imageUrl: string | null
          name: string
          team: string | null
          updatedAt: string | null
          updatedUser: string | null
        }
        Insert: {
          createdAt?: string | null
          createdUser?: string | null
          description?: string | null
          disabled?: boolean | null
          idBot?: number
          idTenant: number
          imageUrl?: string | null
          name: string
          team?: string | null
          updatedAt?: string | null
          updatedUser?: string | null
        }
        Update: {
          createdAt?: string | null
          createdUser?: string | null
          description?: string | null
          disabled?: boolean | null
          idBot?: number
          idTenant?: number
          imageUrl?: string | null
          name?: string
          team?: string | null
          updatedAt?: string | null
          updatedUser?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "aibot_idTenant_fkey"
            columns: ["idTenant"]
            referencedRelation: "tenants"
            referencedColumns: ["idTenant"]
          },
          {
            foreignKeyName: "aibot_team_fkey"
            columns: ["team"]
            referencedRelation: "teams"
            referencedColumns: ["id"]
          }
        ]
      }
      chats: {
        Row: {
          createdAt: string | null
          createdUser: string | null
          idBot: string
          idChat: number
          idTenant: string
          updatedAt: string | null
          updatedUser: string | null
        }
        Insert: {
          createdAt?: string | null
          createdUser?: string | null
          idBot: string
          idChat?: number
          idTenant: string
          updatedAt?: string | null
          updatedUser?: string | null
        }
        Update: {
          createdAt?: string | null
          createdUser?: string | null
          idBot?: string
          idChat?: number
          idTenant?: string
          updatedAt?: string | null
          updatedUser?: string | null
        }
        Relationships: []
      }
      document: {
        Row: {
          created_at: string
          createdBy: string | null
          description: string | null
          id: string
          idBot: number | null
          name: string | null
          nameReal: string | null
        }
        Insert: {
          created_at?: string
          createdBy?: string | null
          description?: string | null
          id?: string
          idBot?: number | null
          name?: string | null
          nameReal?: string | null
        }
        Update: {
          created_at?: string
          createdBy?: string | null
          description?: string | null
          id?: string
          idBot?: number | null
          name?: string | null
          nameReal?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "document_idBot_fkey"
            columns: ["idBot"]
            referencedRelation: "aibot"
            referencedColumns: ["idBot"]
          }
        ]
      }
      messages: {
        Row: {
          createdAt: string | null
          createdUser: string | null
          idChat: number | null
          idMessage: number
          idTenant: string
          idUser: string
          messageText: string | null
          updatedAt: string | null
          updatedUser: string | null
        }
        Insert: {
          createdAt?: string | null
          createdUser?: string | null
          idChat?: number | null
          idMessage?: number
          idTenant: string
          idUser: string
          messageText?: string | null
          updatedAt?: string | null
          updatedUser?: string | null
        }
        Update: {
          createdAt?: string | null
          createdUser?: string | null
          idChat?: number | null
          idMessage?: number
          idTenant?: string
          idUser?: string
          messageText?: string | null
          updatedAt?: string | null
          updatedUser?: string | null
        }
        Relationships: []
      }
      sourcebot: {
        Row: {
          createdAt: string | null
          createdUser: string | null
          fileLocation: string | null
          idBot: string
          idSource: string
          idTenant: string
          name: string
          sourceType: string
          updatedAt: string | null
          updatedUser: string | null
          urlString: string | null
        }
        Insert: {
          createdAt?: string | null
          createdUser?: string | null
          fileLocation?: string | null
          idBot: string
          idSource: string
          idTenant: string
          name: string
          sourceType: string
          updatedAt?: string | null
          updatedUser?: string | null
          urlString?: string | null
        }
        Update: {
          createdAt?: string | null
          createdUser?: string | null
          fileLocation?: string | null
          idBot?: string
          idSource?: string
          idTenant?: string
          name?: string
          sourceType?: string
          updatedAt?: string | null
          updatedUser?: string | null
          urlString?: string | null
        }
        Relationships: []
      }
      teams: {
        Row: {
          created_at: string
          description: string | null
          id: string
          imageUrl: string | null
          name: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          imageUrl?: string | null
          name?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          imageUrl?: string | null
          name?: string | null
        }
        Relationships: []
      }
      tenants: {
        Row: {
          createdAt: string | null
          createdUser: string | null
          disclaimer: string | null
          email: string
          idCustomer: string | null
          idSubscription: string | null
          idTenant: number
          payment: string | null
          plan: string | null
          updatedAt: string | null
          updatedUser: string | null
        }
        Insert: {
          createdAt?: string | null
          createdUser?: string | null
          disclaimer?: string | null
          email: string
          idCustomer?: string | null
          idSubscription?: string | null
          idTenant?: number
          payment?: string | null
          plan?: string | null
          updatedAt?: string | null
          updatedUser?: string | null
        }
        Update: {
          createdAt?: string | null
          createdUser?: string | null
          disclaimer?: string | null
          email?: string
          idCustomer?: string | null
          idSubscription?: string | null
          idTenant?: number
          payment?: string | null
          plan?: string | null
          updatedAt?: string | null
          updatedUser?: string | null
        }
        Relationships: []
      }
      tenantsettings: {
        Row: {
          createdAt: string | null
          createdUser: string | null
          idSetting: number
          idTenant: number
          nameSetting: string
          updatedAt: string | null
          updatedUser: string | null
        }
        Insert: {
          createdAt?: string | null
          createdUser?: string | null
          idSetting?: number
          idTenant: number
          nameSetting: string
          updatedAt?: string | null
          updatedUser?: string | null
        }
        Update: {
          createdAt?: string | null
          createdUser?: string | null
          idSetting?: number
          idTenant?: number
          nameSetting?: string
          updatedAt?: string | null
          updatedUser?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tenantsettings_idTenant_fkey"
            columns: ["idTenant"]
            referencedRelation: "tenants"
            referencedColumns: ["idTenant"]
          }
        ]
      }
      userchat: {
        Row: {
          createdAt: string | null
          createdUser: string | null
          idChat: number | null
          idTenant: string
          idUser: string
          idUserChat: number
          updatedAt: string | null
          updatedUser: string | null
        }
        Insert: {
          createdAt?: string | null
          createdUser?: string | null
          idChat?: number | null
          idTenant: string
          idUser: string
          idUserChat?: number
          updatedAt?: string | null
          updatedUser?: string | null
        }
        Update: {
          createdAt?: string | null
          createdUser?: string | null
          idChat?: number | null
          idTenant?: string
          idUser?: string
          idUserChat?: number
          updatedAt?: string | null
          updatedUser?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          active: string | null
          company: string | null
          country: string | null
          createdAt: string | null
          createdUser: string | null
          email: string
          firstName: string | null
          idTenant: number
          idUser: number
          lastName: string | null
          phone: string | null
          terms: string | null
          updatedAt: string | null
          updatedUser: string | null
        }
        Insert: {
          active?: string | null
          company?: string | null
          country?: string | null
          createdAt?: string | null
          createdUser?: string | null
          email: string
          firstName?: string | null
          idTenant: number
          idUser?: number
          lastName?: string | null
          phone?: string | null
          terms?: string | null
          updatedAt?: string | null
          updatedUser?: string | null
        }
        Update: {
          active?: string | null
          company?: string | null
          country?: string | null
          createdAt?: string | null
          createdUser?: string | null
          email?: string
          firstName?: string | null
          idTenant?: number
          idUser?: number
          lastName?: string | null
          phone?: string | null
          terms?: string | null
          updatedAt?: string | null
          updatedUser?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_idTenant_fkey"
            columns: ["idTenant"]
            referencedRelation: "tenants"
            referencedColumns: ["idTenant"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
