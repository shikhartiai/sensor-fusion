import React from 'react';
import './App.css';
import FrameManager from './Frame/FrameManager';

const App = () => {
  const [index, setIndex] = React.useState<number>(0);
  let frameManager: FrameManager = FrameManager.getInstance();

  React.useEffect(() => {
    let curFrameIndex: number = frameManager.getCurrentFrameIndex();
    //to prevent two times rendering, apply additional check
    if(curFrameIndex === -1 || curFrameIndex !== index) {
      frameManager.changeFrame(index)
    }
  }, [index]);

  return (
    <div>
      <div style={{
        position: "fixed",
        top: "90%",
        left: "45%",
        zIndex: "10000"
      }}>
        <button style={{ backgroundColor: "white", color: "red" }} onClick={() => setIndex((index + 1) % 3)}>Previous</button>
        <button style={{ backgroundColor: "white", color: "red" }} onClick={() => setIndex((index - 1) < 0 ? 2 : index - 1)}>Next</button>
      </div>
    </div>
  )
}

export default App;
