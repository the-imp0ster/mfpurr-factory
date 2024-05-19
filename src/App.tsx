import { useState, useEffect, useRef } from 'react';
import './App.css';
import p5 from 'p5';

function App() {

  // state
  const [background, setBackground] = useState<string>("");
  const [fur, setFur] = useState<string>("");
  const [eyeColor, setEyeColor] = useState<string>("");
  const [mouth, setMouth] = useState<string>("");
  const [piercing, setPiercing] = useState<string>("");
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sketch = (p: p5) => {
      let backgroundImg: p5.Image;
      let furImg: p5.Image;
      let eyeColorImg: p5.Image;
      let mouthImg: p5.Image;
      let piercingImg: p5.Image;

      p.preload = () => {
        if (background) {
          backgroundImg = p.loadImage(`/trait-layers/background/${background}`);
        }

        if (fur) {
          furImg = p.loadImage(`/trait-layers/fur/${fur}`);
        }

        if (eyeColor) {
          eyeColorImg = p.loadImage(`/trait-layers/eye color/${eyeColor}`);
        }

        if (mouth) {
          mouthImg = p.loadImage(`/trait-layers/mouth/${mouth}`);
        }

        if (piercing) {
          piercingImg = p.loadImage(`/trait-layers/piercing/${piercing}`);
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

        if (eyeColorImg) {
          p.image(eyeColorImg, 0, 0, p.width, p.height);
        }

        if (mouthImg) {
          p.image(mouthImg, 0, 0, p.width, p.height);
        }

        if (piercingImg) {
          p.image(piercingImg, 0, 0, p.width, p.height);
        }

      };
    };

    const purrP5 = new p5(sketch, sketchRef.current!);

    return () => {
      purrP5.remove();
    };
  }, [background, fur, eyeColor, mouth, piercing]);



  // const clickPurr = () => {
  //   console.log('mfpurrs just observe the chaos');
  // }


  return (
    <>
      <header className='flex flex-row justify-center text-center border-2 border-purrPurple'>
        <img id="headerPurr" className="rounded-xl" src='purr.png' alt='a pixelated tabby cat wearing a hoodie, smoking a vape, and observing the chaos' />

        <h1>mfpurr factory</h1>
      </header>

      <main>
        <div>

          {/* <button className='bg-purrGreen opacity-80 border-8 rounded-xl border-purrOrange p-2 m-2 hover:opacity-100' onClick={clickPurr}>
          mfpurr
        </button> */}

          <div id="traitSelection" className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">

            {/* background selection */}
            <div id="backgroundSelect" className="py-2">
              <label>background:</label>
              <select className="p-2 rounded-xl border-2 border-purrOrange bg-purrGreen block" onChange={e => setBackground(e.target.value)} value={background}>
                <option className="bg-purrGreen" value="">none</option>
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
            </div>

            {/* fur selection */}
            <div id="furSelect" className="py-2">
              <label>fur:</label>
              <select className="p-2 rounded-xl border-2 border-purrOrange bg-purrGreen block" onChange={e => setFur(e.target.value)} value={fur}>
                <option className="bg-purrGreen" value="">none</option>
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

            {/* eye color selection */}
            <div id="eyeColorSelect" className="py-2">
              <label>eye color:</label>
              <select className="p-2 rounded-xl border-2 border-purrOrange bg-purrGreen block" onChange={e => setEyeColor(e.target.value)} value={eyeColor}>
                <option className="bg-purrGreen" value="">none</option>
                <option value="bloodshot.png">bloodshot</option>
                <option value="blue.png">blue</option>
                <option value="green.png">green</option>
                <option value="orange.png">orange</option>
                <option value="purple.png">purple</option>
                <option value="yellow.png">yellow</option>
              </select>
            </div>

            {/* mouth selection */}
            <div id="mouthSelect" className="py-2">
              <label>mouth:</label>
              <select className="p-2 rounded-xl border-2 border-purrOrange bg-purrGreen block" onChange={e => setMouth(e.target.value)} value={mouth}>
                <option className="bg-purrGreen" value="">none</option>
                <option value="bored.png">bored</option>
                <option value="bubble gum.png">bubble gum</option>
                <option value="cig.png">cig</option>
                <option value="mustache.png">mustache</option>
                <option value="nyan cat.png">nyan cat</option>
                <option value="smile.png">smile</option>
                <option value="vape.png">vape</option>
                <option value="yawn.png">yawn</option>
              </select>
            </div>

            {/* piercing selection */}
            <div id="piercingSelect" className="py-2">
              <label>piercing:</label>
              <select className="p-2 rounded-xl border-2 border-purrOrange bg-purrGreen block" onChange={e => setPiercing(e.target.value)} value={piercing}>
                <option className="bg-purrGreen" value="">none</option>
                <option value="earring.png">earring</option>
              </select>
            </div>

          </div>

          <div className="py-8" ref={sketchRef}>
            <div id="purrCanvas"></div>
          </div>

        </div>
      </main>
    </>
  )
}

export default App
