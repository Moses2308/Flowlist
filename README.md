# Flowlist

A app designed to support productivity by giving structure to habits and behavior.

# Flowlist

A app designed to support productivity by giving structure to habits and behavior.

# BACKEND API ENDPOINTS

The following API is used for connecting the front end to the backend.  
Each endpoint is prefaced with `flowlist/api/v1/`.  
Each endpoint is formatted to expect JSON.

For example:

```
const usersEndpoint = "flowlist/api/v1/users"
const listsEndpont = "flowlist/api/v1/lists/:listId"
```

## USERS

### POST

ENDPOINT: `/users`

**Request** requires an `email` and `password` field in the request body.

**Response** includes the `status` indicating the result of operation and the `User` if successfully created.

REQUEST BODY:

```
{
    fields: {
        "email": "arbitrary@example.com",
        "password" : "rawPassword"
    }
}
```

RESPONSE:

```
{
    "status": "created",
    "user": User
}
```

### GET

ENDPOINT: `/users?"sort=value&limit=value&offset=value`

**Response** includes all `users` in a database.  
Optionally includes `currentOffset` as a query param.

> Can be paginated if given `limit` and `offset` query params.  
> Can sort the queries by the specified sort value if given the `sort` query param.

REQUEST BODY:

```

```

RESPONSE:

```
{
    "users": [User1, User2, ...],
    "currentOffset": 20
}
```

### GET

ENDPOINT: `/users/:userId?include=lists,res`

**Response** includes a specific `User` given the `userId`.  
Optionally includes any associated `resources`.

> Can eager load user associated resources if given the `include` query param.

REQUEST BODY:

```

```

RESPONSE:

```
{
    "user": User,
    "lists": [List1, List2, ...],
    "res": [Res1, Res2, ...]
}
```

### PATCH

ENDPOINT: `/users/:userId`

**Request** updates the `User` based on the fields in the request body.

**Response** includes the updated `User` specified by the `userID` and the `status` of the operation.

REQUEST BODY:

```
{
    "fields":{
        "email" : "new@example.com",
        "newPassword": "newPassword",
        "password": "oldPassword"
    }
}
```

RESPONSE:

```
{
    "status": "updated"
    "user": User
}
```

### DELETE

ENDPOINT: `/users/:userId`

**Request** deletes the `User` based on `userId` and `password` field from request body.

**Response** includes the resulting `User` (which is now Null), and the status.

REQUEST BODY:

```
{
    "fields": {
        password: "rawPassword"
    }
}
```

RESPONSE:

```
{
    "user": User,
    "status": "hardDeleted"
}
```
