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

## Pull and Run Docker image from docker hub

```
docker run ubuntu
```

note:
> Use `run` here to pull if image not available on local machine and run the image
>> `Unable to find image 'ubuntu:latest' locally`


## Start Container to Interactive

```
docker run -it ubuntu
``` 

note: 
> flag `-it` mean interactive

**Try**: 

```
echo $0
```
```
history
```
```
!2
```

Exit from bash: 
```
exit
```

## Ubuntu packages

List all available package

```
apt list
```

**At the first time run update to update package database**

```
apt update
```

## Try install package

```
apt install nano
```

## Try remove package

```
apt remove nano
```


