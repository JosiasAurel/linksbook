# LinksBook

This is the code for [linksbook](https://linksbook.me/), a bookmark manager app.

This tool aims at serving addition tools to help one in managing all of his/her bookmarks.

## Feattures

- Nested Collections (Organize your bookmarks in a way that makes sense to you. Linksbook enables you to organise your bookmarks into collections and nest them however you want.)

- Reminders (Add reminders to bookmarks so you won't forget to consult them. Send reminders to more than one person.)

- Tag & Search (Annotate, tag and search. Linksbook allows you to search through your entire set of bookmarks easily via tags and text search.)

- Drag-n-Drop, Notes (Freely throw bookmarks into various folders via drag-n-drop. Add short notes on bookmarks so you won't have to revisit links evertime.)

- Custom Themes (Dark, Light, Blurred Gradients anc Custom background images. Make your workspace fit your style.)

- Share Collections (Share your carefully created collections with the public easily.)

## Tech User

- Frontend

  - Next.js
  - Apollo Client
  - GraphQL
  - React
  - TypeScript

- Backend

  - Service
    - TypeScript
    - Express
    - GraphQL
    - Apollo Server
    - Deta
  - Authentication

    - Python
    - FastAPI
    - Deta
    - SendGrid

  - Reminders & Scraping
    - FastAPI
    - Python
    - Requests
    - Deta

## Installation

Create an account on [Deta](https://www.deta.sh/) and then create a new project. Make sure to save the project keys somewhere safe.

Clone the respository

```shell
https://github.com/JosiasAurel/linksbook.git
```

Move to the client folder and install dependencies

```shell
cd client
yarn install
```

Move to the website folder and install dependencies

```shell
cd web
yarn install
```

Move to `auth` folder and install dependencies

```shell
cd web
pip install -r requirements.txt
```

do same for `api` and `reminder-cron`

## API

In the `api` project folder, create a `.env` file with the following credentials

```env
PROJECT_KEY=<YOUR_DETA_PROJECT_KEY>
GUMROAD_APP_ACCESS_TOKEN=<GUMROAD_ACCESS_TOKEN>
```

## Auth

In the `auth` project folder, create a `.env` file with the following credentials

```env

SECRET=<SECRET_KEY>
DETA_BASE_KEY=<DETA_PROJECT_KEY>
MAIL_PASSWORD=<PASSWORD_OF_MAIL_ACCOUNT>
SENDGRID_API_KEY=<YOUR_SENDGRID_API_KEY>
```

## Client

In the `client` project folder, create a `.env` file with the following credentials

```shell
NEXT_PUBLIC_AUTH_SERVICE=<URI_OF_AUTH_SERVICE>
NEXT_PUBLIC_PROJECT_KEY=<DETA_PROJECT_KEY>
NEXT_PUBLIC_SERVER_URI=<URI_OF_SERVICE>
NEXT_PUBLIC_API_SERVICE=<URI_OF_API_SERVICE>
```

## reminder-cron

In the `reminder-cron` project folder, create a `.env` file with the following credentials

```shell

SENDGRID_MAIL_API_KEY=<YOUR_SENDGRID_API_KEY>
DETA_PROJECT_KEY=<DETA_PROJECT_KEY>
```

## Server

In the `server` project folder, create a `.env` file with the following credentials

```shell
API_SERVICE_URL=<URI_OF_API_SERVICE>
SECRET=<SECRET_KEY> (Should be same as that of auth service)
```

- If you have installed all dependencies, and setup all environment variables, you can start the client with `yarn start`

- If you are running locally, make sure you have ts-node installed.
  Run the server with `ts-node index.ts`

- Start the auth service with `uvicorn main:app --reload`

If all goes well, then navigate to [localhost:3000](http://localhost:3000) and it should work fine.
