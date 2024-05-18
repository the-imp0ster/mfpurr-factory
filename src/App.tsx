import './App.css'

function App() {

  const clickPurr = () => {
    console.log('mfpurrs just observe the chaos');
  }


  return (
    <>
      <h1 className='bg-purrBlue'>Vite + React</h1>
      <div className="card">
        <button className='bg-purrGreen opacity-80 border-8 rounded-xl border-purrOrange p-2 m-2 hover:opacity-100' onClick={clickPurr}>
          mfpurr
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
