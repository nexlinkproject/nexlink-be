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
| User Endpoints |
| -- | -- | -- |
| `/users/profile` | PUT | Update user profile |
| `/users/profile` | GET | Get user profile |
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
| `/tasks/{id}` | DELET | Delete a specific task by id |
| `/projects/{projectID}/tasks` | GET | Get tasks for a specific project |
| `/users/{userId}/tasks` | GET | Get tasks assigned to a specific user |
| Schedule Endpoints |
| -- | -- | -- |
| `/projects/{projectId}/schedule` | POST | Create a schedule for a specific project|
| `/projects/{projectId}/schedule` | PUT | Update a schedule for a specific project|
