import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> {/* Aquí se renderizarán las páginas anidadas */}
      </main>
    </>
  );
};

export default Layout;