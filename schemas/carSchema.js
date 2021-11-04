'use strict';
import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        Car(id: ID!): Car
        Cars: [Car]
    }

    type Car {
        id: ID
        image_url: String
        manufacturer: String
        model: String
        year: Int
        km: Int,
        fueltype: String
    }

    extend type Mutation {
        CreateCar(
            image_url: String!
            manufacturer: String!
            model: String!
            year: Int
            km: Int
            fueltype: String!
        ): Car

        DeleteCar(
            id: ID!
        ): String

        ModifyCar(
            id: ID!
            name: String
            image_url: String
            manufacturer: String
            model: String
            year: Int
            km: Int
            fueltype: String
        ): Car
    }
`
