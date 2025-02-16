import GridContainer from "@/components/defaults/GridContainer";
import MaxWidthWrapper from "@/components/defaults/MaxWidthWrapper";
import Navbar from "@/components/nav/Navbar";
import Sidebar from "@/components/nav/Sidebar";
import { WhishListProvider } from "@/contexts/whichlistContext";
import QueryProvider from "@/lib/ReactQuery";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    
  return (
    <main 
    className="background grid min-h-screen max-w-[100vw] overflow-x-hidden pb-[50vh]"
    >
      <QueryProvider>
        <WhishListProvider>
       <ToastContainer 
        position="top-center"
        theme="dark"
        hideProgressBar={false}
        autoClose={2500}
        closeOnClick
        pauseOnHover
        
       />
        <GridContainer cols={12}>
        <div className="col-span-2 h-screen overflow-visible">
            <Sidebar />
        </div>
        <div className="col-span-10 max-w-[90%] mx-auto">
          
          <Navbar />
          {children}

        </div>
        </GridContainer>
        </WhishListProvider>
        </QueryProvider>
    </main>
  );
}
