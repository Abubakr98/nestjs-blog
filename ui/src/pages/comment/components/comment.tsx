import React from 'react';
import Typography from '@material-ui/core/Typography';
import { IComment } from '../../../interfaces';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { DELETE_COMMENT } from '../../../utils/queries';

const CommentWrap = styled.div`
  border: 1px solid silver;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 4px;
  padding: 0 15px;
`;
const DelBtn = styled.div`
  & > button {
    padding: 5px;
  }
`;

type CommentProps = {
  comment: IComment;
};

export const Comment: React.FC<CommentProps> = ({ comment }) => {
  const { id, text } = comment;
  const [deleteComment, { data, error: queryError }] = useMutation(DELETE_COMMENT);
  const onDelete = () => {
    deleteComment({ variables: { id } });
  };
  if (queryError) {
    alert(JSON.stringify(queryError.message, null, 2));
  }
  if (data) {
    window.location.reload();
  }
  return (
    <CommentWrap>
      <Typography variant="body1" component="p" color="textPrimary">
        {text}
      </Typography>
      <DelBtn>
        <IconButton aria-label="close" onClick={onDelete} color="secondary">
          &#10005;
        </IconButton>
      </DelBtn>
    </CommentWrap>
  );
};
