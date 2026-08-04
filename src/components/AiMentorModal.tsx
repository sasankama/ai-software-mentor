import React, { useState, useEffect } from 'react';
import { useProgress } from '../context/ProgressContext';
import {
  Bot,
  X,
  Send,
  Sparkles,
  User,
  Lightbulb,
  Code2
} from 'lucide-react';

interface AiMentorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

interface Message {
  sender: 'user' | 'mentor';
  text: string;
}

export const AiMentorModal: React.FC<AiMentorModalProps> = ({
  isOpen,
  onClose,
  initialQuery
}) => {
  const { currentDailyContent, progress } = useProgress();
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'mentor',
      text: `Hello! I am your Senior Software Engineer Mentor (15+ YOE). I'm here to teach you like a university professor. Ask me any question about Day ${progress.currentDay} (${currentDailyContent?.lesson.topic || 'Software Engineering'}) or request code hints!`
    }
  ]);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);

  useEffect(() => {
    if (initialQuery && isOpen) {
      handleSend(initialQuery);
    }
  }, [initialQuery, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (queryToSend?: string) => {
    const text = (queryToSend || inputQuery).trim();
    if (!text || isSending) return;

    setMessages((prev) => [...prev, { sender: 'user', text }]);
    if (!queryToSend) setInputQuery('');
    setIsSending(true);

    try {
      const response = await fetch('/api/ask-mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: text,
          topicContext: currentDailyContent?.lesson.topic || 'Software Engineering',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [...prev, { sender: 'mentor', text: data.answer }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'mentor',
            text: 'I had trouble processing that request. Remember: focus on core principles and test your assumptions step-by-step!'
          }
        ]);
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'mentor',
          text: 'I am offline momentarily, but keep practicing: break complex tasks down into simple functions!'
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col h-[600px] max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 bg-zinc-950 text-white flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">Senior SE Mentor (15+ YOE)</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-600/30 text-blue-300 font-mono font-semibold border border-blue-500/30">
                  AI Online
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Pedagogical Professor Style • Beginner-Friendly
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-zinc-950/60">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 text-xs sm:text-sm leading-relaxed ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender === 'mentor' && (
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[80%] p-3.5 rounded-2xl ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none shadow-xs font-medium'
                    : 'bg-zinc-900 text-zinc-200 rounded-bl-none border border-zinc-800 shadow-xs'
                }`}
              >
                {m.text}
              </div>

              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-zinc-800 text-white flex items-center justify-center shrink-0 mt-0.5 border border-zinc-700">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isSending && (
            <div className="flex gap-3 items-center text-xs text-zinc-400 italic">
              <Bot className="w-4 h-4 text-blue-400 animate-spin" />
              <span>Senior Mentor is thinking...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 bg-zinc-900 border-t border-zinc-800 flex gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => handleSend("Can you explain today's topic using an everyday analogy?")}
            className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-zinc-950 text-zinc-300 border border-zinc-800 whitespace-nowrap hover:bg-zinc-800 transition"
          >
            💡 Give an analogy
          </button>
          <button
            onClick={() => handleSend("What are the most common bugs beginners encounter with this concept?")}
            className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-zinc-950 text-zinc-300 border border-zinc-800 whitespace-nowrap hover:bg-zinc-800 transition"
          >
            ⚠️ Common bugs
          </button>
          <button
            onClick={() => handleSend("How is this tested during SWE internship technical interviews?")}
            className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-zinc-950 text-zinc-300 border border-zinc-800 whitespace-nowrap hover:bg-zinc-800 transition"
          >
            🎓 Interview tip
          </button>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-zinc-900 border-t border-zinc-800 flex items-center gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask your Senior Mentor a question..."
            className="flex-1 p-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={() => handleSend()}
            disabled={!inputQuery.trim() || isSending}
            className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
