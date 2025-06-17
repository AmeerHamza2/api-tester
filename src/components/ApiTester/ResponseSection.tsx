import React from 'react';
import { Tabs } from '../ui/Tabs';
import type { ApiResponse, ResponseTabType } from './types';


interface ResponseSectionProps {
  response: ApiResponse | null;
  error: string | null;
  activeTab: ResponseTabType;
  onTabChange: (tab: ResponseTabType) => void;
}

const responseTabs = [
  { id: 'body', label: 'Body' },
  { id: 'headers', label: 'Headers' },
  { id: 'cookies', label: 'Cookies' }
];

export const ResponseSection: React.FC<ResponseSectionProps> = ({
  response,
  error,
  activeTab,
  onTabChange
}) => {
  if (error) {
    return (
      <div style={{
        backgroundColor: '#fef2f2',
        border: '1px solid #fecaca',
        borderRadius: '8px',
        padding: '24px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <div style={{
            width: '12px',
            height: '12px',
            backgroundColor: '#dc2626',
            borderRadius: '50%',
            marginRight: '12px'
          }}></div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#dc2626',
            margin: 0
          }}>
            Request Failed
          </h3>
        </div>
        <div style={{
          backgroundColor: '#fee2e2',
          borderRadius: '6px',
          padding: '16px'
        }}>
          <pre style={{
            fontSize: '14px',
            color: '#7f1d1d',
            whiteSpace: 'pre-wrap',
            margin: 0,
            fontFamily: 'Monaco, Consolas, "Lucida Console", monospace'
          }}>
            {error}
          </pre>
        </div>
      </div>
    );
  }

  if (!response) {
    return (
      <div style={{
        backgroundColor: '#f9fafb',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '48px 24px',
        textAlign: 'center'
      }}>
        <div style={{
          color: '#9ca3af',
          marginBottom: '16px'
        }}>
          <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ margin: '0 auto' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <p style={{
          color: '#6b7280',
          fontSize: '18px',
          margin: 0
        }}>
          Send a request to see the response
        </p>
      </div>
    );
  }

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return '#10b981';
    if (status >= 300 && status < 400) return '#f59e0b';
    if (status >= 400 && status < 500) return '#f97316';
    return '#ef4444';
  };

  const formatJson = (data: any) => {
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return String(data);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'body':
        return (
          <div style={{ padding: '16px' }}>
            <div style={{
              backgroundColor: '#f8fafc',
              borderRadius: '6px',
              padding: '16px',
              border: '1px solid #e2e8f0'
            }}>
              <pre style={{
                fontSize: '14px',
                color: '#334155',
                whiteSpace: 'pre-wrap',
                overflow: 'auto',
                maxHeight: '400px',
                margin: 0,
                fontFamily: 'Monaco, Consolas, "Lucida Console", monospace',
                lineHeight: '1.5'
              }}>
                {formatJson(response.data)}
              </pre>
            </div>
          </div>
        );
      case 'headers':
        return (
          <div style={{ padding: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {Object.entries(response.headers).map(([key, value]) => (
                <div key={key} style={{
                  display: 'flex',
                  borderBottom: '1px solid #f1f5f9',
                  paddingBottom: '8px'
                }}>
                  <span style={{
                    fontWeight: '500',
                    color: '#475569',
                    width: '200px',
                    flexShrink: 0
                  }}>
                    {key}:
                  </span>
                  <span style={{
                    color: '#64748b',
                    wordBreak: 'break-all',
                    fontFamily: 'Monaco, Consolas, "Lucida Console", monospace',
                    fontSize: '13px'
                  }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'cookies':
        return (
          <div style={{
            padding: '32px',
            textAlign: 'center',
            color: '#6b7280'
          }}>
            <p>No cookies to display</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
    }}>
      {/* Response Header with Request Info */}
      <div style={{
        borderBottom: '1px solid #e5e7eb',
        padding: '16px'
      }}>
        {/* Status Line */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: '12px',
                height: '12px',
                backgroundColor: getStatusColor(response.status),
                borderRadius: '50%',
                marginRight: '8px'
              }}></div>
              <span style={{
                fontWeight: '600',
                color: '#111827',
                fontSize: '16px'
              }}>
                {response.status} {response.statusText}
              </span>
            </div>
            <div style={{
              fontSize: '14px',
              color: '#6b7280'
            }}>
              Time: {response.duration}ms
            </div>
            <div style={{
              fontSize: '14px',
              color: '#6b7280'
            }}>
              Size: {formatBytes(response.size)}
            </div>
          </div>
        </div>

        {/* Request URL with Parameters */}
        {response.requestUrl && (
          <div style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            padding: '12px'
          }}>
            <div style={{
              fontSize: '12px',
              color: '#64748b',
              marginBottom: '4px',
              fontWeight: '500'
            }}>
              Request URL:
            </div>
            <div style={{
              fontSize: '14px',
              color: '#1e293b',
              fontFamily: 'Monaco, Consolas, "Lucida Console", monospace',
              wordBreak: 'break-all'
            }}>
              {response.requestMethod} {response.requestUrl}
            </div>
          </div>
        )}
      </div>

      {/* Response Tabs */}
      <div style={{ padding: '16px 16px 0 16px' }}>
        <Tabs
          activeTab={activeTab}
          onTabChange={(tab) => onTabChange(tab as ResponseTabType)}
          tabs={responseTabs}
        />
      </div>
      
      {/* Response Content */}
      <div>
        {renderTabContent()}
      </div>
    </div>
  );
};