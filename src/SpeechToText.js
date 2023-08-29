import { BsFillRecordFill, BsStopCircle } from 'react-icons/bs';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import useClipboard from 'react-use-clipboard';

function SpeechToText() {

  const [targetValues, setTargetValues] = useState([]);

  const [textToCopy, setTextToCopy] = useState()
  const [isCopied, setCopied] = useClipboard(textToCopy, { successDuration: 2000, })

  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' })
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition()

  const [counters, setCounters] = useState([]);

  useEffect(() => {
    // Update targetValues state with the data-target values
    const updatedValues = Array.from(document.querySelectorAll('span[data-target]')).map(element => parseInt(element.dataset.target, 10));
    setTargetValues(updatedValues);
  }, []);

  useEffect(() => {
    // Initialize counters with 0
    const initialCounters = targetValues.map(() => 0);
    setCounters(initialCounters);
  }, [targetValues]);

  useEffect(() => {
    if (targetValues.length === 0) return;

    const incrementInterval = 10; // Interval in milliseconds

    const interval = setInterval(() => {
      setCounters(prevCounters =>
        prevCounters.map((counter, index) => {
          const remainingDistance = targetValues[index] - counter;
          const incrementStep = Math.ceil(remainingDistance / incrementInterval);
          return counter + incrementStep;
        })
      );

      // Check if all counters have reached their target values
      if (counters.every((counter, index) => counter <= targetValues[index])) {
        clearInterval(interval); // Stop interval
      }
    }, incrementInterval);

    return () => {
      clearInterval(interval); // Cleanup on component unmount
    };
  }, [counters, targetValues]);

  if (!browserSupportsSpeechRecognition) {
    return null
  }

  return (

    <div>
      <div>
        <div>
          <h1>Speech to Text </h1>
          <h1></h1>
        </div>
        <div style={{ padding: 2, border: '1px solid', background: 'lightblue' }} onClick={() => setTextToCopy(transcript)}>
          {
            transcript
          }
        </div>
        <div>
          <Button style={{ width: 140 }} onClick={setCopied}>{isCopied ? 'Copied' : 'Copy to clipboard'}</Button>
          <Button icon={<BsFillRecordFill />} onClick={startListening} >Start Listening</Button>
          <Button icon={<BsStopCircle />} onClick={SpeechRecognition.stopListening} >Stop Listening</Button>

        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
          <div style={{ marginRight: 10, borderRight: '1px solid', paddingRight: 5 }}>
            <span style={{ fontSize: 25, fontWeight: 600, color: 'brown' }} className='data-count' data-target='8000'>{counters[0]} </span><h3>project </h3>
          </div>
          <div style={{ marginRight: 10, borderRight: '1px solid', paddingRight: 5 }}>
            <span style={{ fontSize: 25, fontWeight: 600, color: 'brown' }} className='data-count' data-target='20000'>{counters[1]} </span><h3>happy </h3>
          </div>
          <div>
            <span style={{ fontSize: 25, fontWeight: 600, color: 'brown' }} className='data-count' data-target='2000'>{counters[2]}</span><h3>onGoing </h3>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SpeechToText
