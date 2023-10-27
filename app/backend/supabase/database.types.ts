export type passKey = {
  id:number,
  passkey:string,
  caption:string
}

export type passKeyJson = {
  master:string,
  normalPasskeys : Array<passKey>
}

export type blockedUsers = {
  users: Array<string>
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type LoginEntry = {
  id: number,
  loginTime: string | null,
  master_user: string | null,
  user: string
}

export interface Database {
  public: {
    Tables: {
      fileHistory: {
        Row: {
          caption: string | null
          fileName: string
          id: number
          master: string
          sentBy: string
          sentTo: string
          transactionTime: string | null
          version: number | null
        }
        Insert: {
          caption?: string | null
          fileName: string
          id?: number
          master: string
          sentBy: string
          sentTo: string
          transactionTime?: string | null
          version?: number | null
        }
        Update: {
          caption?: string | null
          fileName?: string
          id?: number
          master?: string
          sentBy?: string
          sentTo?: string
          transactionTime?: string | null
          version?: number | null
        }
        Relationships: []
      }
      loginHistory: {
        Row: {
          id: number
          loginTime: string | null
          master_user: string | null
          secret: string
          user: string
        }
        Insert: {
          id?: number
          loginTime?: string | null
          master_user?: string | null
          secret: string
          user: string
        }
        Update: {
          id?: number
          loginTime?: string | null
          master_user?: string | null
          secret?: string
          user?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          blockedUsers: blockedUsers
          dateCreated: string
          id: number
          passkeys: passKeyJson
          userName: string
        }
        Insert: {
          blockedUsers?: blockedUsers
          dateCreated?: string
          id?: number
          passkeys: passKeyJson
          userName: string
        }
        Update: {
          blockedUsers?: blockedUsers
          dateCreated?: string
          id?: number
          passkeys?: passKeyJson
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
