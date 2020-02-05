# Playground GraphQl

## Many to Many relationship

Example to relationship between posts and tags.  
A tag contains many posts.  
A post contains many tags.

## Query example
```
tags{
    name
    posts {
      id title
    }
  }
```
```
posts{
    title
    tags {
      name
    }
  }
```

## Run project

`npm install` - Install Dependencie.  
`npm start` - Running server.