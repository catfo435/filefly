export type passKey = {
  passkey:string,
  caption:string
}

type Json = {
  master:string,
  normalPasskeys : Array<passKey>
}

export type LoginEntry = {
  id: number,
  loginTime: string | null,
  master_user: string | null,
  user: string
}

export interface Database {
  public: {
    Tables: {
      loginHistory: {
        Row: {
          id: number
          loginTime: string | null
          master_user: string | null
          user: string
        }
        Insert: {
          id?: number
          loginTime?: string | null
          master_user?: string | null
          user: string
        }
        Update: {
          id?: number
          loginTime?: string | null
          master_user?: string | null
          user?: string
        }
        Relationships: []
      }
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