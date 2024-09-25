export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={`min-h-screen flex items-center justify-center w-full`}>{children}</div>;
}