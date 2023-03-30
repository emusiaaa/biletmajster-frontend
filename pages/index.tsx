import Head from 'next/head'
import Image from 'next/image'

import { useEffect } from 'react'
import PageLayout from "@/components/PageLayout";

export default function Home() {

  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main>
          <PageLayout>
              <h1>hi</h1>
          </PageLayout>

      </main>

    </>
  )
}
