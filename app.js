var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

const sites = require('./data/sites').sites;
const categories = require('./data/categories').categories;

var typeDefs = buildSchema(`
    type Site {
        title: String!
        url: String,
        pageViews: Int,
        logo: String,
        category: String,
    }

    type Category {
        id: ID!,
        desc: String,
        showorder: Int,
        display: String,
        sites: [Site]
    }

    type Query {
        hello: String
        sites: [Site]
        site(siteId: ID!): Site
        categories: [Category]
        # 检索分类接口定义
        category(categoryId: ID!): Category
        rollDice(numDice: Int!, numSides: Int): [Int]
    }
`);

var resolvers = {
    hello: () => 'GraphQL',
    sites: () => sites,
    site: ({siteId}) => {
        return sites.find(item => item.id == siteId)
    },
    categories: () => categories,
    // # 检索分类实现
    category: ({categoryId}) => {
        return categories.find(item => item.id == categoryId)
    },
    rollDice: ({numDice, numSides}) => {
        let output = [];
        output.push(numDice);
        output.push(numSides);
        return output;
    }
};

var app = express();
app.use('/', graphqlHTTP({
    schema: typeDefs,
    rootValue: resolvers,
    graphiql: true,
}));
app.listen(3000, () => {
    console.log('Now browse to localhost:3000/')
});

/**
 * 

query MyQuery($categoryId: ID!) {
  category(categoryId: $categoryId) {
        desc
        showorder
        display
  }
}
{
    "categoryId": "aws"
}

=====================================================================


query MyQuery {
  category(categoryId: "aws") {
        desc
        showorder
        display
  }
}

 * 
 * 
 */