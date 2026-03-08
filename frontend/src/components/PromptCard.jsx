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
        border: '1px solid var(--border-subtle)',
        padding: '24px',
        borderRadius: '0px',
        transition: 'all 0.4s ease-in-out',
        cursor: 'pointer',
        position: 'relative'
      }}
    >
      <div style={{ marginBottom: '16px' }}>
        <h3 className="heading-3" style={{ marginBottom: '8px' }}>
          {prompt.title}
        </h3>
        <span className="body-small" style={{ 
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          fontSize: '14px'
        }}>
          {prompt.category}
        </span>
      </div>

      <p className="body-medium" style={{ 
        marginBottom: '20px',
        color: 'var(--text-secondary)'
      }}>
        {prompt.description}
      </p>

      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        padding: '16px',
        borderRadius: '0px',
        marginBottom: '20px',
        border: '1px solid var(--border-subtle)'
      }}>
        <p className="body-small" style={{ 
          color: 'var(--text-secondary)',
          fontFamily: 'monospace',
          lineHeight: '1.6'
        }}>
          {prompt.prompt}
        </p>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{ flex: 1 }}>
          <span className="body-small" style={{ color: 'var(--text-muted)' }}>
            Example: {prompt.example}
          </span>
        </div>
        
        <button 
          onClick={handleCopy}
          className="btn-primary"
          style={{ 
            minHeight: '40px',
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {copied ? (
            <>
              <Check size={16} />
              Copied
            </>
          ) : (
            <>
              <Copy size={16} />
              Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PromptCard;
