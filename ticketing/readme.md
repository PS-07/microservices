# Ticketing App

## Boilerplate

    In auth folder
        npm init -y
        npm install typescript ts-node-dev express @types/express
        tsc --init
        In 'package.json' file, edit "scripts" tag to look like:
            "scripts": {
                "start": "ts-node-dev --poll src/index.ts"
            }
        docker build -t ps07/auth .
        minikube start
        skaffold dev
        Goto ticketing.dev/api/users/currentuser
        To remove 'Your connection is not private' error,
        click anywhere on the page and type 'thisisunsafe'
        npm install express-validator
        npm install express-async-errors
        npm install mongoose
        npm install @types/mongoose
