import { useState } from 'react'
import App1 from "./BevasarloLista";
import App2 from "./MemoriaJatek";

function App() {
  const [menu, setMenu] = useState("app1");
  return (
    <div>
      <nav>
        <button onClick={() => setMenu("app1")} class="btn btn-sm btn-primary m-1">Bevásárló lista</button> 
        <button onClick={() => setMenu("app2")} class="btn btn-sm btn-primary m-1">Memóriajáték</button>
      </nav>
      <hr />
      {menu === "app1" && <App1 />}
      {menu === "app2" && <App2 />}
    </div>
  );
}
export default App
