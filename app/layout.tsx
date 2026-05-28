export const metadata = {
  title: "La French Barca - Caution",
  description: "Empreintes bancaires pour caution bateau",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
