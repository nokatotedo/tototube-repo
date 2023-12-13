import { gql } from "@apollo/client"

export const GET_USER = gql`
  query Query($id: ID) {
    user(_id: $id) {
      _id
      email
      followers {
        user {
          _id
          email
          name
          username
        }
        _id
      }
      followings {
        _id
        user {
          _id
          email
          name
          username
        }
      }
      username
      name
    }
  }
`

export const FOLLOW_USER = gql`
  mutation Mutation($followUser: FollowUser) {
    follow(followUser: $followUser) {
      _id
      createdAt
      followerId
      followingId
      updatedAt
    }
  }
`

export const GET_USERS = gql`
  query Query($searchUser: SearchUser) {
    searchUser(searchUser: $searchUser) {
      _id
      email
      name
      username
    }
  }
`

export const LOGIN_USER = gql`
  query Query($loginUser: LoginUser) {
    login(loginUser: $loginUser) {
      access_token
    }
  }
`

export const REGISTER_USER = gql`
  mutation Mutation($registerUser: RegisterUser) {
    register(registerUser: $registerUser) {
      _id
      email
      name
      username
    }
  }
`