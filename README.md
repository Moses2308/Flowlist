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

---

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

TODO: IMPLEMENT SORTING

ENDPOINT: `/users?"sort=value&limit=value&offset=value`

**Request** no requirements

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

TODO: IMPLEMENT EAGER LOADING

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

---

## Lists

### POST

ENDPOINT: `/lists`

**Request** requires an `title` field in the request body.

> Can define the list as a checklist or a plain list by passing `isChecklist`
> by default, it is false.

**Response** includes the `status` indicating the result of operation and the `List` if successfully created.

REQUEST BODY:

```
{
    fields: {
        "title": "My List Name"
        "isChecklist": true
    }
}
```

RESPONSE:

```
{
    "status": "created",
    "list": List
}
```

### GET

ENDPOINT: `/lists`

TODO: IMPLEMENT EAGER LOADING

**Request** no requirements

**Response** includes all the `List` objects associated with the user.

REQUEST BODY:

```

```

RESPONSE:

```
{
    "lists": [List1, List2, ...]
}
```

### GET

TODO: IMPLEMENT EAGER LOADING

ENDPOINT: `/lists/:listId?include=listItems

**Request** no requirements

**Response** includes all the `List` objects associated with the user.

REQUEST BODY:

```

```

RESPONSE:

```
{
    "list": List,
    "listItems": [listItem1, listItem2, ...]
}
```

### PATCH

//TODO: Validate User has access to list with SESSION info

ENDPOINT: `/lists/:listId`

**Request** requires a `title` field in the request body

**Response** includes the `List` object that was updated.

REQUEST BODY:

```
{
    "fields":{
        "title": "new title"
    }
}
```

RESPONSE:

```
{
    "list": List,
    "listItems": [listItem1, listItem2, ...]
}
```

### DELETE

//TODO: Validate User has access to list with SESSION info

ENDPOINT: `/lists/:listId`

**Request** no required fields

**Response** includes the `List` object that was updated.

REQUEST BODY:

```
{
    "hardDelete": true || false
}
```

RESPONSE:

```
{
    "status": "hardDeleted" || "softDeleted",
    "list": null
}
```

---

## ListItems

### POST

ENDPOINT: `/lists/:listId/listItems`

**Request** requires a title for the new listItem

**Response** includes the `ListItem` object that was created.

REQUEST BODY:

```
{
    "fields":{
        "title": "new title"
    }
}
```

RESPONSE:

```
{
    "status": "created",
    "listItem": ListItem
}
```

### GET

ENDPOINT: `/lists/:listId/listItems`

**Request** no required fields

**Response** includes all `ListItems` objects that belong to the user.

REQUEST BODY:

```

```

RESPONSE:

```
{
    "listItems": [ListItem1, ListItem2, ...]
}
```

### GET

//not implemented

ENDPOINT: `/lists/:listId/listItems/:listItemId`

**Request** no required fields

**Response** includes a `ListItem` corresponding to the :listItemId

REQUEST BODY:

```

```

RESPONSE:

```
{
    "listItem": ListItem
}
```

### PATCH

ENDPOINT: `/lists/:listId/listItems/:listItemId`

**Request** accepts an fields to modify the title or isChecked fields of the record.

**Response** includes a `ListItem` object corresponding to the :listItemId and the status.

REQUEST BODY:

```
{
    "fields": {
        "title": "new title",
        "isChecked": false
    }
}
```

RESPONSE:

```
{
    "status": "updated",
    "listItem": ListItem
}
```

### DELETE

ENDPOINT: `/lists/:listId/listItems/:listItemId`

**Request** accepts a boolean "hardDelete" option to determine whether to perform a soft delete or a hard delete

**Response** includes the type of deletion, and null

REQUEST BODY:

```
{
    "hardDelete": true,
}
```

RESPONSE:

```
{
    "status": "hardDeleted" || "softDeleted"
    "listItem": null
}
```
