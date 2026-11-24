import { useState } from 'react'
import { seedDemoData } from '../services/vendors.js'

function SeedPage() {
  const [message, setMessage] = useState('')

  async function handleSeed() {
    setMessage('Seeding…')
    try {
      const res = await fetch('/api/vendors.json')
      const vendors = await res.json()
      await seedDemoData(vendors)
      setMessage(`Done: ${vendors.length} vendors written to Firestore.`)
    } catch (err) {
      setMessage(`Failed: ${err.message}`)
    }
  }

  return (
    <section className="card" style={{ padding: '2rem', maxWidth: '500px', margin: '2rem auto' }}>
      <h2 className="section-title">Seed Firestore</h2>
      <p className="muted" style={{ marginBottom: '1.25rem' }}>
        Populate Firestore collections with vendor data and menu subcollections from vendors.json.
      </p>
      <button className="btn" onClick={handleSeed}>
        Load demo data
      </button>
      {message && <p style={{ marginTop: '1rem', fontWeight: 600 }}>{message}</p>}
    </section>
  )
}

export default SeedPage
