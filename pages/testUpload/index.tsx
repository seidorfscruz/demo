
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import Login from '../login/index'
import { Button } from '@/registry/default/ui/button'
const TestUploadPage = () =>  {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
const handleSumbit = async ()=>{

  console.log(user)
}
const handleRegister = async ()=>{
  const x  = await supabaseClient.auth.signUp(
    {
      email: 'tenant1@seidor.com',
      password: 'example-password',
      options: {
        data: {
          last_name: 'Wick',
          first_name: 'Johnathan',
          id_tenant:'c81d4e2e-bcf2-11e6-869b-7df92533d2db',
          id_tenantint:1
        }
      }
    }
  )
  console.log(x.error)
  console.log(x)
}

return(
  <div>
<Button onClick={handleRegister}> Register</Button>
<Button onClick={handleSumbit}> console.logUser</Button>
  </div>
)

}

export default TestUploadPage