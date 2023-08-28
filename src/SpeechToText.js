import { BsFillRecordFill, BsStopCircle } from 'react-icons/bs';
import { Button } from 'antd';
import React, { useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import useClipboard from 'react-use-clipboard';

function SpeechToText() {

    const [textToCopy, setTextToCopy] = useState()
    const [isCopied, setCopied] = useClipboard(textToCopy,{successDuration:2000,})

    const startListening = () => SpeechRecognition.startListening({continuous:true, language:'en-IN'})
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition()

    if(!browserSupportsSpeechRecognition){
        return null
    }

  return (

    <div>
        <div>
        <div>
            <h1>Speech to Text </h1>
            <h1></h1>
            </div>
            <div style={{padding:2,border:'1px solid' ,background:'lightblue'}} onClick={()=>setTextToCopy(transcript)}>
                {
                    transcript
                }
            </div>
            <div>
                <Button style={{width:140}} onClick={setCopied}>{isCopied ? 'Copied' : 'Copy to clipboard' }</Button>
                <Button icon={<BsFillRecordFill />} onClick={startListening} >Start Listening</Button>
                <Button icon={<BsStopCircle />} onClick={SpeechRecognition.stopListening} >Stop Listening</Button>

            </div>
        </div>
    </div>
  )
}

export default SpeechToText