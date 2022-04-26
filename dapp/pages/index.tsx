import { ethers } from 'ethers'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Button from '../components/Button'
import useDwitter from '../Hooks/useDwitter'

const Home: NextPage = () => {
  const {connectWallet ,account} = useDwitter();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="mb-8 text-6xl font-bold">
          Welcome to{' '}
          <a className="text-blue-400" >
            Dwitter
          </a>
        </h1>
        {!account ? <Button label="Connect with ethereum"
         onClick={connectWallet}/> : (<p className='text-red-400'> Connected to {account}</p>)}
      </main>
       

    
    </div>
  )
}

export default Home
