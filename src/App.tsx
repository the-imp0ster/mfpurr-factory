import { useState, useEffect, useRef } from 'react';
import './App.css';
import p5 from 'p5';

function App() {

  // state
  const [background, setBackground] = useState<string>();
  const [fur, setFur] = useState<string>();
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sketch = (p: p5) => {
      let backgroundImg: p5.Image;
      let furImg: p5.Image;

      p.preload = () => {
        if (background) {
          backgroundImg = p.loadImage(`/trait-layers/background/${background}`);
        }

        if (fur) {
          console.log(`loading fur: /trait-layers/fur/${fur}`);
          furImg = p.loadImage(`/trait-layers/fur/${fur}`);
        }
      };

      p.setup = () => {
        const canvas = p.createCanvas(300, 300);
        canvas.parent('purrCanvas');
      };

      p.draw = () => {
        p.clear();
        if (backgroundImg) {
          p.image(backgroundImg, 0, 0, p.width, p.height);
        }
        if (furImg) {
          p.image(furImg, 0, 0, p.width, p.height);
        }
      };
    };

    const purrP5 = new p5(sketch, sketchRef.current!);

    return () => {
      purrP5.remove();
    };
  }, [background, fur]);



  const clickPurr = () => {
    console.log('mfpurrs just observe the chaos');
  }


  return (
    <>
      <header className='flex flex-row justify-center text-center border-2 border-purrPurple'>
        <img id="headerPurr" className="rounded-xl" src='purr.png' alt='a pixelated cat wearing a hoodie, smoking a vape, and observing the chaos' />

        <h1>mfpurr factory</h1>
      </header>

    <main>
      <div>

        <button className='bg-purrGreen opacity-80 border-8 rounded-xl border-purrOrange p-2 m-2 hover:opacity-100' onClick={clickPurr}>
          mfpurr
        </button>

        <div id="traitSelection">

          {/* background selection */}
          <label>background:</label>
          <select className="p-2 rounded-xl mx-2 border-2 border-purrOrange bg-purrGreen block" onChange={e => setBackground(e.target.value)} value={background}>
            <option className="bg-purrGreen" value="">select a background</option>
            <option value="blue.png">blue</option>
            <option value="green.png">green</option>
            <option value="matrix.png">matrix</option>
            <option value="orange.png">orange</option>
            <option value="purple.png">purple</option>
            <option value="red.png">red</option>
            <option value="space.png">space</option>
            <option value="this is fine.png">this is fine</option>
            <option value="windows.png">windows</option>
            <option value="yellow.png">yellow</option>
          </select>

          <label>fur:</label>
          <select className="p-2 rounded-xl mx-2 border-2 border-purrOrange bg-purrGreen block" onChange={e => setFur(e.target.value)} value={fur}>
            <option className="bg-purrGreen" value="">select fur color</option>
            <option value="black.png">black</option>
            <option value="cheshire.png">cheshire</option>
            <option value="cool blue.png">cool blue</option>
            <option value="cream.png">cream</option>
            <option value="gold.png">gold</option>
            <option value="orange tabby.png">orange tabby</option>
            <option value="siamese.png">siamese</option>
            <option value="white.png">white</option>
          </select>
          
        </div>

        <div ref={sketchRef}>
          <div id="purrCanvas"></div>
        </div>

      </div>
    </main>
    </>
  )
}

export default App
