export default function CardsLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="align-center sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-200">
            {children}
        </div>
    )
}