import Menu from './items.tsx/menu'


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-between items-start h-screen w-screen">
      <div className="min-h-content w-1/6">
        <Menu />
      </div>
      <div className="p-4 w-5/6 max-h-screen">
        {children}
      </div>
    </div>
  );
}

