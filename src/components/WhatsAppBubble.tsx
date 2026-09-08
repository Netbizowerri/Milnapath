import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Copy, 
  Check, 
  ExternalLink, 
  RotateCcw, 
  ChevronRight,
  ShieldCheck,
  Zap,
  PhoneCall
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/compensationData';
import { getBotAnswer, QUICK_PROMPTS, BINARY_PAIRING_EXPLANATION, BotResponse } from '../data/botKnowledgeBase';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  actionButton?: {
    label: string;
    path: string;
  };
  copyData?: {
    label: string;
    text: string;
  };
  relatedSuggestions?: string[];
}

interface WhatsAppBubbleProps {
  currentProduct?: string;
  navigate?: (path: string) => void;
}

export const WhatsAppBubble: React.FC<WhatsAppBubbleProps> = ({ currentProduct, navigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const initialGreeting: Message = {
    id: 'welcome-msg',
    sender: 'bot',
    text: `### 🌿 Welcome to Milnapath VIP Support!

I am your **AI Knowledge Assistant**, trained on the complete Milnapath International platform—including our **12 NAFDAC-certified herbal formulations**, the **12 Ways to Earn compensation plan**, **GT Bank registration guidelines**, and **direct mentorship support**.

How may I assist you today? Click any prompt below or type your question:`,
    timestamp: 'Just now',
    relatedSuggestions: [
      'Explain the 14% binary pairing bonus',
      'How do I register with ₦10,000 (GT Bank)?',
      'What are the 12 Ways to Earn in Milnapath?',
      'Which product is best for ulcer & acid reflux?'
    ]
  };

  const [messages, setMessages] = useState<Message[]>([initialGreeting]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Auto-focus input on desktop
      if (window.innerWidth > 640) {
        setTimeout(() => inputRef.current?.focus(), 150);
      }
    }
  }, [isOpen, messages, isTyping]);

  // Handle immediate answers for prompt clicks or typed queries
  const handleQuery = (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Provide answers immediately (with tiny natural feel of 180ms)
    setTimeout(() => {
      const response: BotResponse = getBotAnswer(queryText);

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionButton: response.actionButton,
        copyData: response.copyData,
        relatedSuggestions: response.relatedSuggestions
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 200);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const handleActionClick = (path: string) => {
    if (navigate) {
      navigate(path);
    } else {
      window.location.href = path;
    }
  };

  const handleResetChat = () => {
    setMessages([initialGreeting]);
    setInputValue('');
  };

  // Render markdown-like text nicely
  const formatBotText = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('### ')) {
        return (
          <h4 key={idx} className="font-serif font-bold text-sm sm:text-base text-emerald-950 mt-1.5 mb-1 text-left flex items-center gap-1.5">
            {trimmed.replace('### ', '')}
          </h4>
        );
      }

      if (trimmed.startsWith('#### ')) {
        return (
          <h5 key={idx} className="font-semibold text-xs text-emerald-900 mt-2 mb-0.5 text-left">
            {trimmed.replace('#### ', '')}
          </h5>
        );
      }

      if (trimmed === '---') {
        return <hr key={idx} className="my-2 border-stone-200" />;
      }

      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        const rawBullet = trimmed.substring(2);
        return (
          <div key={idx} className="flex items-start gap-1.5 text-xs text-stone-700 my-0.5 leading-relaxed pl-1">
            <span className="text-emerald-600 font-bold">•</span>
            <span>{parseInlineBold(rawBullet)}</span>
          </div>
        );
      }

      if (/^\d+\.\s/.test(trimmed)) {
        return (
          <div key={idx} className="flex items-start gap-1.5 text-xs text-stone-700 my-0.5 leading-relaxed pl-1">
            <span className="text-emerald-700 font-semibold text-[11px]">{trimmed.match(/^\d+\./)?.[0]}</span>
            <span>{parseInlineBold(trimmed.replace(/^\d+\.\s*/, ''))}</span>
          </div>
        );
      }

      if (!trimmed) {
        return <div key={idx} className="h-1" />;
      }

      return (
        <p key={idx} className="text-xs text-stone-700 leading-relaxed my-0.5">
          {parseInlineBold(trimmed)}
        </p>
      );
    });
  };

  // Helper for **bold** inline rendering
  const parseInlineBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-stone-900">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-3 sm:right-6 z-50 flex flex-col items-end">
      {/* Smart Support Chat Window */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-1.5rem)] max-w-[390px] sm:max-w-[420px] bg-white rounded-3xl shadow-2xl border border-emerald-200/80 overflow-hidden flex flex-col h-[520px] sm:h-[580px] animate-in fade-in slide-in-from-bottom-6 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-900 via-emerald-950 to-emerald-900 p-3.5 sm:p-4 text-white flex items-center justify-between shadow-md relative">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-amber-500 p-0.5 shadow-md flex items-center justify-center">
                  <div className="w-full h-full bg-emerald-950 rounded-[14px] flex items-center justify-center">
                    <Bot className="w-5 h-5 text-amber-300" />
                  </div>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-emerald-950 rounded-full"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm sm:text-base text-white font-serif">
                    Milnapath VIP Assistant
                  </h4>
                  <span className="text-[9px] uppercase font-extrabold bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-400/30">
                    Smart AI
                  </span>
                </div>
                <p className="text-[10px] text-emerald-200/90 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Online • Instant on-site answers
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Restart conversation"
                className="p-1.5 text-emerald-300 hover:text-white rounded-lg hover:bg-emerald-800/60 transition-colors"
                aria-label="Restart conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-emerald-300 hover:text-white rounded-lg hover:bg-emerald-800/60 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3.5 bg-stone-50/80">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div className={`max-w-[85%] sm:max-w-[82%] space-y-2`}>
                  <div
                    className={`p-3.5 rounded-2xl shadow-xs text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-emerald-800 text-white rounded-tr-none ml-auto'
                        : 'bg-white text-stone-800 border border-stone-200/90 rounded-tl-none'
                    }`}
                  >
                    {msg.sender === 'bot' ? formatBotText(msg.text) : msg.text}

                    {/* Copy Data Card (e.g., GT Bank Account) */}
                    {msg.copyData && (
                      <div className="mt-2.5 p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-emerald-800 font-bold block uppercase tracking-wider">
                            {msg.copyData.label}
                          </span>
                          <span className="text-sm font-mono font-extrabold text-emerald-950">
                            {msg.copyData.text}
                          </span>
                        </div>
                        <button
                          onClick={() => handleCopy(msg.copyData!.text)}
                          className="px-2.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors shadow-xs"
                        >
                          {copiedText === msg.copyData.text ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-200" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {/* Action Button inside response */}
                    {msg.actionButton && (
                      <div className="mt-3 pt-2 border-t border-stone-100">
                        <button
                          onClick={() => handleActionClick(msg.actionButton!.path)}
                          className="w-full py-2 px-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99]"
                        >
                          <span>{msg.actionButton.label}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Suggestion Chips underneath Bot reply */}
                  {msg.relatedSuggestions && msg.relatedSuggestions.length > 0 && (
                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                        Quick Questions:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.relatedSuggestions.map((sugg, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={() => handleQuery(sugg)}
                            className="text-[11px] bg-white hover:bg-emerald-50 text-emerald-900 border border-stone-200/90 hover:border-emerald-300 py-1 px-2.5 rounded-lg font-medium transition-colors text-left flex items-center gap-1 shadow-2xs"
                          >
                            <Zap className="w-2.5 h-2.5 text-amber-500 shrink-0" />
                            <span>{sugg}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <span className={`text-[9px] text-stone-400 block px-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-xl bg-amber-500 text-emerald-950 font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center shrink-0 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white border border-stone-200/90 py-2.5 px-4 rounded-2xl rounded-tl-none shadow-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  <span className="text-[11px] text-stone-400 ml-1 font-medium">Formulating instant answer...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar (Always Available Carousel) */}
          <div className="px-3 py-2 bg-stone-100/90 border-t border-stone-200 overflow-x-auto scrollbar-none flex gap-1.5 items-center">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5 text-amber-500" />
              Ask:
            </span>
            {QUICK_PROMPTS.slice(0, 4).map((prompt, pIdx) => (
              <button
                key={pIdx}
                onClick={() => handleQuery(prompt)}
                className="shrink-0 text-[11px] bg-white hover:bg-emerald-50 text-emerald-950 hover:text-emerald-800 border border-stone-200 px-2.5 py-1 rounded-full font-medium transition-colors shadow-2xs hover:border-emerald-300"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input & Escalation Footer */}
          <div className="p-3 bg-white border-t border-stone-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleQuery(inputValue);
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about bonuses, GT Bank, products..."
                className="flex-1 text-xs py-2.5 px-3.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-stone-800"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="p-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white rounded-xl shadow-xs transition-colors focus:outline-none"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Optional Human Escalation Link (Does not block instant on-site answers) */}
            <div className="mt-2 flex items-center justify-between text-[10px] text-stone-500 px-1">
              <span>Instant AI answers on site</span>
              <a
                href={`https://wa.me/${COMPANY_DETAILS.whatsappRaw}?text=${encodeURIComponent('Hello Milnapath Mentor, I would like personal concierge assistance with my registration.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:text-emerald-900 font-semibold inline-flex items-center gap-1 hover:underline"
              >
                <PhoneCall className="w-2.5 h-2.5" />
                <span>Talk with Admin on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center gap-2.5 bg-gradient-to-r from-emerald-700 via-emerald-800 to-emerald-900 hover:from-emerald-600 hover:to-emerald-800 text-white font-bold p-3 sm:px-4 sm:py-3 rounded-full shadow-2xl shadow-emerald-950/40 border-2 border-amber-400/40 transition-all hover:scale-105 active:scale-95"
        aria-label="Open VIP Smart Support"
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
          </span>
        </div>
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-bold tracking-wide text-white leading-tight">
            VIP Support
          </span>
          <span className="text-[10px] text-emerald-200 font-normal">
            Instant on-site answers
          </span>
        </div>
      </button>
    </div>
  );
};
