import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Volume2 } from 'lucide-react';
import { useVoiceSynthesis } from '../hooks/useVoiceSynthesis';
import { BoothMap } from '../../services/maps/BoothMap';

export type MessageProps = {
  message: string;
  isUser: boolean;
  type?: 'text' | 'rule' | 'error' | 'map';
  meta?: any;
};

export function MessageBubble({ message, isUser, type = 'text', meta }: MessageProps) {
  const { speak } = useVoiceSynthesis();

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`relative max-w-[85%] rounded-2xl px-5 py-4 ${
          isUser 
            ? 'bg-blue-600 text-white rounded-br-none' 
            : type === 'error'
              ? 'bg-red-50 text-red-900 border border-red-200 rounded-bl-none shadow-sm'
              : 'bg-white text-slate-800 rounded-bl-none shadow-sm border border-slate-200'
        }`}
        role="article"
        aria-label={isUser ? 'User message' : 'Assistant guidance'}
        tabIndex={0}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{message}</p>
        ) : (
          <div className="flex flex-col gap-1">
            <div className="markdown-body text-sm sm:text-base leading-relaxed">
              <Markdown remarkPlugins={[remarkGfm]}>{message}</Markdown>
            </div>
            
            {type === 'map' && meta?.pinCode && (
              <BoothMap pinCode={meta.pinCode} />
            )}

            <button 
              onClick={() => speak(message)} 
              className="self-end mt-2 p-2 text-slate-400 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full transition-colors flex items-center justify-center bg-slate-50 border border-slate-100"
              aria-label="Read message aloud"
              title="Read aloud"
            >
              <Volume2 size={16} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
