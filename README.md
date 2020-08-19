# TodoAPI

A simple REST API based on Node.js to manage a todo list application.

## Requirement

To run this API locally you need :

**Node.js** and **NPM**

Available on https://nodejs.org/.
To update NPM:

```sh
npm install --global npm
```

**MongoDB**

Available on https://www.mongodb.com/try/download/community.

## Use

To run the API, open a terminal at the root project. To install all the dependencies :

```sh
npm install
```

or

```sh
yarn install
```

Then, run mongoDB.
Now you can run the API by running the command :

```sh
npm start
```

## Endpoints

> Base URL for all endpoints `http://localhost:8080/

### /todo

`GET /todo`

return the list of all the task.

`GET /todo/:id`

return the task with the id in the url.
return null if there is no task with this id.

`POST /todo`

create a new task.

**Query parameters**

| Parameter | Type    | Default | Description           |
| --------- | ------- | ------- | --------------------- |
| title     | String  | ''      | The name of the task  |
| completed | Boolean | false   | The state of the task |

`PATCH /todo/:id`

Edit the task with the id in the url.

**Query parameters**

| Parameter | Type    | Default | Description           |
| --------- | ------- | ------- | --------------------- |
| title     | String  | ''      | The name of the task  |
| completed | Boolean | false   | The state of the task |

`DELETE /todo`

delete all the tasks of the todo list.

`DELETE /todo/:id`

delete the task with the id in the url.

### /todo/completed

`GET /todo/completed`

return the list of all the tasks where `"completed": true`.

### todo/tocomplete

`GET /todo/tocomplete`

return the list of all the tasks where `"completed": false`.

## Model

**Todo** A task of the todo list

`{ "_id": "5f3d869ae604415e7872969d", "title": "Manger", "completed": false}`
