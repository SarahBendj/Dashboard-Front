import Menu from './items.tsx/menu'


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-between h-screen max-w-full">
      <div className="min-h-content w-1/6">
        <Menu />
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

