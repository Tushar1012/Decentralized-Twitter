import { ethers } from 'ethers'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import  { useState } from 'react'
import Button from '../components/Button'
import MyForm from '../components/Myform'
import useDwitter from '../Hooks/useDwitter'

const Home: NextPage = () => {
  const {connectWallet ,account,user,createUser} = useDwitter();
  const [dweetContent, setDweetContent] = useState<string>('')
  console.log(user);
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-20">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 ">
        <h1 className="mb-8 text-6xl font-bold">
          Welcome to{' '}
          <a className="text-blue-400" >
            Dwitter</a>
        </h1>


        {!account ? (
        <Button label="Connect with Ethereum" onClick={connectWallet}/>
         ) : account.toUpperCase() !== user?.wallet.toUpperCase() ? ( 
         <MyForm createUser={createUser} />
         ):(
            <div className="flex items-center w-80">
              <img src={user?.avatar} className="rounded-full h-16 w-16"  mr-4/>
              <div className='flex items-center w-80'>
                <textarea
                  // value={dweetInput}
                    onChange={(e) => setDweetContent(e.target.value)}
                    placeholder="What is in your mind....."
                    className="mx-3 max-h-[300px] min-h-[60px] w-60 rounded-xl border-2 border-gray-400 px-3 py-1 outline-blue-500"
                    name="post"
                    id="post"
                />
              </div>
              <div className="mt-2 flex justify-end w-73">
                <Button  label='Tweet' onClick={()=>console.log(dweetContent) 
                }/>
              </div>
              
            </div>
          )} 
      </main>
      <footer className='flex h-24 w-full items-center justify-center border-t'>
        Powered by Ethereum
      </footer>
       

    
    </div>
  )
}

export default Home






