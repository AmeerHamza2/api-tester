import React, { useState } from 'react';
import { RequestForm } from './RequestForm';
import { ParamsSection } from './ParamsSection';
import { HeadersSection } from './HeadersSection';
import { BodySection } from './BodySection';
import { ResponseSection } from './ResponseSection';
import { Tabs } from '../ui/Tabs';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { validateKeyValuePairs, validateJson } from '../utils/validation'; 
import type { ApiRequest, ApiResponse, ResponseTabType, TabType } from './types'; 
import { makeHttpRequest } from '../utils/httpClient';

const initialRequest: ApiRequest = {
  method: 'GET',
  url: 'https://jsonplaceholder.typicode.com/posts/1',
  params: [],
  headers: [],
  body: ''
};

const tabs = [
  { id: 'params', label: 'Params' },
  { id: 'auth', label: 'Auth' },
  { id: 'headers', label: 'Headers' },
  { id: 'body', label: 'Body' }
];

export const ApiTester: React.FC = () => {
  const [request, setRequest] = useLocalStorage<ApiRequest>('api-request', initialRequest);
  const [activeTab, setActiveTab] = useState<TabType>('params');
  const [activeResponseTab, setActiveResponseTab] = useState<ResponseTabType>('body');
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [savedRequests, setSavedRequests] = useLocalStorage<ApiRequest[]>('saved-requests', []);

  const updateRequest = (updates: Partial<ApiRequest>) => {
    setRequest({ ...request, ...updates });
  };


  const handleSend = async () => {
    setResponse(null);
    setError(null);

    const paramsErrors = validateKeyValuePairs(request.params);
    const headersErrors = validateKeyValuePairs(request.headers);
    const { isValid: isJsonValid, error: jsonError } = validateJson(request.body);

    if (!request.url.trim()) {
      setError('URL is required');
      return;
    }

    if (paramsErrors.length > 0) {
      setError(`Parameter validation errors: ${paramsErrors.join(', ')}`);
      setActiveTab('params');
      return;
    }

    if (headersErrors.length > 0) {
      setError(`Header validation errors: ${headersErrors.join(', ')}`);
      setActiveTab('headers');
      return;
    }

    if (!isJsonValid && jsonError) {
      setError(`JSON validation error: ${jsonError}`);
      setActiveTab('body');
      return;
    }

    const requestToSave = {
      ...request,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    setSavedRequests([requestToSave, ...savedRequests.slice(0, 9)]);

    setIsLoading(true);
    try {
      const apiResponse = await makeHttpRequest(request);
      setResponse(apiResponse);
      setActiveResponseTab('body'); 
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const paramsErrors = validateKeyValuePairs(request.params);
  const headersErrors = validateKeyValuePairs(request.headers);
  const { error: jsonError } = validateJson(request.body);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'params':
        return (
          <ParamsSection
            params={request.params}
            onChange={(params) => updateRequest({ params })}
            errors={paramsErrors}
          />
        );
      case 'headers':
        return (
          <HeadersSection
            headers={request.headers}
            onChange={(headers) => updateRequest({ headers })}
            errors={headersErrors}
          />
        );
      case 'body':
        return (
          <BodySection
            body={request.body}
            onChange={(body) => updateRequest({ body })}
            jsonError={jsonError}
          />
        );
      case 'auth':
        return (
          <div className="text-center py-8 text-gray-500">
            <p>Authentication section coming soon...</p>
            <p className="text-sm mt-2">Use the Headers tab to add authorization headers for now.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Request Section */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <RequestForm
          method={request.method}
          url={request.url}
          onMethodChange={(method) => updateRequest({ method })}
          onUrlChange={(url) => updateRequest({ url })}
          onSend={handleSend}
          isLoading={isLoading}
        />
        
        <div className="p-6">
          <Tabs
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab as TabType)}
            tabs={tabs}
          />
          
          <div className="mt-6">
            {renderTabContent()}
          </div>
        </div>
      </div>

      <ResponseSection
        response={response}
        error={error}
        activeTab={activeResponseTab}
        onTabChange={setActiveResponseTab}
      />
    </div>
  );
};