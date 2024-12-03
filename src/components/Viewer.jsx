import '../index.css';
import { useEffect } from 'react';
import { initViewer } from '../../lib/aps.js';



const Viewer = () => {

  useEffect(() => {
    initViewer ()
  }, [])

  return (
    <div className="bg-yellow-400 w-full relative">
      <div id="myViewer"></div>
    
    
    </div>
  )
}

export default Viewer