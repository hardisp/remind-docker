# Image and Container

We will create image and container, so I will add note to help us deep understand what it is.

## Getting Started

Before we go more far, we need to know what different bewtween Image and Container.

### Image

An image include everything an application to run.

Example it cotains:

- A cut-down OS
- Third-part libraries
- Application files
- Environment variables
- etc

So, an image contain all the files and configuration setting need to run the app. When we have it we can start a `Container` from it.

### Container

A container is like a kind of virtual machine and sense like:

- Provides an isolated environment
- Can be stopped & restarted
- Technically is just a process

The process is provided by the image

Now try to run an image with 2 different terminal.

```bash
# Terminal 1
docker run -it ubuntu
```

```bash
# Terminal 2
docker run -it ubuntu
```

Run docker ps

```bash
docker ps

# Result
CONTAINER ID   IMAGE     COMMAND       CREATED          STATUS          PORTS     NAMES
406e7c038f3c   ubuntu    "/bin/bash"   15 seconds ago   Up 14 seconds             sleepy_euler
386fb29fa7e4   ubuntu    "/bin/bash"   30 hours ago     Up 21 minutes             heuristic_ptolemy
```

You will see same image with different container id. That will make you understand it in different machine. If you want to make sure, create a folder or file in one of those, you will see that the file only visible in one place.

> In that case I want to explain that the each container is an isolated environment for excuting an application.

If you ready to send images to the container, it mean you ready dockerize application.

## Dockerization

### Create Application

We will try create the application inside the docker container, so we don't need repeation when develop an Application

### Dockerfile

Dockerfile contains instruction for building an Image.

What inside the Dockerfile

- FROM: Specifine the base image. This contains file and directory we build the top of this
- WORKDIR: Specifine the work directory. Once use this command, all the command will execute in current working directory
- COPY: To copying all file or directory
- ADD: To copying all file or directory
- RUN: To executing operating system command
- ENV: To send env variables
- EXPOSE: Telling docker that container to starting with given port
- USER: To sepecifine the user who can run the app
- CMD: To sepecifine the command to be execute
- ENTRYPOINT: To sepecifine when the command to be execute

### Do Dockerfile

Example and explaination

```dockerfile
FROM node:14.16.1-alpine3.13
```

> Use node with `alpine` bae linux because it very slim
> alpine is Linux

Try run docker build

```bash
docker build -t docker-app-react .  # build with name docker-app-react and gtell docker to find the Dockerfile in current directory (.)
```

After successfully build that image, try to list the image and run it.

```bash
docker image ls
```

```bash
docker run -it docker-app-react bash # will error
```

You will get error because alpine not come with bash by default, so try use sh

```bash
docker run -it docker-app-react sh # with shell
```

Now you will inside the container, take a look around with ls in root dir:

```bash
ls

# Result
bin    etc    lib    mnt    proc   run    srv    tmp    var
dev    home   media  opt    root   sbin   sys    usr
```

Now you need copy application file to that linux.

### Copying Files and Directory

After we have the bas application image, we need to copying the app directory and file to that image.

```dockerfile
...
COPY package*.json /app/
```

In above example we want to copy any file where start with package and end with .json into the `app` directory. If the directory doesn't exist, docker will create it.

> Please NOTE that dockerfile only have abbility copy data from inside the directory where we put that Dockerfile

```dockerfile
...
WORKDIR /app
COPY . .
```

In above example we already set current directory is `app`, so we can give instruction to docker to copy file to app with relative path (.). It mean because current directory of our work is app.

How to copy file with spacing name:

```dockerfile
WORKDIR /app
COPY ["hello world", "."]
```

Other alternative for copying file or directory is `ADD`

```dockerfile
WORKDIR /app
ADD https://webdummyis.com/file.json .
```

```dockerfile
WORKDIR /app
ADD file.zip .
```

ADD has two additional feature, we can copy file from some `url`. If you add compressed file (zip), `ADD` has feature to uncompressed it to the destiny directory.

Run docker build again and you will see the docker copying the from work directory.

And try to run it, you will see you automatically inside the `WORKDIR` which is we already set before:

```bash
docker run -it docker-app-react sh
/app # ls

Dockerfile         node_modules       package.json       src
README.md          package-lock.json  public             yarn.lock
```

