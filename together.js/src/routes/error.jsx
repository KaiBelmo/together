import Header from "../components/header";
import Footer from "../components/footer";

function Error() { 
  return (
    <>
      <section className="flex flex-col h-screen justify-between">

      <Header />
      <h1 className="text-center">
       404 - Page Not Found
      </h1>
      <Footer />
      </section>
    </>
  )
}

export default Error;
