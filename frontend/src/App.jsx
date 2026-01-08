import Header from './components/Header';
import ProductShowcase from './components/ProductShowcase';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="lumina-app">
      <Header />
      <main>
        <ProductShowcase />
      </main>
      <Footer />
    </div>
  );
}

export default App;