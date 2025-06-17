import React from 'react';

interface BodySectionProps {
  body: string;
  onChange: (body: string) => void;
  jsonError?: string;
}

export const BodySection: React.FC<BodySectionProps> = ({ body, onChange, jsonError }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Request Body (JSON)
        </label>
        <textarea
          value={body}
          onChange={(e) => onChange(e.target.value)}
          placeholder='{"key": "value"}'
          rows={10}
          className={`w-full px-3 py-2 border rounded-md shadow-sm font-mono text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
            jsonError ? 'border-red-300' : 'border-gray-300'
          }`}
        />
      </div>

      {jsonError && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <div className="text-sm text-red-600">
            <strong>Invalid JSON:</strong> {jsonError}
          </div>
        </div>
      )}
    </div>
  );
};