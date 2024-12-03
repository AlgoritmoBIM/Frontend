import Title from "./components/Title";
import Header from "./components/Header";
import Dashboard  from "./components/Dashboard";
import FooterTop from "./components/FooterTop";
import FooterBotton from "./components/FooterBotton";
import Viewer from "./components/Viewer";


function App() {
  return (
    <dir className='flex flex-col h-screen max-w-screen-2x1 mx-auto px-4'>
      <Header />
      <FooterTop />
      <main className="flex w-full bg-red-200 h-full">
      <Title />
      <Viewer />
      <Dashboard />
      </main>
      <FooterBotton />
    </dir>
  );
}

export default App;
