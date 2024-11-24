import NavigationSideBar from "@/components/NavigationSideBar";
// import "@/app/globals.css";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <div className="hidden sidebar md:flex h-full w-[72px] flex-col fixed inset-y-0">
        <NavigationSideBar />
      </div>
      <div className="md:pl-[72px] h-full main">{children}</div>
    </div>
  );
}
