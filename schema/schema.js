const graphql = require('graphql')
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLInt, GraphQLList } = graphql
const User = require('../models/user')
const Bank = require('../models/banks')

const UserType = new GraphQLObjectType({
    name:'User',
    fields: ()=>({
        id: {type: GraphQLID},
        sname: {type: GraphQLString},
        fname: {type: GraphQLString},
        lname: {type: GraphQLString},
        username: {type: GraphQLString},
        password: {type: GraphQLString},
        bvn: {type: GraphQLString},
        phone:{type: GraphQLInt},
        email:{type: GraphQLString},
        otp: {type: GraphQLString},
        start:{type: GraphQLString},
        end:{type: GraphQLString},
        bank: {
            type: new GraphQLList(BankType),
            resolve(parent, args){
                return Bank.find({userid: parent.id})
            }
        }
    })
})

const BankType = new GraphQLObjectType({
    name:'Bank',
    fields:()=> ({
        id: {type: GraphQLID},
        bankname: {type: GraphQLString},
        account: {type: GraphQLString},
        userid: {type: GraphQLString},
        bvn:{type: GraphQLString},
        transaction:{type: GraphQLString}
    })
})
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        //get single user
        user:{
            type: UserType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return User.findById(args.id)
            }
        },
        //get all users
        users:{
            type:new GraphQLList(UserType),
            resolve(parent, args){
                return User.find({})
            }
        },
        // get single bank
        bank:{
            type: BankType,
            args:{id: {type: GraphQLID}},
            resolve(parent, args){
                return Bank.findById(args.id)
            }
        },
        //get all banks
        banks:{
            type: new GraphQLList(BankType),
            resolve(parent, args){
                return Bank.find({})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})