import { lazy, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { PageTitleProvider } from './context/PageTitleContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <PageTitleProvider>
        <div className="app">
          <Navbar />
          <main>
            {/* Routes and Suspense will be added in the next phase */}
          </main>
          <Footer />
        </div>
      </PageTitleProvider>
    </Router>
  );
}

export default App;
