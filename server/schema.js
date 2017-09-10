const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

// hard coded data
const customers = [
    {
        id: "1",
        name: "Jogn Doe",
        email: "je.je@efwfwef.fe",
        age: 43
    },
    {
        id: "2",
        name: "Steve Smith",
        email: "mamama@gmail.com",
        age: 21
    },
    {
        id: "3",
        name: "Sarah Williams",
        email: "sarah.williams@gmail.com",
        age: 34
    },
]

const CustomerType = new GraphQLObjectType({
    name: "Customer",
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt }
    }
});

// root query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        customer: {
            type: CustomerType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parentValue, args) {
                return customers.find(customer => customer.id === args.id);
            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args) {
                return customers;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});