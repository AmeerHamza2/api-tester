import type { KeyValuePair } from "../ApiTester/types";

export const validateKeyValuePairs = (pairs: KeyValuePair[]): string[] => {
  const errors: string[] = [];
  
  pairs.forEach((pair, index) => {
    if (pair.key.trim() && !pair.value.trim()) {
      errors.push(`Row ${index + 1}: Key "${pair.key}" has no value`);
    }
  });
  
  return errors;
};

export const validateJson = (jsonString: string): { isValid: boolean; error?: string } => {
  if (!jsonString.trim()) {
    return { isValid: true };
  }
  
  try {
    JSON.parse(jsonString);
    return { isValid: true };
  } catch (error) {
    return { 
      isValid: false, 
      error: error instanceof Error ? error.message : 'Invalid JSON format' 
    };
  }
};