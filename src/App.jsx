import Hero from "./components/Hero";
import About from "./components/About";
import Me from "./components/Me";
import Project from "./components/Project";
import Journey from "./components/Journey";
import Like from "./components/Like";
import Footer from "./components/Footer";
import "./App.css";

function App() {
    return (
        <div className="App">
            <Hero />
            <About />
            <Me />
            <Project />
            <Journey />
            <Like />
            <Footer />
        </div>
    );
}

export default App;