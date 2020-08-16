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
        id
        text
      }
    }
  }
`;

export const DELETE_POST = gql`
mutation DelPost($id: String!) {
    deletePost(id:$id)
  }
`;

export const DELETE_COMMENT = gql`
mutation DelCOMMENT($id: String!) {
  deleteComment(id:$id)
  }
`;

export const CREATE_POST = gql`
mutation CreatePost($input:NewPostInput!){
  createPost(input:$input){
    id
  }
  }
`;

export const CREATE_COMMENT = gql`
mutation CreateComment($input:NewCommentInput!){
  createComment(input:$input){
    id
    text
  }
  }
`;