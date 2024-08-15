export interface IGuest {
  'id': 'string',
  'author': 'string',
  'message': 'string',
  'image': 'string' | null
}

export type Guest = {
  author: string;
  message: string;
  image: string | null;
}