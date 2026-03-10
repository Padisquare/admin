type ResponseType<T> = {
  message: string;
  title: string;
  statusCode: number;
  entity: T;
};

export type { ResponseType };
