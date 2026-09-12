const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message?: string;
  data: T;
  timestamp: string;
}

export interface ApiError {
  success: false;
  statusCode: number;
  message: string;
  errors?: string[] | null;
  timestamp: string;
  path?: string;
}

export async function fetchApi<T = any>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw data as ApiError;
  }

  return data as ApiResponse<T>;
}
