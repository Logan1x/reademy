import "./styles.css";
import Nav from "./components/nav"
import BookSearch from "./components/searchBook"

export default function App() {
  return (
    <div className="App">
    <Nav/>
      <main>

      <BookSearch/>
      
      </main>
    </div>
  );
}
