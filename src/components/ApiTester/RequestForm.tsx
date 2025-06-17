import React from 'react';

interface RequestFormProps {
  method: string;
  url: string;
  onMethodChange: (method: string) => void;
  onUrlChange: (url: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

export const RequestForm: React.FC<RequestFormProps> = ({
  method,
  url,
  onMethodChange,
  onUrlChange,
  onSend,
  isLoading
}) => {
  return (
    <div style={{ 
      display: 'flex', 
      gap: '16px', 
      alignItems: 'center', 
      backgroundColor: 'white', 
      padding: '16px', 
      borderBottom: '1px solid #e5e7eb' 
    }}>
      <select
        value={method}
        onChange={(e) => onMethodChange(e.target.value)}
        disabled={isLoading}
        style={{
          width: '120px',
          padding: '10px 12px',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          backgroundColor: isLoading ? '#f9fafb' : 'white',
          fontSize: '14px',
          fontWeight: '500',
          outline: 'none',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          opacity: isLoading ? 0.6 : 1,
          color: isLoading ? '#6b7280' : '#111827'
        }}
      >
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="DELETE">DELETE</option>
        <option value="PATCH">PATCH</option>
        <option value="HEAD">HEAD</option>
        <option value="OPTIONS">OPTIONS</option>
      </select>
      
      <input
        type="text"
        placeholder="Enter request URL (e.g., https://jsonplaceholder.typicode.com/posts)"
        value={url}
        onChange={(e) => onUrlChange(e.target.value)}
        disabled={isLoading}
        style={{
          flex: 1,
          padding: '10px 12px',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          fontSize: '14px',
          outline: 'none',
          backgroundColor: isLoading ? '#f9fafb' : 'white',
          opacity: isLoading ? 0.6 : 1,
          color: isLoading ? '#6b7280' : '#111827',
          cursor: isLoading ? 'not-allowed' : 'text'
        }}
        onFocus={(e) => {
          if (!isLoading) {
            e.target.style.borderColor = '#10b981';
            e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
          }
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#d1d5db';
          e.target.style.boxShadow = 'none';
        }}
      />
      
      <button
        onClick={onSend}
        disabled={isLoading}
        style={{
          padding: '10px 24px',
          backgroundColor: isLoading ? '#94a3b8' : '#10b981',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          minWidth: '100px',
          justifyContent: 'center',
          transition: 'all 0.2s ease',
          transform: isLoading ? 'none' : 'scale(1)',
          boxShadow: isLoading ? 'none' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}
        onMouseOver={(e) => {
          if (!isLoading) {
            e.currentTarget.style.backgroundColor = '#059669';
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.boxShadow = '0 4px 12px 0 rgba(16, 185, 129, 0.3)';
          }
        }}
        onMouseOut={(e) => {
          if (!isLoading) {
            e.currentTarget.style.backgroundColor = '#10b981';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
          }
        }}
      >
        {isLoading ? (
          <>
            <div 
              style={{
                width: '16px',
                height: '16px',
                border: '2px solid #ffffff',
                borderTop: '2px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}
            />
            Sending...
          </>
        ) : (
          'Send'
        )}
      </button>
      
      {/* CSS for spinner animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};