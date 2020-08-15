import axios from 'axios';
import { gql } from '@apollo/client';
import URL from '../urls';
import { ISignUp } from '../interfaces';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${''}`
};

export const signup = (data: ISignUp) => {
  return axios.post(`${URL.base}auth/signup`, JSON.stringify(data), {
    headers,
  });
};

export const signin = (data: ISignUp) => {
  return axios.post(`${URL.base}auth/signin`, JSON.stringify(data), {
    headers,
  });
};


export const POSTS = gql`
  query {
    posts {
      id
      text
      user {
        name
      }
    }
  }
`;

export const POST = gql`
  query Post($id: String!) {
    post(id: $id) {
      id
      text
      user {
        name
      }
      comments{
        text
      }
    }
  }
`;

