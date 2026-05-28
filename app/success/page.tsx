export default function SuccessPage() {
  return (
    <main style={{ maxWidth: 500, margin: "50px auto", fontFamily: "Arial", padding: 20 }}>
      <h1>Caution préautorisée ✅</h1>

      <p>
        L’empreinte bancaire a bien été enregistrée.
      </p>

      <p>
        Aucun débit n’est effectué automatiquement. La somme est seulement bloquée temporairement sur la carte du client.
      </p>

      <a href="/" style={{ color: "black" }}>
        Retour
      </a>
    </main>
  )
}
