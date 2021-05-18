export type ApiHeader = {
  key: string;
  value: string;
};

export type ApiMethod = 'POST' | 'GET' | 'PUT';

export type ApiError = {
  statusCode: number;
  description: string;
};

export type QueryParam = {
  name: string;
  value: string;
};
