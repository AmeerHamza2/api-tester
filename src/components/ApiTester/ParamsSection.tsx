import React from 'react';
import { Plus, X } from 'lucide-react';
import type { KeyValuePair } from './types';

interface ParamsSectionProps {
  params: KeyValuePair[];
  onChange: (params: KeyValuePair[]) => void;
  errors: string[];
}

export const ParamsSection: React.FC<ParamsSectionProps> = ({ params, onChange, errors }) => {
  const addParam = () => {
    onChange([...params, { id: Date.now().toString(), key: '', value: '' }]);
  };

  const removeParam = (id: string) => {
    onChange(params.filter(param => param.id !== id));
  };

  const updateParam = (id: string, field: 'key' | 'value', value: string) => {
    onChange(params.map(param => 
      param.id === id ? { ...param, [field]: value } : param
    ));
  };

  return (
    <div style={{ padding: '20px', backgroundColor: 'white' }}>
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr 1fr auto auto',
        gap: '12px',
        alignItems: 'center',
        marginBottom: '16px',
        paddingBottom: '8px',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <span style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          color: '#374151'
        }}>
          Key
        </span>
        <span style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          color: '#374151'
        }}>
          Value
        </span>
        <span style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          color: '#374151'
        }}>
          Actions
        </span>
        <button
          onClick={addParam}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f9fafb',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: '#374151',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#f9fafb';
          }}
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      {/* Parameters Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {params.map((param) => (
          <div 
            key={param.id} 
            style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 1fr auto auto',
              gap: '12px',
              alignItems: 'center'
            }}
          >
            <input
              type="text"
              placeholder="Key"
              value={param.key}
              onChange={(e) => updateParam(param.id, 'key', e.target.value)}
              style={{
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
            <input
              type="text"
              placeholder="Value"
              value={param.value}
              onChange={(e) => updateParam(param.id, 'value', e.target.value)}
              style={{
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
            <span style={{ 
              fontSize: '14px', 
              color: '#6b7280',
              width: '60px',
              textAlign: 'center'
            }}>
              {/* Actions column spacer */}
            </span>
            <button
              onClick={() => removeParam(param.id)}
              style={{
                width: '36px',
                height: '36px',
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '6px',
                color: '#dc2626',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#fee2e2';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#fef2f2';
              }}
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {params.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px 20px',
          color: '#6b7280'
        }}>
          <div style={{ marginBottom: '12px', fontSize: '16px' }}>
            No parameters added yet.
          </div>
          <button
            onClick={addParam}
            style={{
              padding: '10px 20px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#2563eb';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#3b82f6';
            }}
          >
            Add your first parameter
          </button>
        </div>
      )}

      {/* Validation Errors */}
      {errors.length > 0 && (
        <div style={{
          marginTop: '16px',
          padding: '12px 16px',
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          borderLeft: '4px solid #dc2626'
        }}>
          <div style={{ fontSize: '14px', color: '#dc2626' }}>
            <div style={{ fontWeight: '600', marginBottom: '4px' }}>
              Validation Errors:
            </div>
            <ul style={{ 
              margin: '0', 
              paddingLeft: '20px',
              listStyle: 'disc'
            }}>
              {errors.map((error, index) => (
                <li key={index} style={{ marginBottom: '2px' }}>
                  {error}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};