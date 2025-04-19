import Navbar from "./Navbar";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <div>
      <Navbar />
      <section className="mt-25">{children}</section>
    </div>
  );
};

export default Layout;
