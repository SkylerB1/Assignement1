const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const mysql = require("mysql2");
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

const db_model = require("./models/root_model");
const transactions = db_model.Transactions;

const { GraphQLDate } = require("graphql-iso-date");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Vbnm@2022",
  database: "office_transactions",
});

const TransactionType = new GraphQLObjectType({
  name: "Transactions",
  description: "All Transactions",
  fields: {
    transaction_type: { type: new GraphQLNonNull(GraphQLString) },
    amount: { type: new GraphQLNonNull(GraphQLInt) },
    descriptions: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: new GraphQLNonNull(GraphQLDate) },
    running_balance: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

const root = new GraphQLObjectType({
  name: "Query",
  description: "All Transactions",
  fields: {
    AllTransactions: {
      type: new GraphQLList(TransactionType),
      resolve: async () => {
        let data = await transactions.findAll();
        return data;
      },
    },
    getRunningBalance: {
      type: new GraphQLList(TransactionType),
      resolve: async () => {
        let current_balance = await transactions.findAll({
          limit: 1,
          attributes: ["running_balance"],
          order: [["id", "DESC"]],
        });

        return current_balance;
      },
    },
  },
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "New Transaction",

  fields: {
    addNewTransaction: {
      type: TransactionType,
      args: {
        transaction_type: { type: new GraphQLNonNull(GraphQLString) },
        amount: { type: new GraphQLNonNull(GraphQLInt) },
        descriptions: { type: new GraphQLNonNull(GraphQLString) },
        running_balance: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const sqlIns =
          "INSERT INTO Transactions (transaction_type,amount,descriptions,running_balance,date) VALUES (?,?,?,?,curdate())";
        db.query(
          sqlIns,
          [
            args.transaction_type,
            args.amount,
            args.descriptions,
            args.running_balance,
          ],
          (err, result) => {
            if (err) {
              console.log(err);
            }
            return "Inserted";
          }
        );
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: root,
  mutation: RootMutationType,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

// app.use(
//   "/graphql",
//   graphqlHTTP((request, response, graphQLParams) => ({
//     schema: schema,
//     rootValue: root,
//     graphiql: true,
//   }))
// );

// app.use((req, res, next) => {
//   req.mysqlDb = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'Vbnm@2022',
//     database : 'office_transactions'
//   });
//   req.mysqlDb.connect();
//   next();
// });

// app.get("/", (req, res) => {
//   const sqlIns =
//     "INSERT INTO Transactions (transaction_type,amount,description,date) VALUES ('debit','100','food',today())";
//   db.query(sqlIns, (err, result) => {
//     console.log("Inserted");
//   });
// });

// app.get("/api/get", (req, res) => {
//   const sqlGet = "SELECT * from Transactions";
//   db.query(sqlGet, (err, result) => {
//     res.send(result);
//   });
// });

// app.post("/api/post", (req, res) => {
//   const { transaction_type, amount, description } = req.body;
//   const sqlInsert =
//     "INSERT INTO Transactions (transaction_type,amount,description,date) VALUES (?,?,?,curdate())";
//   db.query(
//     sqlInsert,
//     [transaction_type, amount, description],
//     (error, result) => {
//       if (error) {
//         console.log(error);
//       }
//     }
//   );
// });

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
