# Nexlink Backend API

![Architecture API](https://github.com/nexlinkproject/nexlink-be/blob/main/architecture.png?raw=true)

## Endpoint
Default Url: `"https://nexlink-be-hby6xvshwq-et.a.run.app"`

| Endpoint | Method | Description |
| -- | -- | -- |
| Authentication Endpoints |
| -- | -- | -- |
| `/auth/register` | POST | New user register |
| `/auth/login` | POST | User login |
| `/auth/logout` | POST | User logout |
| `/auth/reset-password` | POST | User logout |
| User Endpoints |
| -- | -- | -- |
| `/users/` | GET | Get all user profile |
| `/users/{id}` | PUT | Update user profile by id |
| `/users/{id}` | GET | Get user profile by id |
| `/users/{id}` | DELETE | DELETE user profile |
| Project Endpoints |
| -- | -- | -- |
| `/projects` | GET | Get all projects |
| `/projects` | POST | Create a new project |
| `/projects/{id}` | GET | Ge a specific project by id |
| `/projects/{id}` | PUT | Update a specific project by id |
| `/projects/{id}` | DELETE | Delete a specific project by id |
| `/projects/{id}/users` | GET | Get users associated with a project |
| `/projects/{projectId}/users/{userId}` | POST | Add user to a project |
| `/projects/{projectId}/users/{userID}` | DELETE | Remove a user from a project |
| Task Endpoints |
| -- | -- | -- |
| `/tasks` | GET | Get all tasks |
| `/tasks` | POST | Create a new task |
| `/tasks/{id}` | GET | Get a specific task by id |
| `/tasks/{id}` | PUT | Update a specific task by id |
| `/tasks/{id}` | DELETE | Delete a specific task by id |
| `/tasks/project/{projectId}` | GET | Get tasks for a specific project |
| `/tasks/user/:userId` | GET | Get tasks assigned to a specific user |
| `/tasks/{taskId}/users/{userId}` | POST | Add user to a task |
| `/tasks/{taskId}/users/{userId}` | DELETE | Remove user from a task |
| Chat Endpoints |
| -- | -- | -- |
| `/chats` | GET | Get all group chat |
| `/chats/groups` | POST | Create group chat |
| `/chats/groups/{groupId}` | DELETE | Delete group chat |
| `/chats/groups/{groupId}` | GET | Get a group chat |
| `/chats/groups/{groupId}/message` | POST | Send a message |
| Schedule/ML Endpoints |
| -- | -- | -- |
| `/tasks/schedule/{projectId}` | POST | Send request to ML for transform schedule |
| `/tasks/feedback/{projectId}` | POST | Store ML data feedback |

## Auth Routes

### Register

**Endpoint**

`POST /auth/register`

**Headers**

- Content-Type: `<application/json>

**Body Parameters**

- username: `<string>`
- email: `<string>`
- password: `<string>`
- fullName: `<string>`

**Example Response**

Status: 201

```json
{
    "status": "success",
    "message": "User registered successfully",
    "data": {
        "user": {
            "id": 1,
            "username": "johnsmith",
            "email": "johnsmith@example.com",
            "fullName": "John Smith",
            "createdAt": "2024-05-24T00:00:00.000Z",
            "updatedAt": "2024-05-24T00:00:00.000Z"
        }
    }
}

```

### Login

**Endpoint**

`add /auth/login`

**Headers**

- Content-Type: `<application/json>`

**Body Parameters**

- email: `<string>`
- password: `<string>`

**Example Response**

Status: 200

```json
{
    "status": "success",
    "message": "Login successful",
    "data": {
        "userId": "id",
        "fullName": "John Smith",
        "accessToken": "JWT_TOKEN"
    }
}

```

### Logout

**Endpoint**

`POST /auth/logout`

**Headers**

- Content-Type: `<application/json>`

**Example Response**

Status: 200

```json
{
    "status": "success",
    "message": "Logout successful"
}

```

### Reset Password

**Endpoint**

`POST /auth/reset-password`

**Headers**

- Content-Type: `<application/json>`

**Body Parameters**

- newPassword: `<string>`
- token: `<string>`

**Example Response**

Status: 200

```json
{
    "status": "success",
    "message": "Password has been reset"
}

```

## User Routes

### Get Users

**Endpoint**

`GET /users`

**Headers**

- Authorization: Bearer `<JWT_TOKEN>`

**Example Response**

Status: 200

```json
{
    "status": "success",
    "message": "All users retrieved successfully",
    "data": {
        "users": [
            {
                "id": 1,
                "username": "Johnsmith",
                "email": "Johnsmith@example.com",
                "fullName": "John Smith",
                "createdAt": "2024-05-24T00:00:00.000Z",
                "updatedAt": "2024-05-24T00:00:00.000Z"
            }
            // more users...
        ]
    }
}

```

### Update User

**Endpoint**

`PUT /users/:id`

**Headers**

- Authorization: Bearer: `<JWT_TOKEN>`

**Path Parameters**

- id: `<integer>`

**Example Response**

Status: 200

```json
{
    "status": "success",
    "message": "User updated successfully",
    "data": {
        "user": {
            "id": 1,
            "username": "Johnsmith",
            "email": "Johnsmith@example.com",
            "fullName": "John Smith",
            "createdAt": "2024-05-24T00:00:00.000Z",
            "updatedAt": "2024-05-24T00:00:00.000Z"
        }
    }
}

```

### GET User By Id

**Endpoint**

`GET /users/:id`

**Headers**

- Authorization: Bearer: `<JWT_TOKEN>`
- Content-Type: `<application/json>`

**Path Parameters**

- id: `<integer>`

**Example Response**

Status: 200

```json
{
    "status": "success",
    "message": "User retrieved successfully",
    "data": {
        "user": {
            "id": 1,
            "username": "Johnsmith",
            "email": "Johnsmith@example.com",
            "fullName": "John Smith",
            "createdAt": "2024-05-24T00:00:00.000Z",
            "updatedAt": "2024-05-24T00:00:00.000Z"
        }
    }
}

```

### DELETE User

**Endpoint**

`PUT /users/:id`

**Headers**

- Authorization: Bearer: `<JWT_TOKEN>`

**Path Parameters**

- id: `<integer>`

**Example Response**

Status: 200

```json
{
    "status": "success",
    "message": "User deleted successfully"
}

```

## Project Routes

### Get Projects

**Endpoint**

`GET /projects`

**Headers**

- Authorization: Bearer `<JWT_TOKEN>`

**Example Response**

Status: 200

```json
{
    "status": "success",
    "message": "Projects retrieved successfully",
    "data": {
        "projects": [
            {
                "id": 1,
                "name": "Project 1",
                "description": "Description of Project 1",
                "status": "active",
                "startDate": "2024-05-01T00:00:00.000Z",
                "endDate": "2024-12-31T00:00:00.000Z",
                "deadline": "2024-12-31T00:00:00.000Z",
                "createdAt": "2024-05-24T00:00:00.000Z",
                "updatedAt": "2024-05-24T00:00:00.000Z"
            }
            // more projects
        ]
    }
}
```

### Create Project

**Endpoint**

`POST /projects`

**Headers**

- Authorization: Bearer `<JWT_TOKEN>`
- Content-Type: `<application/json>`

**Body Parameters**

- name: `<string>`
- description: `<string>`
- status: `<string>`
- startDate: `<(string, date-time>`
- endDate: `<(string, date-time>`
- deadline: `<(string, date-time>`

**Example Response**

Status: 201

```json
{
    "status": "success",
    "message": "Project created successfully",
    "data": {
        "project": {
            "id": 1,
            "name": "Project 1",
            "description": "Description of Project 1",
            "status": "active",
            "startDate": "2024-05-01T00:00:00.000Z",
            "endDate": "2024-12-31T00:00:00.000Z",
            "deadline": "2024-12-31T00:00:00.000Z",
            "createdAt": "2024-05-24T00:00:00.000Z",
            "updatedAt": "2024-05-24T00:00:00.000Z"
        }
    }
}
```

### Get Project by ID

**Endpoint**

`GET /projects/:id`

**Headers**

- Authorization: Bearer `<JWT_TOKEN>`

**Path Parameters**

- id: `<integer>`

**Example Response**

Status: 

```json
{
    "status": "success",
    "message": "Project retrieved successfully",
    "data": {
        "project": {
            "id": 1,
            "name": "Project 1",
            "description": "Description of Project 1",
            "status": "active",
            "startDate": "2024-05-01T00:00:00.000Z",
            "endDate": "2024-12-31T00:00:00.000Z",
            "deadline": "2024-12-31T00:00:00.000Z",
            "createdAt": "2024-05-24T00:00:00.000Z",
            "updatedAt": "2024-05-24T00:00:00.000Z"
        }
    }
}
```

### Update Project

**Endpoint**

`PUT /projects/:id`

**Headers**

- Authorization: Bearer `<JWT_TOKEN>`
- Content-Type: `<application/json>`

**Path Parameters**

- id: `<integer>`

**Body Parameters**

- name: `<string>`
- description: `<string>`
- status: `<string>`
- startDate: `<(string, date-time>`
- endDate: `<(string, date-time>`
- deadline: `<(string, date-time>`

**Example Response**

Status: 200

```json
{
    "status": "success",
    "message": "Project updated successfully",
    "data": {
        "project": {
            "id": 1,
            "name": "Project 1",
            "description": "Description of Project 1",
            "status": "active",
            "startDate": "2024-05-01T00:00:00.000Z",
            "endDate": "2024-12-31T00:00:00.000Z",
            "deadline": "2024-12-31T00:00:00.000Z",
            "createdAt": "2024-05-24T00:00:00.000Z",
            "updatedAt": "2024-05-24T00:00:00.000Z"
        }
    }
}
```

### Delete Project

**Endpoint**

`DELETE /projects/:id`

**Headers**

- Authorization: Bearer `<JWT_TOKEN>`

**Body Parameters**

- id: `<integer>`

**Example Response**

Status: 200

```json
{
    "status": "success",
    "message": "Project deleted successfully"
}
```

### Get Project Users

**Endpoint**

`GET /projects/:id/users`

**Headers**

- Authorization: Bearer `<JWT_TOKEN>`

**Path  Parameters**

- id: `<integer>`

**Example Response**

Status: 200

```json
{
    "status": "success",
    "message": "Project users retrieved successfully",
    "data": {
        "users": [
            {
                "id": 1,
                "username": "Johnsmith",
                "email": "Johnsmith@example.com",
                "fullName": "John Smith",
                "role": "user",
                "createdAt": "2024-05-24T00:00:00.000Z",
                "updatedAt": "2024-05-24T00:00:00.000Z"
            }
            // more users...
        ]
    }
}
```

### Add User to Project

**Endpoint**

`POST /projects/:projectId/users/:userId`

**Headers**

- Authorization: Bearer `<JWT_TOKEN>`
- Content-Type: `<application/json>`

**Path  Parameters**

- projectId: `<integer>`
- userId: `<integer>`

**Example Response**

Status: 201

```json
{
    "status": "success",
    "message": "User added to project successfully"
}
```

### Remove User from Project

**Endpoint**

`DELETE /projects/:id/users/:userId`

**Headers**

- Authorization: Bearer `<JWT_TOKEN>`

**Path  Parameters**

- id: `<integer>`
- userId: `<integer>`

**Example Response**

Status: 200

```json
{
    "status": "success",
    "message": "User removed from project successfully"
}
```

## Task Routes

### Get Tasks

**Endpoint**

`GET /tasks`

**Headers**

- Authorization: Bearer `<JWT_TOKEN>`

**Example Response**

Status: 200

```json
{
    "status": "success",
    "message": "Tasks retrieved successfully",
    "data": {
        "tasks": [
            {
                "id": 1,
                "title": "Task 1",
                "description": "Description of Task 1",
                "status": "pending",
                "priority": "high",
                "dueDate": "2024-06-30T00:00:00.000Z",
                "projectId": 1,
                "assigneeId": 1,
                "createdAt": "2024-05-24T00:00:00.000Z",
                "updatedAt": "2024-05-24T00:00:00.000Z"
            }
            // more tasks...
        ]
    }
}
```

### Create Task

**Endpoint**

`POST /tasks`

**Headers**

- Authorization: Bearer `<JWT_TOKEN>`
- Content-Type:` <application/json>`

**Body Parameters**

- title : `<string>`
- description : `<string>`
- status : `<string>`
- priority: `<string>`
- dueDate : `<string, date-time>`
- projectId : `<integer>`
- assigneeId: `<integer>`

**Example Response**

Status: 201

```json
{
    "status": "success",
    "message": "Task created successfully",
    "data": {
        "task": {
            "id": 1,
            "title": "Task 1",
            "description": "Description of Task 1",
            "status": "pending",
            "priority": "high",
            "dueDate": "2024-06-30T00:00:00.000Z",
            "projectId": 1,
            "assigneeId": 1,
            "createdAt": "2024-05-24T00:00:00.000Z",
            "updatedAt": "2024-05-24T00:00:00.000Z"
        }
    }
}
```

### Get Task by ID

**Endpoint**

`GET /tasks/:id`

**Headers**

- Authorization: Bearer `<JWT_TOKEN>`

**Path  Parameters**

- id: `<integer>`

**Example Response**

Status: 200

```json
{
    "status": "success",
    "message": "Task retrieved successfully",
    "data": {
        "task": {
            "id": 1,
            "title": "Task 1",
            "description": "Description of Task 1",
            "status": "pending",
            "priority": "high",
            "dueDate": "2024-06-30T00:00:00.000Z",
            "projectId": 1,
            "assigneeId": 1,
            "createdAt": "2024-05-24T00:00:00.000Z",
            "updatedAt": "2024-05-24T00:00:00.000Z"
        }
    }
}
```

### Update Task

**Endpoint**

`PUT /tasks/:id`

**Headers**

- Authorization: Bearer `<JWT_TOKEN>`
- Content-Type: `<application/json>`

**Body Parameters**

- id: `<integer>`

**Body Parameters**

- title : `<string>`
- description : `<string>`
- status : `<string>`
- priority: `<string>`
- dueDate : `<string, date-time>`
- projectId : `<integer>`
- assigneeId: `<integer>`

**Example Response**

Status: 200

```json
{
    "status": "success",
    "message": "Task updated successfully",
    "data": {
        "task": {
            "id": 1,
            "title": "Task 1",
            "description": "Description of Task 1",
            "status": "pending",
            "priority": "high",
            "dueDate": "2024-06-30T00:00:00.000Z",
            "projectId": 1,
            "assigneeId": 1,
            "createdAt": "2024-05-24T00:00:00.000Z",
            "updatedAt": "2024-05-24T00:00:00.000Z"
        }
    }
}
```

### Delete Task

**Endpoint**

`DELETE /tasks/:id`

**Headers**

- Authorization: Bearer `<JWT_TOKEN>`

**Path  Parameters**

- id: `<integer>`

**Example Response**

Status: 200

```json
{
    "status": "success",
    "message": "Task deleted successfully"
}
```

### Get Project Tasks

**Endpoint**

`GET /tasks/project/:projectId`

**Headers**

- Authorization: Bearer `<JWT_TOKEN>`

**Path Parameters**

- projectId: `<integer>`

**Example Response**

Status: 200

```json
{
    "status": "success",
    "message": "Project tasks retrieved successfully",
    "data": {
        "tasks": [
            {
                "id": 1,
                "title": "Task 1",
                "description": "Description of Task 1",
                "status": "pending",
                "priority": "high",
                "dueDate": "2024-06-30T00:00:00.000Z",
                "projectId": 1,
                "assigneeId": 1,
                "createdAt": "2024-05-24T00:00:00.000Z",
                "updatedAt": "2024-05-24T00:00:00.000Z"
            }
            // more tasks...
        ]
    }
}
```

### Get User Tasks

**Endpoint**

`GET /tasks/user/:userId`

**Headers**

- Authorization: Bearer `<JWT_TOKEN>`

**Path  Parameters**

- userId: `<integer>`

**Example Response**

Status: 200

```json
{
    "status": "success",
    "message": "User tasks retrieved successfully",
    "data": {
        "tasks": [
            {
                "id": 1,
                "title": "Task 1",
                "description": "Description of Task 1",
                "status": "pending",
                "priority": "high",
                "dueDate": "2024-06-30T00:00:00.000Z",
                "projectId": 1,
                "assigneeId": 1,
                "createdAt": "2024-05-24T00:00:00.000Z",
                "updatedAt": "2024-05-24T00:00:00.000Z"
            }
            // more tasks...
        ]
    }
}
```

### Add User to Task

**Endpoint**

`POST /tasks/:taskId/users/:userId`

**Headers**

- Authorization: Bearer `<JWT_TOKEN>`
- Content-Type: `<application/json>`

**Path  Parameters**

- taskId: `<integer>`
- userId: `<integer>`

**Example Response**

Status: 201

```json
{
    "status": "success",
    "message": "User added to task successfully"
}
```

### Remove User from Task

**Endpoint**

`DELETE /tasks/:taskId/users/:userId`

**Headers**

- Authorization: Bearer `<JWT_TOKEN>`

**Path  Parameters**

- taskId: `<integer>`
- userId: `<integer>`

**Example Response**

Status: 200

```json
{
    "status": "success",
    "message": "User removed from project successfully"
}
```
## Chat Routes

### Get All Groups

**Endpoint**

`GET /chats`

**Headers**

- Authorization: Bearer `<JWT_TOKEN>`

**Query**

- page=`<integer>`
- take=`<integer>`

**Example Response**

Status: 200

```json
{
    "status": "success",
    "message": "Your Group Chat with the latest chat has been retrieved",
    "data": [
        {
            "id": 1,
            "name": "Project Team",
            "userId": 1,
            "chatType": "group",
            "createdAt": "2024-06-24T12:00:00.000Z",
            "updatedAt": "2024-06-24T12:00:00.000Z",
            "Users": [
                {
                    "id": 2,
                    "username": "user2",
                    "email": "user2@example.com"
                },
                {
                    "id": 3,
                    "username": "user3",
                    "email": "user3@example.com"
                }
            ]
        }
        // more groups...
    ]
}
```

### Create Group Chat

**Endpoint**

`POST /chats/groups`

**Headers**

- Authorization: Bearer `<JWT_TOKEN>`

**Body Parameters**

- groupName `<string>`
- members `<array or integer>`
- chatType `<string>`

**Example Response**

Status: 201

```json
{
    "status": "success",
    "message": "New Group Chat has been created",
    "data": {
        "id": 1,
        "name": "Project Team",
        "userId": 1,
        "chatType": "group",
        "createdAt": "2024-06-24T12:00:00.000Z",
        "updatedAt": "2024-06-24T12:00:00.000Z"
    }
}
```

### Delete Group Chat

**Endpoint**

`DELETE /chats/groups/:groupId`

**Headers**

- Authorization: Bearer `<JWT_TOKEN>`

**Parameters**

- groupName `<string>`

**Example Response**

Status: 200

```json
{
    "status": "success",
    "message": "Group Chat with id 1 has been deleted"
}
```

### Get Group Chat

**Endpoint**

`GET /chats/groups/:groupId`

**Headers**

- Authorization: Bearer `<JWT_TOKEN>`

**Parameters**

- groupId `<string>`

**Query**

- page=`<integer>`
- take=`<integer>`

**Example Response**

Status: 200

```json
{
    "status": "success",
    "message": "GroupChat with id 1 has been retrieved",
    "data": [
        {
            "id": 1,
            "name": "Project Team",
            "userId": 1,
            "chatType": "group",
            "createdAt": "2024-06-24T12:00:00.000Z",
            "updatedAt": "2024-06-24T12:00:00.000Z",
            "Users": [
                {
                    "id": 2,
                    "username": "user2",
                    "email": "user2@example.com"
                },
                {
                    "id": 3,
                    "username": "user3",
                    "email": "user3@example.com"
                }
            ]
        }
        // more messages...
    ]
}
```

### Send Message in Group Chat

**Endpoint**

`POST /chats/groups/:groupId/messages`

**Headers**

- Authorization: Bearer `<JWT_TOKEN>`

**Parameters**

- groupId `<string>`

**Body Parameters**

- message `<string>`
- chatType `<string>`

**Example Response**

Status: 201

```json
{
    "status": "success",
    "message": "New message has been created",
    "data": {
        "id": 10,
        "message": "Hello Team!",
        "userId": 1,
        "groupId": 1,
        "chatType": "group",
        "createdAt": "2024-06-24T12:05:00.000Z",
        "updatedAt": "2024-06-24T12:05:00.000Z"
    }
}
```