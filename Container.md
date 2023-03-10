# Building Cotainer

We check the current container with `docker ps`. Why ps (process), because container is a process.

## Starting with Container

If you don't do this before, please do:

Build some image to use in this lesson. In this case I will build the frontend with name `docker-react-app`

```bash
docker build -t docker-react-app .
```

> Anything about image please take a look on [here](./Building-Image.md)

Now we will try run docker container with `docker-react-app` image.

```bash
docker run -d docker-react-app # -d: detach mode, run it in the background
```

Run `docker ps` and you will see it's running in a process, and you also see a names. That name given by docker randomly!
So, we can naming the container:

```bash
docker run -d --name blue-wave docker-react-app
```

### Viewing The Log

When run detach mode we can't see the log, so here the way:

```bash
docker ps

# Result will shoing up
# Use the ID to logs

docker logs 974999e7ecc5
```

- If you need to follow the logs you add options `-f` (Follow)
- Use option `-n` to see the last of `n` log, i.e.: `-n 5`
- More just use --help to see it

```bash
docker logs -f 974999e7ecc5
```

## Publishing PORT

As you know, for now we can't access the app on localhost / outside of the container. It's because current for still publishing inside the container not on the host. It's mean the host not listening for that port. When you call `ps` command you will see the PORTS column.

```bash
docker ps

# Result
CONTAINER ID   IMAGE              COMMAND                  CREATED       STATUS       PORTS      NAMES
974999e7ecc5   docker-react-app   "docker-entrypoint.s…"   3 hours ago   Up 3 hours   3000/tcp   blue-wave
```

```bash
docker run -d -p 3001:3000 --name c1 docker-react-app # Mapping [HOST]:[CONTAINER_PORT] identify name is c1

# check it
docker ps

# Result
CONTAINER ID   IMAGE              COMMAND                  CREATED         STATUS         PORTS                    NAMES
0d9d224587eb   docker-react-app   "docker-entrypoint.s…"   4 seconds ago   Up 3 seconds   0.0.0.0:3001->3000/tcp   c1
```

You will see it? PORT 3001 on host will map to the PORT 3000 on the container. Just try check it on browser with [http://localhost:3001](http://localhost:3001).

### Executing Command on Running Container

We will executing command later after the container is run. Maybe this will help you on trouble shooting problems or debugging.
In docker command we have 2 execute command:

- `docker run`: Start new container and running command
- `docker exec`: Execute the command and running container

Now we will try use exec, we use the running container as we given name before c1:

```bash
docker exec c1 ls # Try with ls (linux command) to list the file inside work dir
```

If we need ionteraction in container we can use `-it` option and tell what we will run

```bash
docker exec -it c1 sh
```

So we use `exec` command to running any command in running `container`.

### Stoping and Start Container

Simply way to stop is with `stop` command:

```bash
docker stop c1 # Stop Container with name c1
```

To start it, just simply use start command

```bash
docker start c1 # Start Container with name c1
```

Different between `start` and `run` is with run we start the new container, with start we start the stopped container.

> Use docker ps to check the docker container `NAMES`

### Removing Container

There is 2 way to remove container

```bash
docker container rm [CONTAINER_NAMES]

# OR

docker rm [CONTAINER_NAME]
```

If the container is still running you will get error, so you can `stop` it first or remove with `-f` option to force it.

Check it and you will not see `c1` listed.

In some cases, maybe you already have so many container you can use `grep` to filter what container we want to llok only:

```bash
docker ps -a | grep c1

docker ps -a | grep blue-wave
```

ALSO: there is `prune` command to remove stopped container:

```bash
docker container prune
```

### Containers File System

When you go to one container and create file inside it, and when you go to othe container you will not see that file. That's how the container file system work.

### Persisting Date using Volumes

Volumes is a storage outside of the container, it can be directory on host or somewhere on cloud.

```bash
docker volume # to know the volume full command
```

Let's create a new volume

```bash
docker volume create app-data # create [VOLUME_NAME_YOU_WANTED]
```

Inspect it

```bash
docker volume inspect app-data

[
    {
        "CreatedAt": "2023-03-10T09:30:25Z",
        "Driver": "local",
        "Labels": {},
        "Mountpoint": "/var/lib/docker/volumes/app-data/_data", # this is where the directory threated in the host (your machine / cloud)
        "Name": "app-data",
        "Options": {},
        "Scope": "local"
    }
]
```

In mac why it's `/var/lib/docker/volumes/`, because docker run inside of lighweight virtual machine. This will not exist in your mac.

So now we try to run the container from the new volume as we created before:

```bash
docker run -d -p 4000:3000 -v app-data:/app/data docker-react-app
acd4fbec540bab214c6df7df77ca5ae080099bdaa0f147e7e0b1a482828a4900
```

Tbh, if volume not yet created, it will automatically create when that run exuted. And now, let's try execute that docker container:

```bash
docker exec -it acd4 sh
```

Try go to `data` directory and create a file:

```bash
cd data
echo data > data.txt

# Result
/app/data $ echo data > data.txt
sh: can't create data.txt: Permission denied
```

Denied? please check the permission:

```bash
cd ..
ls -l

#result
...
drwxr-xr-x    2 root     root          4096 Mar 10 09:30 data
drwxr-xr-x    1 app      app           4096 Mar 10 09:37 node_modules
...
```

`d(rwx)r-xr-x` > you can see that owner (root) only has permission to write for that directory.
`app` user has full permission only for node_modules

> If you forget why we login as app user please check the dockerfile, we already define/set app as user there.

So, we need to go to [Dokcerfile](./frontend/Dockerfile) and update it:

```dockerfile
...
RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app

# Put RUN make dir after set user to make that user as directory owner
RUN mkdir data
```

Now we need to rebuild the images and then run the container then:

```bash
docker build -t docker-react-app  .
```

```bash
docker run -d -p 3001:3000 -v app-data:/app/data docker-react-app
b671e18af7b050950814af00c2404c1d231b043dbc0c4f67acc2882204750cc2

# lets run shell session
docker exec -it b671e sh
```

I guarantee you now can create file inside the `data` folder.

Now, if we delete the container, that file will not deleted because that file now store in the host. Try it!

```bash
docker rm b671e18af7b0 -f
```

Now try run the container with the same volume map:

```bash
docker run -d -p 3001:3000 -v app-data:/app/data docker-react-app
08fdb311c9997015f41708ec0c93a73474f7b4143ca4055aaac69bced32b46cf

docker exec -it 08fdb sh

# Check the file inside data folder
/app $ cd data
/app/data $ ls
data.txt
/app/data $
```

Look the data still there, it's persist data!

## Copying Data Between Host and Containers

We can copy the file from the container into the host (machine).

```bash
docker exec -it 08fdb sh  # We run available container in interactive mode

# inside shell
/app $ echo hello > hello.txt # create a file
/app $ exit

# Run copy
docker cp 08fdb311c999:/app/hello.txt . # copy from [Container_ID:/workdir/file_tocopy] [. (current host directory)]
```

Now we do the vice versa:

```bash
# Create a file in host (machine)
echo hello > secret.txt

# copy to the container
docker cp secret.txt 08fdb311c999:/app

# Execute shell
docker exec -it 08fdb sh

# list the file
app $ ls

# Result
Dockerfile         data               node_modules       package.json       secret.txt         yarn.lock
README.md          hello.txt          package-lock.json  public             src
/app $
```
