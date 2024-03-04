import { useRef, useState } from 'react'
import './App.css'

function App() {
  const videoElem = useRef<HTMLVideoElement>(null);
  const mediaStream = useRef<MediaStream | null>(null);

  const [isStreaming, setStreaming] = useState(false);

  const startSteam = async () => {
    if (navigator.mediaDevices) {
      mediaStream.current = await navigator.mediaDevices.getUserMedia({ video: true });
      
      if (videoElem.current) {
        videoElem.current.srcObject = mediaStream.current;
        videoElem.current.play();
      }
      setStreaming(true);
    }
  };

  const endStream = () => {
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => track.stop());
      setStreaming(false);
    }
    if (videoElem.current) {
      videoElem.current.pause();
    }
  };

  return (
    <>
      <video id="videoSource" ref={videoElem} style={isStreaming ? {"display" : "block"} : {"display" : "none"}} controls={false} width="500px" height="500px" autoPlay />
      <button disabled={isStreaming} onClick={startSteam}>Start Stream</button>
      <button disabled={!isStreaming} onClick={endStream}>Stop Stream</button>
    </>
  )
}

export default App
