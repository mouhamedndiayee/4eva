import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-950 via-purple-950 to-indigo-950">
      <Header />
      <main className="pt-12">
        {children}
      </main>
    </div>
  );
};
