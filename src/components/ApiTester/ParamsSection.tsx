// ParamSection.tsx
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
    <div className="p-5 bg-white">
      {/* Header Row */}
      <div className="grid grid-cols-[1fr_1fr_auto_auto] gap-3 items-center mb-4 pb-2 border-b border-gray-200">
        <span className="text-sm font-semibold text-gray-700">
          Key
        </span>
        <span className="text-sm font-semibold text-gray-700">
          Value
        </span>
        <span className="text-sm font-semibold text-gray-700">
          Actions
        </span>
        <button
          onClick={addParam}
          className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm font-medium cursor-pointer flex items-center gap-1.5 text-gray-700 transition-all duration-200 hover:bg-gray-100"
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      {/* Parameters Grid */}
      <div className="flex flex-col gap-2">
        {params.map((param) => (
          <div 
            key={param.id} 
            className="grid grid-cols-[1fr_1fr_auto_auto] gap-3 items-center"
          >
            <input
              type="text"
              placeholder="Key"
              value={param.key}
              onChange={(e) => updateParam(param.id, 'key', e.target.value)}
              className="px-3 py-2.5 border border-gray-300 rounded-md text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10"
            />
            <input
              type="text"
              placeholder="Value"
              value={param.value}
              onChange={(e) => updateParam(param.id, 'value', e.target.value)}
              className="px-3 py-2.5 border border-gray-300 rounded-md text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10"
            />
            <span className="text-sm text-gray-500 w-15 text-center">
              {/* Actions column spacer */}
            </span>
            <button
              onClick={() => removeParam(param.id)}
              className="w-9 h-9 bg-red-50 border border-red-200 rounded-md text-red-600 cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-red-100"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {params.length === 0 && (
        <div className="text-center py-10 px-5 text-gray-500">
          <div className="mb-3 text-base">
            No parameters added yet.
          </div>
          <button
            onClick={addParam}
            className="px-5 py-2.5 bg-blue-500 text-white border-none rounded-md text-sm font-medium cursor-pointer transition-colors duration-200 hover:bg-blue-600"
          >
            Add your first parameter
          </button>
        </div>
      )}

      {/* Validation Errors */}
      {params.length > 0 && errors.length > 0 && (
        <div className="mt-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg border-l-4 border-l-red-600">
          <div className="text-sm text-red-600">
            <div className="font-semibold mb-1">
              Validation Errors:
            </div>
            <ul className="m-0 pl-5 list-disc">
              {errors.map((error, index) => (
                <li key={index} className="mb-0.5">
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