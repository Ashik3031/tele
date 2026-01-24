import React from 'react'
import ClientsHero from '../Components/ClientsHero'
import ClientsScroller from '../Components/ClientsScroller'
import ContactPage from '../Components/ContactPage'
import ClientPartner from '../Components/ClientPartner'

function ClientPage() {
  return (
    <div>
        <ClientsHero/>
        <ClientsScroller />
        <ClientPartner />
        <ContactPage/>
    </div>
  )
}

export default ClientPage