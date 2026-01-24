import { useState, useRef, useEffect } from 'react';
import aiService from '../utils/aiService';
import { IoSend, IoClose, IoChatbubbleEllipses } from 'react-icons/io5';
import './ChatBot.css';

const STORAGE_KEY = 'marxist_chat_history';
const MAX_STORED_MESSAGES = 50;

function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    
    // Load chat history from localStorage or use default
    const getInitialMessages = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed.map(msg => ({
                        ...msg,
                        timestamp: new Date(msg.timestamp)
                    }));
                }
            }
        } catch (error) {
            console.error('Failed to load chat history:', error);
        }
        
        return [{
            role: 'ai',
            text: 'Xin chào! Tôi là trợ lý AI về triết học Mác-Lênin. Bạn có câu hỏi gì không? 😊',
            timestamp: new Date()
        }];
    };

    const [messages, setMessages] = useState(getInitialMessages);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const isUnmountedRef = useRef(false);

    // Auto scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Save chat history to localStorage whenever messages change
    useEffect(() => {
        try {
            // Keep only last MAX_STORED_MESSAGES to avoid localStorage limit
            const messagesToStore = messages.slice(-MAX_STORED_MESSAGES);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(messagesToStore));
        } catch (error) {
            console.error('Failed to save chat history:', error);
        }
    }, [messages]);

    // Auto scroll on message change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            isUnmountedRef.current = true;
        };
    }, []);

    const handleSendMessage = async () => {
        if (!inputText.trim() || isTyping) return;

        const userMessage = inputText.trim();
        
        // Validate message length
        if (userMessage.length > 2000) {
            setMessages(prev => [...prev, {
                role: 'ai',
                text: '⚠️ Tin nhắn quá dài! Vui lòng giới hạn trong 2000 ký tự.',
                timestamp: new Date()
            }]);
            return;
        }

        setInputText('');

        // Add user message
        setMessages(prev => [...prev, {
            role: 'user',
            text: userMessage,
            timestamp: new Date()
        }]);

        // Show typing indicator
        setIsTyping(true);

        try {
            // Get AI response with abort controller for cleanup
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

            const response = await aiService.sendMessage(userMessage);
            clearTimeout(timeoutId);

            // Check if component is still mounted
            if (isUnmountedRef.current) return;

            if (response.success) {
                setMessages(prev => [...prev, {
                    role: 'ai',
                    text: response.message,
                    timestamp: new Date()
                }]);
            } else {
                setMessages(prev => [...prev, {
                    role: 'ai',
                    text: response.message || 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.',
                    timestamp: new Date()
                }]);
            }
        } catch (error) {
            // Check if component is still mounted
            if (isUnmountedRef.current) return;
            
            console.error('ChatBot Error:', error);
            setMessages(prev => [...prev, {
                role: 'ai',
                text: '❌ Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.',
                timestamp: new Date()
            }]);
        } finally {
            // Always reset typing state if still mounted
            if (!isUnmountedRef.current) {
                setIsTyping(false);
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <>
            {/* Floating Chat Button */}
            {!isOpen && (
                <button className="chat-fab" onClick={() => setIsOpen(true)} title="Hỏi AI">
                    <IoChatbubbleEllipses />
                    <span className="chat-pulse"></span>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="chat-window">
                    {/* Header */}
                    <div className="chat-header">
                        <div className="chat-avatar">🤖</div>
                        <div className="chat-info">
                            <h4>AI Triết Học</h4>
                            <p>Trợ lý Mác-Lênin</p>
                        </div>
                        <button className="chat-close" onClick={() => setIsOpen(false)}>
                            <IoClose />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.role}`}>
                                <div className="message-bubble">
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="message ai">
                                <div className="message-bubble typing">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="chat-input-container">
                        <textarea
                            className="chat-input"
                            placeholder="Nhập câu hỏi của bạn..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            rows="1"
                            disabled={isTyping}
                        />
                        <button
                            className="chat-send-btn"
                            onClick={handleSendMessage}
                            disabled={!inputText.trim() || isTyping}
                        >
                            <IoSend />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default ChatBot;