Also you can see all of the file inside directory copying to the app directory. You can see node_modules also copying to that directory. So, how to exclude the file or directory? we can use .dockerfileignore

### Excluding

Sometimes we need to exclude the unnecessary directory or file so we need to ignore it. Docker has file to list what dir or file to ignore when build the application it is `.dockerignore`. It's work same as `.gitignore`

```bash
node_modules
```

### Run Command

Next we need to install project depedencies, in this case node package. So we will run npm install inside workdir:

```dockerfile
...
RUN npm install
```

You also run multiple command (Just Example)

```dockerfile
RUN npm install
RUN composer install
```

### Setting Environment Variable

```dockerfile
...
ENV API_URL=http://api.myapp.com/
```

### Exposing PORT

Exposing port to tell docker what the port we use to host this app. So when we set the host, we can tell host where to map the port to host from the container.

```dockerfile
...
EXPOSE 3000
```

### Setting the user

We can do limited user for privelage. Because we use alpine, let's try run alpine and we try add user and group

```bash
docker run -it alpine
```

We try run some user command available

```
 # adduser
BusyBox v1.35.0 (2022-11-19 10:13:10 UTC) multi-call binary.

Usage: adduser [OPTIONS] USER [GROUP]

Create new user, or add USER to GROUP

        -h DIR          Home directory
        -g GECOS        GECOS field
        -s SHELL        Login shell
        -G GRP          Group
        -S              Create a system user
        -D              Don't assign a password
        -H              Don't create home directory
        -u UID          User id
        -k SKEL         Skeleton directory (/etc/skel)
/ # addgroup app
/ # adduser -S -G app app
/ # groups app
app
```

Try with single line

```
/ # addgroup demon && adduser -S -G demon demon
/ # groups demon
demon
/ #
```

Now we implemented it on Dockerfile

```dockerfile
...
RUN addgroup app && adduser -S -G app app
USER app
```

we use `RUN` command here to create `group` and `user`, also add user to that group.
And we use `USER` command to set the user

### CMD and Entrypoint

Try run conntainer and run command npm start:

```bash
 docker run docker-app-react npm start

# snippet of result
Failed to compile.

EACCES: permission denied, mkdir '/app/node_modules/.cache'
```

You see the permission error. It's happened because the user setting is below the work dir, so we need to move it:

```dockerfile
FROM node:14.16.1-alpine3.13

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app
COPY . .

RUN npm install

ENV API_URL=http://api.myapp.com/

EXPOSE 3000
```

^ Your new `Dockerfile` content.

After you run the command `docker run docker-app-react npm start`, it will work now, but it's can't access from the host. We need do some setup for expose it later.

#### Add CMD

We won't to repeat add `npm start` at the end of the command, so we add `CMD` property to the `Dockerfile`

```dockerfile
CMD npm start
```

> We can't do multiple command, only latest command will execute if you do it

#### RUN vs CMD

Different between them is RUN will execute in build time (`docker build` command), CMD will execute on run time (`docker run` command).

#### CMD Form

CMD has 2 form:

- Shell form `CMD npm start`. In this case, docker will execute inside the separate shell (linux: /bin/sh, windows: cmd)
- Execute form `CMD ["npm", "start"]`. With this docker will execute directly. That's make more fast and easy to clean up directory when stop. So, maybe we will always use this.

#### ENTRYPOINT

Entrypoinnt is very similar with CMD, it has 2 form too. Shell form and execute form.

```dockerfile
ENTRYPOINT ["npm", "start"]
```

The different with both stuff is `CMD` can override easily, but `ENTRYPOINT` will need more effort, you need to add flag `--entrypoint` to do that.

> `CMD` can override easily, but `ENTRYPOINT` will need more effort, you need to add flag `--entrypoint` to do that.

### Speed UP Build (Optimeze)

Try checkhistory of build:

```bash
docker history docker-app-react
```

In this case we need to change the way how we copy the files into our work directory:

```dockerfile
...
WORKDIR /app

COPY package*.json .
RUN npm install
COPY . .

...
```

Why we do that? Since the docker will check line by line of the docker file instruction, we need to make sure if package not change docker will skip it, and it make the docker will skip npm install. The docker will re-use the cache.

You can try build and re-build, you will see the fastest tha before.

