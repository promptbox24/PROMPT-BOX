import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const PromptCard = ({ prompt }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="prompt-card dark-hover"
      style={{
        background: 'var(--bg-secondary)',
        border: '2px solid var(--border-subtle)',
        padding: '28px',
        borderRadius: '20px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        position: 'relative'
      }}
    >
      <div style={{ marginBottom: '18px' }}>
        <h3 className="heading-3" style={{ marginBottom: '10px', fontWeight: 700 }}>
          {prompt.title}
        </h3>
        <span className="body-small" style={{ 
          color: 'var(--brand-primary)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          fontSize: '13px',
          fontWeight: 600,
          background: 'var(--brand-hover)',
          padding: '4px 12px',
          borderRadius: '8px',
          display: 'inline-block'
        }}>
          {prompt.category}
        </span>
      </div>

      <p className="body-medium" style={{ 
        marginBottom: '22px',
        color: 'var(--text-secondary)',
        lineHeight: '1.6'
      }}>
        {prompt.description}
      </p>

      <div style={{
        background: 'rgba(138, 99, 255, 0.1)',
        padding: '18px',
        borderRadius: '16px',
        marginBottom: '22px',
        border: '2px solid var(--border-subtle)'
      }}>
        <p className="body-small" style={{ 
          color: 'var(--text-secondary)',
          fontFamily: 'monospace',
          lineHeight: '1.7',
          fontSize: '15px'
        }}>
          {prompt.prompt}
        </p>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '14px'
      }}>
        <div style={{ flex: 1 }}>
          <span className="body-small" style={{ 
            color: 'var(--text-muted)',
            fontSize: '14px'
          }}>
            💡 {prompt.example}
          </span>
        </div>
        
        <button 
          onClick={handleCopy}
          className="btn-primary"
          style={{ 
            minHeight: '44px',
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '16px'
          }}
        >
          {copied ? (
            <>
              <Check size={18} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={18} />
              Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PromptCard;
