import React, { useState, useEffect } from 'react';
import config from './config.js';
import './App.css';

function App() {
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % config.messages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleHeartClick = (e) => {
        const newHeart = {
            id: Math.random(),
            x: e.clientX,
            y: e.clientY,
        };
        setHearts([...hearts, newHeart]);
        setTimeout(() => {
            setHearts((prevHearts) => prevHearts.filter((h) => h.id !== newHeart.id));
        }, 1000);
    };

    return (
        <div className="app" onClick={handleHeartClick}>
            <div className="container">
                <h1 className="title">Happy Valentine's Day</h1>
                <div className="subtitle">{config.sender} ❤️ {config.receiver}</div>
                <div className="message-container">
                    <p className="message">{config.messages[currentMessageIndex]}</p>
                </div>
                <div className="nickname-display">
                    Nickname: <span className="nickname">{config.nickname}</span>
                </div>
                <div className="dots">
                    {config.messages.map((_, index) => (
                        <span key={index} className={`dot ${index === currentMessageIndex ? 'active' : ''}`}></span>
                    ))}
                </div>
            </div>
            {hearts.map((heart) => (
                <div key={heart.id} className="floating-heart" style={{ left: heart.x, top: heart.y, }}>
                    ❤️
                </div>
            ))}
        </div>
    );
}

export default App;