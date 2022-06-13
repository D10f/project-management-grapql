import {
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
} from 'graphql';
import Client from '../models/Client.js';
import Project from '../models/Project.js';

// Client Type
const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

// Project Type
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLID },
    description: { type: GraphQLID },
    status: { type: GraphQLID },
    client: {
      type: ClientType,
      resolve(parent) {
        return Client.findById(parent.id);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    clients: {
      type: new GraphQLList(ClientType),
      resolve(_parent) {
        return Client.find({});
      },
    },
    client: {
      type: ClientType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(_parent, args) {
        return Client.findById(args.id);
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(_parent) {
        return Project.find({});
      },
    },
    project: {
      type: ProjectType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(_parent, args) {
        return Project.findById(args.id);
      },
    },
  },
});

export default new GraphQLSchema({ query: RootQuery });
