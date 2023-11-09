import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

// export function supabaseAfterLogin(token : string){
//     const headers = {Authorization: `Bearer ${token}`}
//     return createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!,{global:{headers:headers}})
// }

export const supabase = createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!)