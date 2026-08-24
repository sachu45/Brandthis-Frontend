import { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChatIcon, ChevronLeftIcon, CloseIcon, DotsIcon, LinkIcon } from './icons';

/**
 * Support widget that sits above every view. Messages arrive once, shortly
 * after the panel is first opened, to mimic an agent picking up the chat.
 */
export function ChatWidget() {
  const { chatOpen, toggleChat, activeProfile } = useApp();
  const [greeted, setGreeted] = useState(false);
  const greetedRef = useRef(false);

  useEffect(() => {
    if (!chatOpen || greetedRef.current) return;
    greetedRef.current = true;
    const timer = window.setTimeout(() => setGreeted(true), 500);
    return () => window.clearTimeout(timer);
  }, [chatOpen]);

  const firstName = activeProfile.memberName ?? activeProfile.name.split(/['\s]/)[0];

  return (
    <>
      <button className="chat-bubble" onClick={toggleChat} aria-label="Support">
        <ChatIcon />
      </button>

      <div className={'chat-panel' + (chatOpen ? ' open' : '')}>
        <div className="chat-header">
          <button
            onClick={toggleChat}
            aria-label="Collapse chat"
            style={{
              color: 'var(--gray-400)',
              background: 'none',
              border: 'none',
              display: 'flex',
            }}
          >
            <ChevronLeftIcon className="icon-sm" />
          </button>
          <div className="chat-avatar serif">B</div>
          <div>
            <div className="ttl">Brandthis Support Agent</div>
            <div className="sub">The team can also help</div>
          </div>
          <div className="chat-header-actions">
            <button aria-label="More options">
              <DotsIcon className="icon-sm" />
            </button>
            <button onClick={toggleChat} aria-label="Close chat">
              <CloseIcon className="icon-sm" />
            </button>
          </div>
        </div>

        <div className="chat-messages">
          {greeted && (
            <>
              <div>
                <div className="chat-msg">
                  Hi {firstName}! You are speaking with the Bloom Support Agent. I am
                  ready to assist you.
                </div>
              </div>
              <div>
                <div className="chat-msg">How can I help?</div>
                <div className="chat-meta">Bloom Support Agent · Just now</div>
              </div>
            </>
          )}
        </div>

        <div className="chat-input-wrap">
          <div className="box">
            <input type="text" placeholder="Ask a question..." />
            <LinkIcon className="icon-sm" style={{ color: 'var(--gray-400)' }} />
          </div>
          <div className="chat-powered">Powered by Fin</div>
        </div>
      </div>
    </>
  );
}
