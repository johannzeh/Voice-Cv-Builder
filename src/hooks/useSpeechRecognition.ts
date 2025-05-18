import { useState, useEffect, useCallback } from 'react';
import { VoiceStatus } from '../types';

interface SpeechRecognitionHook {
  text: string;
  status: VoiceStatus;
  startListening: () => void;
  stopListening: () => void;
  clearText: () => void;
  isSupported: boolean;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

export const useSpeechRecognition = (): SpeechRecognitionHook => {
  const [recognition, setRecognition] = useState<any>(null);
  const [text, setText] = useState<string>('');
  const [status, setStatus] = useState<VoiceStatus>(VoiceStatus.Inactive);
  const [isSupported, setIsSupported] = useState<boolean>(true);

  useEffect(() => {
    // Check if SpeechRecognition is supported
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = 'en-US';

    recognitionInstance.onstart = () => {
      setStatus(VoiceStatus.Listening);
    };

    recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
      let transcript = '';
      
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      
      setText(transcript);
    };

    recognitionInstance.onerror = (event: Event) => {
      console.error('Speech recognition error', event);
      setStatus(VoiceStatus.Inactive);
    };

    recognitionInstance.onend = () => {
      setStatus(VoiceStatus.Inactive);
    };

    setRecognition(recognitionInstance);

    return () => {
      if (recognitionInstance) {
        recognitionInstance.abort();
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (recognition && status !== VoiceStatus.Listening) {
      setText('');
      recognition.start();
    }
  }, [recognition, status]);

  const stopListening = useCallback(() => {
    if (recognition && status === VoiceStatus.Listening) {
      recognition.stop();
      setStatus(VoiceStatus.Processing);
      setTimeout(() => setStatus(VoiceStatus.Inactive), 500);
    }
  }, [recognition, status]);

  const clearText = useCallback(() => {
    setText('');
  }, []);

  return {
    text,
    status,
    startListening,
    stopListening,
    clearText,
    isSupported,
  };
};