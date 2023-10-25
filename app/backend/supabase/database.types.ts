export type Json = {
  master:string,
  n1:string,
  n2:string,
  n3:string,
  n4:string,
  n5:string,
  n6:string,
}

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          dateCreated: string
          id: number
          passkeys: Json
          userName: string
        }
        Insert: {
          dateCreated?: string
          id?: number
          passkeys: Json
          userName: string
        }
        Update: {
          dateCreated?: string
          id?: number
          passkeys?: Json
          userName?: string
        }
        Relationships: []
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
