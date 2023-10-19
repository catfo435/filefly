import UserMenu from "../components/UserMenu"

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="flex w-full h-full">
        <UserMenu />  
        {children}
      </div>
    )
  }