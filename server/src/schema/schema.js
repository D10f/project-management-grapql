import {
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
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
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(_parent, { name, email, phone }) {
        const client = new Client({ name, email, phone });
        return client.save();
      },
    },
    deleteClient: {
      type: ClientType,
      args: {
        id: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve(_parent, { id }) {
        return Client.findByIdAndRemove(id);
      },
    },
    updateClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
      },
      async resolve(_parent, { id, name, email, phone }) {
        const result = await Client.findByIdAndUpdate(
          id,
          { name, email, phone },
          { new: true, lean: true },
        );
        return result;
      },
    },
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatus',
            values: {
              new: { value: 'Uninitiated' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' },
            },
          }),
          defaultValue: 'Uninitiated',
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(_parent, { name, description, status, clientId }) {
        const project = new Project({ name, description, status, clientId });
        return project.save();
      },
    },
    deleteProject: {
      type: ProjectType,
      args: {
        id: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve(_parent, { id }) {
        return Project.findByIdAndRemove(id);
      },
    },
    updateProject: {
      type: ProjectType,
      args: {
        id: {
          type: GraphQLNonNull(GraphQLString),
        },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatusUpdate',
            values: {
              new: { value: 'Uninitiated' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' },
            },
          }),
        },
      },
      resolve(_parent, { id, name, description, status }) {
        return Project.findByIdAndUpdate(
          id,
          { name, description, status },
          { new: true, lean: true },
        );
      },
    },
  },
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

export default new GraphQLSchema({ query: RootQuery, mutation });
