# Docker Compose Example

This is more deep with docker compose

## Compose YAML File

At the begining of file you will see the version. For more about the verison you can check [here](https://docs.docker.com/compose/compose-file/compose-versioning/#compatibility-matrix).

On yaml file we add any building block, in this case we call it `services`

```yaml
services:
  frontend:
  backend:
  databases:
```

We defining various services and telling how to the docker build it. You can use any name there:

```yml
services:
  web:
  server:
  db:
```

More NOTE:

From the above we can bulk run the docker command like:

```bash
docker run server -p (for port mapping)

docker run react-app -p

...etc
```

So the docker compose will help to not do it manually

## How to build

In compose file we can tell to docker how to build it with `build` parameter in each services. And docker compose will find a DockerFile inside each path (i.e: `server` or `frontend`)

```yml
version: "3.8"

services:
  frontend:
    build: ./frontend
    ports: # Array
      - 3000:3000 # PORT_OF_HOST:PORT_OF_CONTAINER
  server:
    build: ./server
    ports: # Array
      - 3001:3001 # PORT_OF_HOST:PORT_OF_CONTAINER
    environment:
      DBL_URL: mongodb://db/dbname # in this compose we have hosts: frontend, server, db
      # - DBL_URL=mongodb://db/dbname # Another alternative use list

  db:
    image: mongo:4.0-xenial # We pull from docker hub image
    ports:
      - 27017:27017 # Mongodb default listen to port
    volumes:
      # - APPNAME:ORIGIALDATASOURCE
      - docker-compose-example:/data/db # by default mongodb put the data on /data/db, so we want to map the volume to the data directory where the data is outside of the volume

volumes:
  docker-compose-example:
```

## Run Build

To build the images we need to run build command:

```bash
docker compose build
```

> This will build the images, but if you already built it it will built from cache

To built it from fresh add flag `--no-cache`

```bash
docker compose build --no-cache
```

## Run and Stop Application

When you run the docker compose it need to use up command:

```bash
docker compose up -d
```

> I use `-d` here to run in detach mode, or it will run in the backhround

See the compose up and running:

```bash
docker compose ps
```

### Down the App

Down the application to free up the resources (but the image still there)

```bash
docker compose down
```

## Docker Networking

When we running docker compose the docker will automatically create the docker network, so the container can talk each other.
Then, when you run `docker compose up -d` you will see:

```
Network docker-compose-example_default          Created
```

Now you can run list docker network command:

```bash
docker network ls
```

You can see every docker will has `bridge`, `host`, and `none`.

On driver row you will see bridge for linux and net on windows

The network 3 host or 3 containers (The same line inside yaml file [docker-compose.yml](docker-compose.yml))

```
- frontend
- server
- db
```

So, that host/container can talk each other with their property name, let see the action:

```bash
docker ps
```

So we have mongo, server, frontend

```bash
CONTAINER ID   IMAGE                             COMMAND                  CREATED          STATUS          PORTS                      NAMES
2ce98941b9da   docker-compose-example-server     "docker-entrypoint.s…"   10 minutes ago   Up 10 minutes   0.0.0.0:3001->3001/tcp     docker-compose-example-server-1
4d08709d8f07   mongo:4.0-xenial                  "docker-entrypoint.s…"   10 minutes ago   Up 10 minutes   0.0.0.0:27017->27017/tcp   docker-compose-example-db-1
c5fa10d286b0   docker-compose-example-frontend   "docker-entrypoint.s…"   10 minutes ago   Up 10 minutes   0.0.0.0:3000->3000/tcp     docker-compose-example-frontend-1
```

So we now will run shell mode with start the interactive mode:

```bash
docker exec -it 2ce98941b9da sh # execute [ID of docker-compose-example-server] interactive mode in a shell
```

Inside the shell run ping:

```bash
/app $ ping server # ping [host/container_name]
```

if you need to in with root user do this:

```bash
docker exec -it -u root 2ce98941b9da sh # Login as root user
```

In this ping case I will explain little bit:

When you ping it the dns resolver inside the container will ask the dns server what the ip address of the `server`.

Then, to see IP address of the container yo can run `ifconfig`

```bash
/app $ ifconfig

eth0      Link encap:Ethernet  HWaddr 02:42:AC:13:00:03
          inet addr:172.19.0.3  Bcast:172.19.255.255  Mask:255.255.0.0
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:21 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0
          RX bytes:1766 (1.7 KiB)  TX bytes:0 (0.0 B)

lo        Link encap:Local Loopback
          inet addr:127.0.0.1  Mask:255.0.0.0
          UP LOOPBACK RUNNING  MTU:65536  Metric:1
          RX packets:158 errors:0 dropped:0 overruns:0 frame:0
          TX packets:158 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:8980 (8.7 KiB)  TX bytes:8980 (8.7 KiB)
```

The ip address is: inet addr:172.19.0.3

## Logs

We can see the log:

```bash
docker compose logs
```

Now, we will try to log one container, we can add container ID (in this case I want to follow frontend), also we want to follow the log since we dont have a big screen:

```bash
docker logs 1e70a47ba0fa -f
```

## Publishing changes

We don't want to rebuild our app everytime we change the code, so we will map the project directory like the `server` directory to the `app directory` inside our container. So, we need to update our `docker-compose.yml` file

```yml
...
server:
    ...
    volumes:
      - ./server:/app # We map the server directory to app inside container
```
