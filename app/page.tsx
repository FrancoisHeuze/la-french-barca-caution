"use client"

import { useState } from "react"

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(event: any) {
    event.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(event.currentTarget)

    const response = await fetch("/api/create-deposit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        amount: formData.get("amount"),
      }),
    })

    const data = await response.json()

    if (data.url) {
      window.location.href = data.url
    } else {
      setError(data.error || "Erreur inconnue")
      setLoading(false)
    }
  }

  return (
    <main style={{ maxWidth: 500, margin: "50px auto", fontFamily: "Arial", padding: 20 }}>
      <h1>La French Barca</h1>
      <p>Créer une empreinte bancaire de caution bateau.</p>

      <form onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Nom du client" required style={{ width: "100%", padding: 12, marginBottom: 10 }} />
        <input name="email" type="email" placeholder="Email du client" required style={{ width: "100%", padding: 12, marginBottom: 10 }} />
        <input name="amount" type="number" placeholder="Montant caution (€)" required style={{ width: "100%", padding: 12, marginBottom: 10 }} />

        <button type="submit" disabled={loading} style={{ width: "100%", padding: 14, background: "black", color: "white", border: "none", cursor: "pointer" }}>
          {loading ? "Création..." : "Créer le lien de caution"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </main>
  )
}