Now you need to understand that the stable instruction (barely changed) should be on the top and and unstable instruction (often or always need change) should be on the bottom.

```
Stable Instruction
      |
      |
      |
      |
      |
Unstable instruction (Changing)
```

### Removing images

First we will clear up unecessary image. Let's check all images:

```bash
docker images
```

^ you will see `<none>` image, you need to prune it

```bash
docker image prune
```

If you still see `<none>`, maybe it's use in stop container. So do prune container and prune the image again:

```bash
docker container prune
```

and then `docker image prune`

Now, we want to delete the specific image:

```bash
docker ls # check the image

# From above result we get the id/name
# now do delete with it

docker image rm hello-docker   # we can delete with name or id, for multiple we sparate with space.

# Multiple remove with ID for example
docker image rm 1714b54eb795 5f778ff55e52 d412ca6e0e94
```

### Taging Image

If you notice we will get the TAG. When build image it will automatically come with tag name `latest`.
You can explicit the tag name to help you on developing the app. So, you can debug what TAG/version you use when you got the error.

Give a tag when build the image:

```bash
docker build -t docker-app-react:1.0.0 .
```

Because we already built it, you will see the same id with different tag.

How to give a TAG after build:

```bash
docker image tag docker-app-react:latest docker-app-react:1 # [NAME]:[OLD_TAG] [NAME]:[NEW_TAG]
```

#### Make a small change to simulate newest version

So, fo to some file and to a small change. After done, build with added new tag/updated version

```bash
docker build -t docker-app-react:2 .
```

Now see the images with `docker images`:

```bash
REPOSITORY         TAG          IMAGE ID       CREATED             SIZE
docker-app-react   2            650359b444af   21 seconds ago      446MB
docker-app-react   1            40b9a0ea9e08   About an hour ago   446MB
docker-app-react   latest       40b9a0ea9e08   About an hour ago   446MB
ubuntu             latest       74f2314a03de   8 days ago          77.8MB
```

You can see that `TAG:latest` point to the same ID with `TAG:1`. So, we need to understand that `latest` image not reference to the latest build. Now, we need to switch the TAG and ID for the latest:

```bash
docker image tag 6503 docker-app-react:latest # use ID 650359b444af
```

If you check it again you will see it will point to the `docker-app-react:2` ID

### Sharing IMAGES

Now we will sharing the image to the docker hub.

First, tag the image with `[your_docker_username]/[image_name][:TAG]` (TAG optional, because as we know if empty it will auto tag as latest).

```bash
docker image tag 65035 hardi12/dcoker-react-app:2.0.0
```

Now see what happen:

```bash
docker images                                                        ✔  2217  13:01:49
REPOSITORY                 TAG          IMAGE ID       CREATED        SIZE
hardi12/dcoker-react-app   2.0.0        650359b444af   3 hours ago    446MB
docker-app-react           2            650359b444af   3 hours ago    446MB
docker-app-react           latest       650359b444af   3 hours ago    446MB
docker-app-react           1            40b9a0ea9e08   4 hours ago    446MB
```

Now there is 3 image with same id. All those image pointing to same image on my image.

```bash
...
docker-app-react           2            650359b444af
...
```

Now, we will try to push that image. First if you not login, try to login and then push it to the docker hub with `push` command

```bash
docker login

docker push hardi12/dcoker-react-app:2.0.0

# Docker will push each layer of image
```

### Saving and Loading Images

In this case we want copy image in this machine to other machine. So we need to compressed the image file and uncompressed to other machine.

```bash
docker image save -o docker-react-app.tar docker-app-react:3
```

^ Save image with name `docker-app-react` with TAG `3` into a file `docker-react-app.tar`

Then, you can go to finder or explorer to uncompressed it maually, and you go into that folder and will see bunc folder with mime name and contains layer file.

#### Load

We can load the image from tar, so we will load the `docker-app-react:3`. Since it's already inside the docker in this machine, we need to remove it first:

```bash
docker image rm docker-app-react:3

docker image rm 79158dab7a45 #I forget that image already to use in other TAG, so I remove it with ID
```

So, we can try to load the tar file `docker-react-app.tar`

```bash
docker image load -i docker-react-app.tar
```

When you check it, you will see the image will comes with the same tag and name.
