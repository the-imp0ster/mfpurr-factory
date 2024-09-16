import { useState, useEffect, useRef } from 'react';
import './App.css';
import p5 from 'p5';

function App() {

  // state
  const [background, setBackground] = useState<string>("");
  const [fur, setFur] = useState<string>("");
  const [eyeColor, setEyeColor] = useState<string>("");
  const [eyewear, setEyewear] = useState<string>("");
  const [clothing, setClothing] = useState<string>("");
  const [mouth, setMouth] = useState<string>("");
  const [hat, setHat] = useState<string>("");
  const [piercing, setPiercing] = useState<string>("");
  const [copyButtonText, setCopyButtonText] = useState<string>("copy");
  const [canvasSize, setCanvasSize] = useState<number>(250);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 500);
  const [isNarrow, setIsNarrow] = useState<boolean>(window.innerWidth < 1000);

  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 500);
      setIsNarrow(window.innerWidth < 1000);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const sketch = (p: p5) => {
      let backgroundImg: p5.Image | null = null;
      let furImg: p5.Image | null = null;
      let eyeColorImg: p5.Image | null = null;
      let eyewearBelowImg: p5.Image | null = null;
      let eyewearAboveImg: p5.Image | null = null;
      let clothingImg: p5.Image | null = null;
      let mouthImg: p5.Image | null = null;
      let hatImg: p5.Image | null = null;
      let piercingImg: p5.Image | null = null;

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

        if (eyewear) {
          eyewearBelowImg = p.loadImage(`/trait-layers/eyewear/below/${eyewear}`);
          eyewearAboveImg = p.loadImage(`/trait-layers/eyewear/above/${eyewear}`);
        }

        if (clothing) {
          clothingImg = p.loadImage(`/trait-layers/clothing/${clothing}`);
        }

        if (mouth) {
          mouthImg = p.loadImage(`/trait-layers/mouth/${mouth}`);
        }

        if (hat) {
          hatImg = p.loadImage(`/trait-layers/hat/${hat}`);
        }

        if (piercing) {
          piercingImg = p.loadImage(`/trait-layers/piercing/${piercing}`);
        }

      };

      p.setup = () => {
        const canvas = p.createCanvas(canvasSize, canvasSize);
        canvas.parent('purrCanvas');
      };

      p.draw = () => {
        p.clear();

        if (backgroundImg) {
          p.image(backgroundImg, 0, 0, canvasSize, canvasSize);
        }

        if (furImg) {
          p.image(furImg, 0, 0, canvasSize, canvasSize);
        }

        if (eyeColorImg) {
          p.image(eyeColorImg, 0, 0, canvasSize, canvasSize);
        }

        if (eyewearBelowImg) {
          p.image(eyewearBelowImg, 0, 0, canvasSize, canvasSize);
        }

        if (clothingImg) {
          p.image(clothingImg, 0, 0, canvasSize, canvasSize);
        }

        if (eyewearAboveImg) {
          p.image(eyewearAboveImg, 0, 0, canvasSize, canvasSize);
        }

        if (mouthImg) {
          p.image(mouthImg, 0, 0, canvasSize, canvasSize);
        }

        if (hatImg) {
          p.image(hatImg, 0, 0, canvasSize, canvasSize);
        }

        if (piercingImg) {
          p.image(piercingImg, 0, 0, canvasSize, canvasSize);
        }

      };
    };

    const purrP5 = new p5(sketch, sketchRef.current!);

    return () => {
      purrP5.remove();
    };
  }, [background, fur, eyeColor, eyewear, clothing, mouth, hat, piercing, canvasSize]);

  const resetCanvas = () => {
    setBackground("");
    setFur("");
    setEyeColor("");
    setEyewear("");
    setClothing("");
    setMouth("");
    setHat("");
    setPiercing("");
  }

  const areAnyTraitsSelected = () => {
    return background || fur || eyeColor || eyewear || clothing || mouth || hat || piercing;
  };

  const saveImage = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'mfpurr.png';
      link.click();
    }
  };

  const copyImage = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.toBlob(blob => {
        if (blob) {
          const item = new ClipboardItem({ 'image/png': blob });
          navigator.clipboard.write([item]);
          setCopyButtonText("copied!");
          setTimeout(() => {
            setCopyButtonText("copy");
          }, 3000);
          canvas.classList.add('swell');
          setTimeout(() => {
            canvas.classList.remove('swell');
          }, 1000);
        }
      });
    }
  };

  return (
    <>
      <header className='flex flex-col sm:flex-row justify-evenly text-center items-center mb-2'>
        <a href="https://mfpurrs.com/"><img id="headerPurr" className="rounded-xl" src='purr.png' alt='a pixelated tabby cat wearing a hoodie, smoking a vape, and observing the chaos' /></a>

        <div id="headerText" className="flex flex-col align-center text-center justify-center">
          <h1 className="self-center text-3xl font-bold">mfpurr factory</h1>
          <h4 className="italic">build your own purr</h4>
        </div>
      </header>

      <hr className="border border-purrOrange w-3/4 self-center" />

      <main className="flex-grow">
        <div>

          <div id="traitSelection" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">

            {/* Size selection */}
            <div id="sizeSelect" className="py-2 flex flex-col">
              <label className="text-lg">size(pixels): </label>

              <div className="p-1 rounded-xl border-2 border-purrOrange bg-amber-100 cursor-pointer flex flex-row justify-evenly">

              <div>
                  <input type="radio" id="size250" name="size" value="250" checked={canvasSize === 250} onChange={e => setCanvasSize(parseInt(e.target.value))} />
                  <label htmlFor="size250">250</label>
                </div>

                <div>
                  <input type="radio" id="size500" name="size" value="500" checked={canvasSize === 500} onChange={e => setCanvasSize(parseInt(e.target.value))} disabled={isMobile} />
                  <label htmlFor="size500">500</label>
                </div>

                <div>
                  <input type="radio" id="size1000" name="size" value="1000" checked={canvasSize === 1000} onChange={e => setCanvasSize(parseInt(e.target.value))} disabled={isNarrow} />
                  <label htmlFor="size1000">1000</label>
                </div>

              </div>

            </div>


            {/* background selection */}
            <div id="backgroundSelect" className="py-2 flex flex-col">
              <label className="text-lg">background: </label>
              <select className="p-1 rounded-xl border-2 border-purrOrange bg-amber-100  cursor-pointer" onChange={e => setBackground(e.target.value)} value={background}>
                <option value="">none</option>
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
            <div id="furSelect" className="py-2 flex flex-col">
              <label className="text-lg">fur: </label>
              <select className="p-1 rounded-xl border-2 border-purrOrange bg-amber-100  cursor-pointer" onChange={e => setFur(e.target.value)} value={fur}>
                <option value="">none</option>
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
            <div id="eyeColorSelect" className="py-2 flex flex-col">
              <label className="text-lg">eye color: </label>
              <select className="p-1 rounded-xl border-2 border-purrOrange bg-amber-100  cursor-pointer" onChange={e => setEyeColor(e.target.value)} value={eyeColor}>
                <option value="">none</option>
                <option value="bloodshot.png">bloodshot</option>
                <option value="blue.png">blue</option>
                <option value="green.png">green</option>
                <option value="orange.png">orange</option>
                <option value="purple.png">purple</option>
                <option value="yellow.png">yellow</option>
              </select>
            </div>

            {/* clothing selection */}
            <div id="clothingSelect" className="py-2 flex flex-col">
              <label className="text-lg">clothing: </label>
              <select className="p-1 rounded-xl border-2 border-purrOrange bg-amber-100 cursor-pointer" onChange={e => setClothing(e.target.value)} value={clothing}>
                <option value="">none</option>
                <option value="black hoodie.png">black hoodie</option>
                <option value="blue tee.png">blue tee</option>
                <option value="blue tracksuit.png">blue tracksuit</option>
                <option value="bomber.png">bomber</option>
                <option value="fashion hoodie.png">fashion hoodie</option>
                <option value="gold chain.png">gold chain</option>
                <option value="hacker.png">hacker</option>
                <option value="hawaiian shirt.png">hawaiian shirt</option>
                <option value="office shirt.png">office shirt</option>
                <option value="red tee.png">red tee</option>
                <option value="red tracksuit.png">red tracksuit</option>
                <option value="space suit.png">space suit</option>

              </select>
            </div>

            {/* mouth selection */}
            <div id="mouthSelect" className="py-2 flex flex-col">
              <label className="text-lg">mouth: </label>
              <select className="p-1 rounded-xl border-2 border-purrOrange bg-amber-100  cursor-pointer" onChange={e => setMouth(e.target.value)} value={mouth}>
                <option value="">none</option>
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


            {/* eyewear selection */}
            <div id="eyewearSelect" className="py-2 flex flex-col">
              <label className="text-lg">eyewear: </label>
              <select className="p-1 rounded-xl border-2 border-purrOrange bg-amber-100  cursor-pointer" onChange={e => setEyewear(e.target.value)} value={eyewear}>
                <option value="">none</option>
                <option value="aviators.png">aviators</option>
                <option value="bitcoin maxi.png">bitcoin maxi</option>
                <option value="blue noggles.png">blue noggles</option>
                <option value="deal with it.png">deal with it</option>
                <option value="morpheus.png">morpheus</option>
                <option value="nerd.png">nerd</option>
                <option value="red noggles.png">red noggles</option>
                <option value="tired.png">tired</option>
                <option value="viper glasses.png">viper glasses</option>
              </select>
            </div>

            {/* hatselection */}
            <div id="hatSelect" className="py-2 flex flex-col">
              <label className="text-lg">hat: </label>
              <select className="p-1 rounded-xl border-2 border-purrOrange bg-amber-100 cursor-pointer" onChange={e => setHat(e.target.value)} value={hat}>
                <option value="">none</option>
                <option value="420 bucket hat.png">420 bucket hat</option>
                <option value="black beanie.png">black beanie</option>
                <option value="black headphones.png">black headphones</option>
                <option value="cowboy hat.png">cowboy hat</option>
                <option value="durag.png">durag</option>
                <option value="fedora.png">fedora</option>
                <option value="fitted cap.png">fitted cap</option>
                <option value="golden headphones.png">golden headphones</option>
                <option value="golf.png">golf</option>
                <option value="keffiyeh.png">keffiyeh</option>
                <option value="orange beanie.png">orange beanie</option>
                <option value="rainbow.png">rainbow</option>
                <option value="red bucket hat.png">red bucket hat</option>
                <option value="safari.png">safari</option>
                <option value="snapback.png">snapback</option>
                <option value="sports headband.png">sports headband</option>
                <option value="vr headset.png">vr headset</option>
                <option value="wizard hat.png">wizard hat</option>
                <option value="helmetred.png">red helmet</option>
                <option value="helmetblack.png">black helmet</option>
                <option value="helmetgreen.png">green helmet</option>
                <option value="helmetblue.png">blue helmet</option>
                <option value="helmetorange.png">orange helmet</option>
                <option value="helmetteal.png">teal helmet</option>
                <option value="helmetpurple.png">purple helmet</option>
              </select>
            </div>

            {/* piercing selection */}
            <div id="piercingSelect" className="py-2 flex flex-col">
              <label className="text-lg">piercing: </label>
              <select className="p-1 rounded-xl border-2 border-purrOrange bg-amber-100 cursor-pointer" onChange={e => setPiercing(e.target.value)} value={piercing}>
                <option value="">none</option>
                <option value="earring.png">earring</option>
              </select>
            </div>

          </div>

          <div className="py-8 flex items-center justify-center">
            <div id="purrCanvas" ref={sketchRef} className={areAnyTraitsSelected() ? 'shadow-lg' : ''}></div>
          </div>

          {areAnyTraitsSelected() && (
            <div className="flex flex-row justify-center mb-4 text-xs">
              <button className="px-2 py-1 mx-2 bg-amber-100 border-2 border-purrOrange rounded-lg hover:bg-purrGreen" onClick={saveImage}>save</button>
              <button className="px-2 py-1 mx-2 bg-amber-100 border-2 border-purrOrange rounded-lg hover:bg-purrGreen" onClick={copyImage}>{copyButtonText}</button>
              <button className="px-2 py-1 mx-2 bg-amber-100 border-2 border-purrOrange rounded-lg hover:bg-purrGreen" onClick={resetCanvas}>reset</button>
            </div>
          )}


        </div>
      </main>

      <hr className="border border-purrOrange w-3/4 self-center" />

      <footer className="flex flex-col text-center mt-2 flex-shrink-0">
        <h4 className="text-xs italic my-2">~ based on <a className="underline" href="https://mfpurrs.com">mfpurrs</a> ethscription collection by virtual alaska, ariana manavi, and max ~</h4>
        <h4>xoxo imp0ster 💚</h4>
        <div className="flex flex-col sm:flex-row items-center justify-center text-xs underline">
          <a className="m-2" href="https://warpcast.com/imp0ster">farcaster</a>
          <a className="m-2" href="https://x.com/the_imp0ster">x</a>
          <a className="m-2" href="https://github.com/the-imp0ster">github</a>
        </div>
      </footer>
    </>
  )
}

export default App
