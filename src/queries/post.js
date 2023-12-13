import { gql } from "@apollo/client"

export const GET_POSTS = gql`
  query Query {
    posts {
      _id
      content
      imgUrl
      authorId
      comments {
        authorId
      }
      likes {
        authorId
      }
      createdAt
      updatedAt
      user {
        _id
        email
        name
        username
      }
    }
  }
`

export const GET_POST = gql`
  query Query($id: ID!) {
    post(_id: $id) {
      _id
      comments {
        content
        authorId
        createdAt
        updatedAt
        user {
          _id
          name
          username
          email
        }
      }
      authorId
      content
      createdAt
      imgUrl
      likes {
        authorId
        createdAt
        updatedAt
        user {
          _id
          name
          username
          email
        }
      }
      tags
      updatedAt
      user {
        _id
        email
        name
        username
      }
    }
  }
`

export const CREATE_POST = gql`
  mutation Mutation($addPost: AddPost) {
    add(addPost: $addPost) {
      _id
      authorId
      content
      createdAt
      comments {
        content
        authorId
        createdAt
        updatedAt
      }
    }
  }
`

export const LIKE_POST = gql`
  mutation Mutation($likePost: LikePost) {
    like(likePost: $likePost) {
      authorId
      createdAt
      updatedAt
    }
  }
`

export const COMMENT_POST = gql`
  mutation Mutation($commentPost: CommentPost) {
    comment(commentPost: $commentPost) {
      authorId
      content
      createdAt
      updatedAt
    }
  }
`