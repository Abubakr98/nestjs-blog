
export interface ISignUp {
  name: string;
  email: string;
  password: string;
}

export interface IComment {
  id: string;
  text: string;
}

export interface IPost {
  id?: string;
  text?: string;
  comments?: {
    id?: string;
    text?: string;
  }
  user?: {
    id?: string;
    name?: string;
    email?: string;
  }
}