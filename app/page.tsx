export default function Home() {
  return (
    <main
      style={{
        maxWidth: 500,
        margin: "50px auto",
        fontFamily: "Arial",
        padding: 20,
      }}
    >
      <h1>La French Barca</h1>

      <p>Créer une caution bateau Stripe</p>

      <form>
        <input
          type="text"
          placeholder="Nom du client"
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 10,
          }}
        />

        <input
          type="email"
          placeholder="Email"
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 10,
          }}
        />

        <input
          type="number"
          placeholder="Montant caution (€)"
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 10,
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 14,
            background: "black",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Générer le lien de caution
        </button>
      </form>
    </main>
  )
}
