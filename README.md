# Nexlink Backend API


## Endpoint
Default Url: `"coming soon"`

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
| `/projects/{id}/users` | POST | Add users to a project |
| `/projects/{id}/users/{userID}` | DELETE | Remove a user from a project |
| Task Endpoints |
| -- | -- | -- |
| `/tasks` | GET | Get all tasks |
| `/tasks` | POST | Create a new task |
| `/tasks/{id}` | GET | Get a specific task by id |
| `/tasks/{id}` | PUT | Update a specific task by id |
| `/tasks/{id}` | DELETE | Delete a specific task by id |
| `/tasks/project/:projectId` | GET | Get tasks for a specific project |
| `/tasks/user/:userId` | GET | Get tasks assigned to a specific user |
| Schedule Endpoints |
| -- | -- | -- |
| `/projects/:projectId/generate-schedule` | POST | Create a schedule for a specific project|
| `/projects/:projectId/update-schedule` | PUT | Update a schedule for a specific project|

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
        "token": "JWT_TOKEN"
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
    "message": "Users retrieved successfully",
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

### GET User

**Endpoint**

`GET /users/:id`

**Headers**

- Authorization: Bearer: `<JWT_TOKEN>`
- Content-Type: `<application/json>`

**Path Parameters**

- id: `<integer>`

**Body Parameters**

- username: `<string>`
- email: `<string>`
- password: `<string>`
- fullName: `<string>`

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

`POST /projects/:id/users`

**Headers**

- Authorization: Bearer `<JWT_TOKEN>`
- Content-Type: `<application/json>`

**Path  Parameters**

- id: `<integer>`

**Body Parameters**

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

**Body Parameters**

- page: `<add>`

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

### Generate Schedule

**Endpoint**

`POST /projects/:projectId/generate-schedule`

**Headers**

- Authorization: Bearer `<JWT_TOKEN>`
- Content-Type: `<application/json>`

**Path Parameters**

- projectId: `<integer>`

**Example Response**

Status: 200

```json
{
    "status": "success",
    "message": "Schedule generated successfully",
    "data": {
        "schedule": [
            {
                "taskId": 1,
                "startDate": "2024-05-25T00:00:00.000Z",
                "endDate": "2024-05-30T00:00:00.000Z"
            }
            // more scheduled tasks...
        ]
    }
}
```

### Update Schedule

**Endpoint**

`PUT /projects/:projectId/update-schedule`

**Headers**

- Authorization: Bearer `<JWT_TOKEN>`
- Content-Type: `<application/json>`

**Path Parameters**

- projectId: `<integer>`

**Body Parameters**

- schedule: `<string>`
- taskId: `<integer>`
- startDate: `<string, date-time>`
- endDate: `<string, date-time>`

**Example Response**

Status: 

```json
{
    "status": "success",
    "message": "Schedule updated successfully",
    "data": {
        "updatedSchedule": [
            {
                "taskId": 1,
                "startDate": "2024-05-25T00:00:00.000Z",
                "endDate": "2024-05-30T00:00:00.000Z"
            }
            // more updated tasks...
        ]
    }
}

```
