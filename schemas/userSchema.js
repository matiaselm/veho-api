'use strict';
import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        User(id: ID!): User
        Users: [User]
    }
    
    type User {
        id: ID!
        name: String
        points: Int
        language: String
    }

    extend type Mutation {
        DeleteUser(
            id: ID!
        ): String

        AddUser(
            name: String
            points: Int
            language: String
        ): User

        ModifyUser(
            id: ID!
            name: String
            points: Int
            language: String
        ): User
    }
`