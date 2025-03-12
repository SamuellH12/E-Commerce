export default function PaymentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 ">
      {children}
    </div>
  );
}
