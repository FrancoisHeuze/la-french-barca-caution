"use client"

import { useState } from "react"

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [payments, setPayments] = useState<any[]>([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function loadPayments() {
    setLoading(true)
    setError("")

    const res = await fetch("/api/admin/list", {
      headers: { "x-admin-password": password },
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || "Erreur")
      setLoading(false)
      return
    }

    setPayments(data.payments)
    setLoading(false)
  }

  async function action(paymentIntentId: string, type: "capture" | "cancel" | "refund") {
    const label =
      type === "capture"
        ? "capturer cette caution ?"
        : type === "cancel"
        ? "libérer cette caution ?"
        : "rembourser ce paiement ?"

    if (!confirm(`Confirmer : ${label}`)) return

    const res = await fetch(`/api/admin/${type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
      },
      body: JSON.stringify({ paymentIntentId }),
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.error || "Erreur")
      return
    }

    await loadPayments()
  }

  function statusLabel(status: string) {
    if (status === "requires_capture") return "Caution autorisée"
    if (status === "succeeded") return "Capturée / encaissée"
    if (status === "canceled") return "Libérée / annulée"
    return status
  }

  return (
    <main style={{ maxWidth: 1000, margin: "40px auto", fontFamily: "Arial", padding: 20 }}>
      <h1>Admin cautions - La French Barca</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          type="password"
          placeholder="Mot de passe admin"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 12, width: 250, marginRight: 10 }}
        />

        <button onClick={loadPayments} style={{ padding: 12 }}>
          Charger les cautions
        </button>
      </div>

      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ccc", padding: 8 }}>Client</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: 8 }}>Email</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: 8 }}>Montant</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: 8 }}>Statut</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: 8 }}>Date</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: 8 }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((p) => (
            <tr key={p.id}>
              <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>
                {p.customer_name}
              </td>

              <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>
                {p.customer_email}
              </td>

              <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>
                {(p.amount / 100).toFixed(2)} €
              </td>

              <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>
                {statusLabel(p.status)}
              </td>

              <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>
                {new Date(p.created * 1000).toLocaleDateString("fr-FR")}
              </td>

              <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>
                {p.status === "requires_capture" && (
                  <>
                    <button onClick={() => action(p.id, "cancel")} style={{ marginRight: 8 }}>
                      Libérer
                    </button>

                    <button onClick={() => action(p.id, "capture")}>
                      Capturer
                    </button>
                  </>
                )}

                {p.status === "succeeded" && (
                  <button onClick={() => action(p.id, "refund")}>
                    Rembourser
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
