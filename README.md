# Shop API

This API allows you to create customers, adding/deleting products to their basket and create new products.

All customers actions are stored and you can access them !

## Installing the project

#### Requirements:
* MongoDB: https://docs.mongodb.com/manual/installation/
* NodeJS: https://nodejs.org/en/download/

#### Cloning from github
```git clone "https://github.com/vinceduong/API_Shop.git" && cd API_shop```

#### Create the database folder at project root directory
```mkdir mongodb-data```

### Launch a mongod instance
```mongod --dbpath ./mongodb-data```

#### Installing npm dependencies
```npm install```

#### Filling the database with some data
```npm run seed```

#### Launch the server
* Normal mode: ```npm start```
* Debug mode: ```npm run debug```

### Launch customer use case script
Having the server launched in another terminal, you can run this command: 
```npm run script```

## Postman requests example here:

Import collection from Postman, paste this link : 

```https://www.getpostman.com/collections/20e37d9851c959239113```

All endpoints have a request example !
