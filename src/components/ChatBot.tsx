'use client'

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useChat, type Message } from '@ai-sdk/react';
import { Bot, X, Send, Loader2 } from 'lucide-react';

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Vercel AI SDK 5.0+ requires manual input management
    const [inputValue, setInputValue] = useState('');

    // Destructuring based on your specific console.log output
    const { messages, sendMessage, status } = useChat();

    // Derive loading state from status
    const isLoading = status === 'submitted' || status === 'streaming';

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Set mounted to true to handle Portal hydration correctly
    useEffect(() => {
        setMounted(true);
    }, []);

    // Auto-scroll logic
    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen]);

    const handleChatSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const currentInput = inputValue;
        setInputValue(''); // Clear input for better UX

        try {
            await sendMessage({ content: currentInput });
        } catch (err) {
            console.error("Failed to send message:", err);
        }
    };

    return (
        <>
            {/* 1. The Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors shadow-sm"
            >
                <Bot size={18} />
                Ask AI
            </button>

            {/* 2. The Modal (Teleported to Body) */}
            {isOpen && mounted && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">

                    <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col h-[600px] max-h-[90vh] animate-in fade-in zoom-in-95">

                        {/* Header */}
                        <div className="bg-slate-900 px-4 py-3 flex items-center justify-between rounded-t-2xl">
                            <div className="flex items-center gap-2 text-white">
                                <Bot size={20} />
                                <span className="font-bold text-sm">Friday AI Commander</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                            {messages.length === 0 && (
                                <div className="text-center text-slate-400 text-sm mt-10">
                                    How can I assist with your active incidents today?
                                </div>
                            )}

                            {messages.map((m: Message) => (
                                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                                        m.role === 'user'
                                            ? 'bg-slate-900 text-white rounded-tr-sm shadow-md'
                                            : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm'
                                    }`}>
                                        {m.content ? (
                                            <span className="whitespace-pre-wrap">{m.content}</span>
                                        ) : (
                                            m.parts?.map((part: any, i: number) => (
                                                part.type === 'text' ? (
                                                    <span key={i} className="whitespace-pre-wrap">{part.text}</span>
                                                ) : null
                                            ))
                                        )}
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-2 shadow-sm">
                                        <Loader2 size={16} className="animate-spin text-slate-400" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-white border-t border-slate-100 rounded-b-2xl">
                            <form onSubmit={handleChatSubmit} className="flex gap-2">
                                <input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Ask about an incident..."
                                    className="flex-1 rounded-xl bg-slate-50 border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !inputValue.trim()}
                                    className="bg-slate-900 text-white rounded-xl p-2.5 hover:bg-slate-800 disabled:opacity-50 transition-colors"
                                >
                                    <Send size={18} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}