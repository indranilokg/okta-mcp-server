# Available Tools

## Application Manager
| Tool | Description |
|------|-------------|
| `create_application` | Create OIDC applications (web, SPA, native, service) with auto-configuration |
| `list_all_applications` | List all applications with filtering, search, and pagination |
| `assign_application_to_group` | Assign applications to groups with priority settings |

## Group Manager
| Tool | Description |
|------|-------------|
| `list_groups` | List groups with search, filtering, and pagination |
| `create_group` | Create a new group with name and description |
| `get_group` | Get details for a group by ID |
| `update_group` | Update a group's name or description |
| `list_group_users` | List all users in a group |
| `add_user_to_group` | Add a user to a group by user ID |
| `remove_user_from_group` | Remove a user from a group by user ID |
| `list_group_apps` | List all applications assigned to a group |

## User Manager
| Tool | Description |
|------|-------------|
| `list_users` | List users with advanced filtering, search, and activity insights |
| `create_user` | Create new users with comprehensive profile setup and validation |
| `get_user` | Get detailed user information with activity insights and status |
| `update_user` | Update user profiles with change tracking and validation |
| `activate_user` | Activate user accounts with optional email notifications |
| `deactivate_user` | Deactivate user accounts with status validation | 

## Policy Manager
| Tool | Description |
|------|-------------|
| `list_policies` | List policies in Okta. |
| `list_policy_mappings` | List all resources (applications) mapped to a policy |
| `assign_policy_to_app` | Assign a policy to an application |
| `remove_policy_mapping` | Remove/delete a policy resource mapping (unassign policy from resource) | 