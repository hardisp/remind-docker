# Docker Basic

How to package our `Dockerfile`

```
docker build -t basic-docker .
```

Note:

> -t mean tag name
> `basic-docker` will be the repository name
> `.` is the path

## Listing Images: (all Images)

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
>
> > `Unable to find image 'ubuntu:latest' locally`

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

## Bulk Container And Image Remove

List only the all `image` IDs:

```bash
docker image ls -q
```

Remove all `image` by listed the all IDs (bulk remove):

```bash
docker image rm $(docker image ls -q)
```

> If `container` is running, you will get error.
> So you need stop and remove all `container` first

List only the all `container` IDs:

```bash
docker container ls -q
```

Remove all `container` by listed the all IDs (bulk remove):

```bash
docker container rm -f $(docker container ls -a -q)
```

> -a: will stop `container` first
> we also can shorthand it will `-aq`
> -f: force it (remove)

- [Other Ubuntu Command](./Ubuntu-Readme.md)
- [Build Image](./Building-Image.md)
- [Working with Containers](./Container.md)
