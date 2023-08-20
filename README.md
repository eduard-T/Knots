# Knots - Goal Manager

A goal management app that allows users to set and manage their tasks. Once registered, a user can create, modify, and delete goals tied to their account. Users' accounts can be modified or deleted through a profile screen.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup](#setup)
- [Upcoming Features](#upcoming-features)
- [Contact](#contact)

## Technologies Used

Goal Tracker was built using [Node v20.1.0] and uses the following technologies:

- React - v18.2.0
- Express - v4.18.2
- npm - v9.6.4

## Features

- Fully responsive and minimalist UI design
- Users can register and have their sensitive information encrypted
- Goals can be created, modified, and deleted
- Users can track their total goals on a profile tab, where they can also edit their information
- When a user deleted their account, all goals tied to their account are also destroyed

## Setup

Follow the steps below to get started with this project's development environment:

1. Install the latest version of npm

```
$ npm install -g npm
```

2. Install [Node 20.1.0](https://nodejs.org/en/download/)

3. Clone this repository and navigate into it

```
$ git clone https://github.com/Shmedi/Goal-Tracker.git
$ git cd Goal-Tracker
```

4. Install the project's dependencies

```
$ npm install
```

5. Start the API server

```
$ npm run dev
```

6. You should see the following after `npm start`

```
API running at PORT: 4000
```

7. Open a separate window in your terminal and navigate to the client

```
$ cd Goal-Tracker/client
```

8. Install the dependencies

```
$ npm install
```

9. Start the application

```
$ npm start
```

You're ready to start managing your goals! :hushed::ok_hand:

> Please note that you will need a local PostgreSQL database for the API to write to

## Upcoming Features

- Email & password modification :pencil:
- Password reset :lock:

## Contact

Created by [@eduard-T](https://eduardtupy.co/) - Visit my portfolio!
