import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import { VoiceStatus } from '../../types';
import { Button } from './Button';

interface VoiceInputProps {
  onTextCapture: (text: string) => void;
  placeholder?: string;
  className?: string;
  initialText?: string;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({
  onTextCapture,
  placeholder = 'Click the microphone icon and start speaking...',
  className = '',
  initialText = '',
}) => {
  const { text, status, startListening, stopListening, clearText, isSupported } = useSpeechRecognition();
  const [inputText, setInputText] = useState(initialText);

  // Update local state when speech recognition captures text
  useEffect(() => {
    if (text) {
      setInputText(text);
    }
  }, [text]);

  // Update local state when initialText prop changes
  useEffect(() => {
    setInputText(initialText);
  }, [initialText]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleSubmit = () => {
    onTextCapture(inputText);
  };

  const handleClear = () => {
    setInputText('');
    clearText();
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <textarea
          value={inputText}
          onChange={handleTextChange}
          placeholder={placeholder}
          className="w-full min-h-[120px] p-3 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-y"
        />
        
        <div className="absolute right-2 top-2 flex space-x-2">
          {isSupported ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={status === VoiceStatus.Listening ? stopListening : startListening}
              aria-label={status === VoiceStatus.Listening ? "Stop recording" : "Start recording"}
              className={`rounded-full p-2 ${status === VoiceStatus.Listening ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {status === VoiceStatus.Listening ? (
                <MicOff size={18} />
              ) : status === VoiceStatus.Processing ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Mic size={18} />
              )}
            </Button>
          ) : (
            <span className="text-xs text-red-500 absolute right-2 top-2">
              Voice input not supported in your browser
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleClear}
          className="text-gray-600"
        >
          Clear
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={handleSubmit}
          disabled={!inputText.trim()}
        >
          Save
        </Button>
      </div>

      {status === VoiceStatus.Listening && (
        <div className="absolute -bottom-6 left-0 right-0 flex justify-center">
          <div className="text-xs bg-blue-600 text-white px-2 py-1 rounded animate-pulse">
            Listening... Speak now
          </div>
        </div>
      )}
    </div>
  );
};