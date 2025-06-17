import axios, { AxiosError, type AxiosResponse } from "axios";
import type { ApiRequest, ApiResponse, KeyValuePair } from "../ApiTester/types";

const convertKeyValuePairsToObject = (pairs: KeyValuePair[]): Record<string, string> => {
  const result: Record<string, string> = {};
  pairs.forEach(pair => {
    if (pair.key.trim() && pair.value.trim()) {
      result[pair.key.trim()] = pair.value.trim();
    }
  });
  return result;
};

const buildUrlWithParams = (baseUrl: string, params: Record<string, string>): string => {
  if (Object.keys(params).length === 0) {
    return baseUrl;
  }
  
  const url = new URL(baseUrl);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  
  return url.toString();
};

export const makeHttpRequest = async (request: ApiRequest): Promise<ApiResponse> => {
  const startTime = Date.now();
  
  try {
    // Convert key-value pairs to objects
    const params = convertKeyValuePairsToObject(request.params);
    const headers = convertKeyValuePairsToObject(request.headers);
    
    // Build final URL with parameters for display and logging
    const finalUrl = buildUrlWithParams(request.url, params);
    console.log('Final URL with parameters:', finalUrl);
    
    // Parse JSON body if present
    let data: any = undefined;
    if (request.body.trim()) {
      try {
        data = JSON.parse(request.body);
      } catch (error) {
        throw new Error(`Invalid JSON in request body: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    // Prepare axios config
    const axiosConfig: any = {
      method: request.method.toLowerCase(),
      url: request.url, // Use original URL, let axios handle params
      timeout: 30000, // 30 second timeout
      validateStatus: () => true, // Don't throw on any status code
    };

    // Add params if they exist (axios will append them to URL automatically)
    if (Object.keys(params).length > 0) {
      axiosConfig.params = params;
    }

    // Add headers if they exist
    if (Object.keys(headers).length > 0) {
      axiosConfig.headers = headers;
    }

    // Add data for POST, PUT, PATCH requests
    if (['post', 'put', 'patch'].includes(request.method.toLowerCase()) && data !== undefined) {
      axiosConfig.data = data;
      // Set default content-type if not specified
      if (!axiosConfig.headers || !axiosConfig.headers['Content-Type']) {
        axiosConfig.headers = {
          ...axiosConfig.headers,
          'Content-Type': 'application/json'
        };
      }
    }

    console.log('Making request with config:', axiosConfig);
    console.log('Parameters being sent:', params);
    console.log('Headers being sent:', headers);

    // Make the axios request
    const response: AxiosResponse = await axios(axiosConfig);

    const endTime = Date.now();
    const duration = endTime - startTime;
    
    // Calculate response size
    const responseString = JSON.stringify(response.data);
    const size = new Blob([responseString]).size;

    // Log success
    console.log('Request successful!');
    console.log('Response status:', response.status);
    console.log('Response data:', response.data);

    // Create enhanced response with request info
    const apiResponse: ApiResponse = {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers as Record<string, string>,
      data: response.data,
      duration,
      size,
      // Add request information for debugging
      requestUrl: finalUrl,
      requestMethod: request.method,
      requestParams: params,
      requestHeaders: headers
    };

    return apiResponse;

  } catch (error) {
    const endTime = Date.now();
    const duration = endTime - startTime;

    console.error('Request failed:', error);

    if (error instanceof AxiosError) {
      if (error.response) {
        // Server responded with error status
        const responseString = JSON.stringify(error.response.data);
        const size = new Blob([responseString]).size;

        console.log('Server error response:', error.response.status, error.response.data);

        return {
          status: error.response.status,
          statusText: error.response.statusText,
          headers: error.response.headers as Record<string, string>,
          data: error.response.data,
          duration,
          size,
          requestUrl: buildUrlWithParams(request.url, convertKeyValuePairsToObject(request.params)),
          requestMethod: request.method,
          requestParams: convertKeyValuePairsToObject(request.params),
          requestHeaders: convertKeyValuePairsToObject(request.headers)
        };
      } else if (error.request) {
        // Network error
        console.error('Network error:', error.message);
        throw new Error(`Network Error: Could not connect to ${request.url}. Please check your internet connection and URL.`);
      } else if (error.code === 'ECONNABORTED') {
        throw new Error('Request timed out after 30 seconds');
      }
    }
    
    throw new Error(error instanceof Error ? error.message : 'Unknown error occurred');
  }
};