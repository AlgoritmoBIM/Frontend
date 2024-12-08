import '../index.css';
import { useEffect, useState } from 'react';
import { initMultiViewer, initViewer, initdualViewer } from '../../lib/aps.js';



const Viewer = () => {

  const  [modelIndex, setModelIndex] = useState(0);
  
  const urns =  [
    {
      urn:
      "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YXNkYXNrZGphc25kbGdmc2ZzZGdzYXNkbGFzZGthc2Rtdm9tdHIvcmFjYmFzaWNzYW1wbGVwcm9qZWN0LnJ2dA",
      globalOffset: { x: 0, y: 0, z: 0 },
    },
    {
      urn:
      "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YXNkYXNrZGphc25kbGdmc2ZzZGdzYXNkbGFzZGthc2Rtdm9tdHIvcmFjYWR2YW5jZWRzYW1wbGVwcm9qZWN0LnJ2dA",
      globalOffset: { x: 0, y: 0, z: 0 },
    },
    
  ]

  useEffect(() => {
    initViewer (urns[modelIndex].urn);
    //initMultiViewer (urns)
    initdualViewer (urns[0].urn);



  }, [modelIndex]);

  const handleClick = () => {
    if(modelIndex == 0){
      setModelIndex(1);
    } else{
      setModelIndex(0);
    }
  };

  return (
    <div className="bg-yellow-400 w-full relative flex flex-col">
      <div className='relative w-full h-full'>
        {/*<<button className= "bg-color-4 absolute z-[5] px-2 py-1 text-white font-medium rounded-sm top-6 left-6 hover:contrast-75" onClick={handleClick}>
        cambiar modelo ({modelIndex})
        </button>*/}
      <div id="myViewer"></div>
      </div>
      {/*<div className='relative h-1/2'>
      <div id="twoViewer"></div>
      </div>*/}
    </div>
  );
}

export default Viewer