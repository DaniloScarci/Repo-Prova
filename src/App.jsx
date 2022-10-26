import { useState, useEffect } from "react";
import "./App.css";

/* Ogni componente è una funzione, in particolare meglio utilizzare la sintassi ES6 delle arrow functions */

/* Ogni parametro passato (solitamente si destrutturano per comodità) del tipo se passiamo
  un parametro chiamato idValue all'interno della funziona quando passiamo gli argomenti 
  utilizzeremo una sintassi del tipo const componenteProva = ({idValue}) => {...}
 */

/* Ogni componente in React utilizza la sintassi JSX Javascript + XHTML ossia una sintassi mista
che può fare qualsiasi cosa il JS possa fare, .map , .filter, ecc. ecc.   */

/* Per poter utilizzare la sintassi di JS e fare l'escape dell'HTML basta racchiudere all'interno del componente
tutto all'interno delle { . . . } */

/* Essendo funzioni, anche se in JS teoricamente le funzioni hanno un contesto come le classi (è possibile
  utilizzare il this) utilizziamo gli hooks, che "agganciano" le funzionalità classiche dei class-based
  components rendendole disponibili per i function-based components */

/* Di base ogni componente vive un suo "ciclo di vita", dalla nascita alla morte
  Questo ciclo di vita si esplica all'interno dei class-based component come una serie di metodi
  che si overridano a partire dalla classe React.Component che ogni class-based component può decidere di implementare
  oppure no, i metodi in questione sono: 

    - componentDidMount() => Montaggio del componente sul Virtual DOM (React come tutti i framework JS lavora con una rappresentazione astratta del DOM)
    - componentDidUpdate() => Aggiornamento del componente 
    - componentWillUnmount() => Rimozione del componente

  Ne troverai una decina di lifecycle events, ma ti GARANTISCO che questi sono gli unici che utilizzerai mai
*/


/* 
  Dato che una funzione non può overridare nulla nei function-based component si utilizzano gli hooks (che sono delle funzioni a loro volta)
  per poter mimare queste cose
*/

/* Gli hooks più importanti sono due: 
    - useState => Crea un contesto per il componente
    - useEffect => Gestisce un evento per un componente
*/

/* 
  useState ritorna un array di due elementi [statoCorrente, funzioneModifica] 
  
  Lo stato corrente rappresenta il particolare valore all'interno del componente
  funzioneModifica è l'UNICA FUNZIONE che possa modificare quel particolare stato

  A useState passiamo come parametro lo stato iniziale (può essere valore semplice, array, oggetto ecc. ecc.)

  es:

    const [counter,setCounter] = useState(0)

    Abbiamo uno stato chiamato "counter" il cui valore iniziale è 0
    
    Per poterlo modificare chiamiamo setCounter() passandogli il nuovo valore, o
    equivalentemente, se vogliamo sfruttare il vecchio valore, lo passiamo come parametro
    a setCounter, es: setCounter(oldCounter => oldCounter+1)

*/

/* 
  useEffect è l'hooks che permette di mimare i lifecycle-events in base al secondo parametro che gli passiamo 
  che non è altro che un array di watch, ciò significa che JS "guarderà" la modifica di un qualsiasi valore
  all'interno di questo array per rilanciare il comportamento,es: 

    useEffect(,[]) => Nessun parametro, verrà eseguito solo una volta, al mount
    useEffect(,[counter]) => Guarderà la modifica di counter e ad ogni sua modifica rieseguerà tutto
  
    Il primo parametro di useEffect è una callback

    Questa callback specifica la logica del metodo

    useEffect(() => console.log("Ciao!"),[]) => Verrà eseguito al mount e farà il log di ciao


    useEffect inoltre può fare un return, questo return serve per poter rimuovere qualsiasi eventListener
    creato (principalmente timer e timeout), es:

    useEffect(() => {
      const timeout setTimeout(() => console.log("Ciao!"),1000);
      return () => document.removeTimeout(timeout)
    },[])
*/

/* Modificate questa repo come volete,divertitevi e per qualsiasi cosa scrivetemi */

const App = () => {
  const [testoInserito, setTestoInserito] = useState();
  const [insertedElement, setInsertedElement] = useState([]);

  const insertElementHandler = () => {
    setInsertedElement((oldValues) => [...oldValues, testoInserito]);
  };

  const deleteElementHandler = (id) => {
    setInsertedElement((oldValues) =>
      oldValues.filter((_, index) => index !== id)
    );
  };

  useEffect(() => {
    console.log(insertedElement);
  }, [insertedElement]);

  return (
    <div className="App">
      <div>
        <input
          onChange={(e) => setTestoInserito(e.target.value)}
          type="text"
          name="textInput"
          id="textInput"
          placeholder="Inserisci testo..."
        />
        <button onClick={() => insertElementHandler()} type="submit">
          Inserisci
        </button>
      </div>
      <div
        style={{
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {insertedElement
          ? insertedElement.map((data, index) => {
              return (
                <div
                  style={{
                    margin: "0 auto",
                    marginTop: "20px",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <div key={index}>
                    {index} - {data}
                  </div>
                  <button onClick={() => deleteElementHandler(index)}>
                    Elimina
                  </button>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default App;
