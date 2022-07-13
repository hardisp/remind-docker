# Docker Basic 

How to package our `Dockerfile`

```
docker build -t basic-docker . 
```
Note: 
> -t mean tag name
> `basic-docker` will be the repository name
> `.` is the path

## Listing Images:  (all Images)

```
docker image ls

REPOSITORY           TAG       IMAGE ID       CREATED       SIZE  
basic-docker         latest    b825e5de788c   5 days ago    174MB
```

## Run Our Image

```
docker run basic-docker
```



