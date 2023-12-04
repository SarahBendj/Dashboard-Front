'use client'
import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/useAuth';
import Reveal from '@/hook/reveal';
import useNotification from '@/hook/useNotification';
import { useRouter } from 'next/navigation';
import Create from '../../dashboard/CRUD/Create';


export default function Login() {
  const [identificant, setIdentificant] = useState('');
  const [password, setPassword] = useState('');
  const { login  } = useAuth();
  const { showSucess, showError } = useNotification();
  const router = useRouter();
 
  const handleFrom = async( e :FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:3003/login',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({identificant ,password}),
      
    })
  
    if( response.ok){
        const data = await response.json();
        if( 'token' in data ){
            const token : string = data.token
            login(token)
            router.replace('/dashboard')

        }
       showSucess('successfully logged in')  }
    } catch (error) {
        console.error('error ' , error)   
        showError('An error occured, please try again')
    }
  }



  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 shadow-md shadow-cyan-700 ">
      <Card className='  shadow-md shadow-cyan-700 outliner-none rounded-none'>
        <CardContent>
          <CardHeader className='text-bold text-2xl'>CUISTO </CardHeader>
          <CardContent>
            <form onSubmit={handleFrom}>
                <Reveal width='100%'>
                    
            <div className='my-4'>
              <Label htmlFor='identificant'> Identificant </Label>
              <Input className='shadow-md shadow-cyan-700 rounded none'
                name="identificant"
                placeholder="identificant1001"
                type="identificant"
                value={identificant}
                onChange={ (e) => {
                    setIdentificant(e.target.value);
                } }
              />
            </div>

            </Reveal>
            <Reveal width='100%'>

            <div className='my-4'>
              <Label htmlFor='password'> Password </Label>
              <Input 
                name="password"
                className=' px-4 shadow-md shadow-cyan-700 rounded none'
                type="password"
                value={password}
                onChange={ (e) => {
                    setPassword(e.target.value);
                } }
              />
            </div>
            </Reveal>
          
            <div className="mb-4 ">
            <Create 
                dataName='Reset password' 
                fields ={["email", "identificant"]} 
                createPath='login/reset'
                resetPassword={true} >
             </Create>
              
            </div>
            <div className="border-t my-4 "></div>

            <Button  className=' m-auto text-white rounded none block bg-cyan-900 hover:bg-cyan-950 ' > Login </Button>
            </form>
          </CardContent>
        </CardContent>
      </Card>
    </div>
  );
}
