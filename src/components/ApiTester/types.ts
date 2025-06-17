export interface KeyValuePair {
  id: string;
  key: string;
  value: string;
}

export interface ApiRequest {
  method: string;
  url: string;
  params: KeyValuePair[];
  headers: KeyValuePair[];
  body: string;
}

export interface ApiResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: any;
  duration: number;
  size: number;
  // Additional fields for debugging and display
  requestUrl?: string;
  requestMethod?: string;
  requestParams?: Record<string, string>;
  requestHeaders?: Record<string, string>;
}

export type TabType = 'params' | 'auth' | 'headers' | 'body';
export type ResponseTabType = 'body' | 'headers' | 'cookies';