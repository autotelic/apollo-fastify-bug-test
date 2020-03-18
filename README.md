### Apollo Server Fastify Example

The purpose of this app is to confirm that apollo-server-fastify's context function is only being passed the `request`.

##### Related PR

https://github.com/apollographql/apollo-server/pull/3895

#### Running the app

```
$ npm i
```

```
$ npm start
```

Running the app should `console.log` the following:

```
There are 1 args being passed into context
Arg #1 is a Fastify Request
```
