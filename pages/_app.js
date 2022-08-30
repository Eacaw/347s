import "../styles/globals.css";

import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  return (
    <>
      <UserContext.Provider value={userData}>
        <a id="page-top"></a>
        <Navbar />
        <Component {...pageProps} />
        <Toaster />
        <Footer />
      </UserContext.Provider>
    </>
  );
}

export default MyApp;
