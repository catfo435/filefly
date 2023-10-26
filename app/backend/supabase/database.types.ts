export type passKey = {
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
          fileDetails: Json
          id: number
          transactionTime: string | null
          transactionType: string
        }
        Insert: {
          fileDetails: Json
          id?: number
          transactionTime?: string | null
          transactionType: string
        }
        Update: {
          fileDetails?: Json
          id?: number
          transactionTime?: string | null
          transactionType?: string
        }
        Relationships: []
      }
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
