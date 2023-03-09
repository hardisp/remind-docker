# Part Of Lesson Ubuntu Section

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

> flag `-it` mean `interactive`

**Try**:

Show the bash location:

```
echo $0
```

Show history command:

```
history
```

Show history command (last 2):

```
!2
```

Exit from bash:

```
exit
```

## Ubuntu packages

In ubuntu we has package manager call `apt`. You can run `apt` in command line to see all command available:

```
apt
```

> apt = Advanced Package Tools

I.E. to list all available package you can use command bellow:

```
apt list
```

**At the first time run update to update package database**

```
apt update
```

## Try Install Package

In this example we will install nano:

```
apt install nano
```

## Linux File System

Navigate linux file system

Try to get the current working directory:

```
pwd
```

> PWD = print working directory

### LS command

to list directory yo can use `ls`

```
ls
```

to show 1 item per line:

```
ls -1
```

To show long listing use (-l flag):

```
ls -l
```

To show listing inside directory (example `bin` directory):

```
ls bin
```

to change directory

```
cd etc
cd /bin/bash
```

> path in linux:
> if prefix without forward slash it mean relative path (i.e: bin)
> if prefix with forward slash it mean absolute path. It's mean start from root dir (i.e: /bin/bash)

You can go to the `/home` directory using tilde:

```
cd ~
```

### Play inside directory

Create a directory inside a home. First go to home directory and and make directory:

```
cd home && mkdir test
```

Rename or move:

```
mv test docker
```

Create file inside it

```
touch file1.txt file2.txt file3.txt
```

Remove all file contains `file` in front of the name of file:

```
rm file*
```

Remove directory should use recursive (-r flag):

```
rm -rf docker
```

### CAT Command

Concatenation use `cat`

For example first create file with nano and cat it:

```
nano file1.txt
```

Write down the some dummy text and then use `control ^+X` to exit, use `Y` to confirm and press `enter/return` then.

Now run cat:

```
cat file1.txt
```

### Command to read long text inside a file

If us `cat` it will look so messy, then you can use `more`

```bash
more /etc/adduser.conf
```

use `space` to ride you to the next content

**Other alternative is less, so you can scroll from mouse/trackpad**

Install less first

```bash
apt install less
```

To quit press `q`

**Show some line of text from the file**

- You can use `head` to show the first line from the file

```bash
head -n 5 /etc/adduser.conf
```

> Show first 5 line

- You can use `tail` to show the last line from the file

```bash
tail -n 5 /etc/adduser.conf
```

> Show last 5 line

## Redirection

We explain by example. We will read content from file1.txt and `instantly copy` the text to the new file call file2.txt

```bash
cat file1.txt > file2.txt
```

We can `combined` two or more file `into 1 file`:

```
cat file1.txt file2.txt > combined.txt
```

## Searching for text

How we're searching text in file.

```bash
grep hello file1.txt # case sensitive
```

> If you want to remove case sensitive you can add `-i`

```bash
grep -i hello file1.txt # case sensitive
```

```bash
grep -i root /etc/passwd
```

We can do bulk search

```bash
grep -i hello file*
```

Search in a directory

```bash
grep -i -r hello .
```

> Use `-r` which is mean recursive
> We can short it with `-ir`, because in linux we can combine multiple option

```bash
grep -ir hello .
```

## Finding Files and Directory

```bash
find
```

^ It will search anytihing with no specific

> Find also will showing the hidden file/folder
> to test you can create one, i.e.: `.profile`

```bash
find -type d # search only directory
```

```bash
find -type f -name "f*" # find type file where name with whildcard with prefix f (case sensitive)
find -type f -iname "f*" # find type file where name with whildcard with prefix f with i option (no case sensitive)
```

```bash
find / -type f -name "*.txt" # find file in root directory wher the file has extention txt
find / -type f -name "*.txt" > result.log # find file in root directory wher the file has extention txt and write to result.log file
```

## Chainning Command

Maybe we want to do multiple command:

```bash
mkdir test; cd test; echo done
```

If the folder is exist, it will error but the 2nd and 3rd command will still executing.
If we need to avoid the other executed, we can use `AND` operator:

```bash
mkdir test && cd test; echo test
```

> after error the other command will abort or not continue to execute

```bash
mkdir test || echo "Test directory already exists"
```

> OR (||) operator will let you do something if condition aborted

### Pipe Command

In another why to chainning command is Pipeing

```bash
ls /bin | less # | mean pipe
```

> Maybe you need install `less` first with `apt install less`

### Multiple line

We can use `\` to create break line

```bash
mkdir hello;\
cd hello;\
echo done
```

## Environment Variable

```bash
printenv
```

```bash
printenv PATH # show value from environment variable
echo $PATH # show value from environment variable. with echo we need add $ sign
```

### Manipulate variable

Add new varibale using `export` command:

```bash
export DB_USER=jiks

# Check it with print / echo
printenv DB_USER
echo $DB_USER
```

> It will oly add in terminal session
> It's mean if you close the terminal it will gone
> try it with type command `exit`

Now, run `docker ps -a`, on that list copy ID of `ubuntu` image and start docker with it:

```bash
docker start -i 386fb29fa7e4
```

Run the echo or print again, it will prinyt nothing

Go to the top of root dir:

```bash
cd ~
```

And look at `.bashrc` file. So, edit it with editor (i.e.: nano) or use echo with double arrow.

```bash
echo DB_USER=jiks >> .bashrc
```

> !!! Don't do THISS !!!
> `echo DB_USER=jiks > .bashrc`
> That will change entire file

Cek with cat

```bash
cat .bashrc
```

After you add it you can re-run interactive mode with exit first and docker run or use source command

```bash
source ~/.bashrc # can avoid ~/ if you already in top root directory
```

## Managing Process

See the process with `ps` command:

```bash
ps

#result
PID TTY          TIME CMD
    1 pts/0    00:00:00 bash
   17 pts/0    00:00:00 ps
```

^ On above snippet we can see two process was run, bash and ps

> bash is short for Bourne shell. It's program interactive to take the command and send to linux to execution.

> NOTE:
>
> > PID is unique ID, generated by system
> >
> > TTY is Teletype (User terminal is use for login to)
> >
> > TIME is showing exucution time

Let's try run sleep command and execute in the background:

```bash
sleep 100 &
[1] 22
root@386fb29fa7e4:/# ps
  PID TTY          TIME CMD
    1 pts/0    00:00:00 bash
   22 pts/0    00:00:00 sleep
   23 pts/0    00:00:00 ps
root@386fb29fa7e4:/# kill 22 # Kill process with ID 22
root@386fb29fa7e4:/# ps
  PID TTY          TIME CMD
    1 pts/0    00:00:00 bash
   24 pts/0    00:00:00 ps
[1]+  Terminated              sleep 100
root@386fb29fa7e4:/#
```

## Managing Users

command:
useradd: to add user
usermod: to modify use
userdel: to delete the user

### Add User

```bash
useradd -m john # -m or --create-home create the user's home directory
```

^ the user will add and we can check:

```bash
cat ~/etc/passwd

# Result:
john:x:1000:1000::/home/john:/bin/sh
```

^ We have a string separated with colon (:), where

> john is username
> x is password put in somewhere
> 1000 is userID
> 1000 is GroupID
> /home/john is home dir of the user
> /bin/sh is shell program use when the user is login

### Modify user

Ler's modify the created user

```bash
usermod -s /bin/bash john # -s or --shell: SHELL new login shell for the user account
```

> modify user with username john to use shell in /bin/bash

Chekck it

```bash
cat /etc/passwd
```

#### Where the password?

List the password and you will se it in encrypted format

```bash
cat /etc/shadow
```

> it's only visible for root user

Now how you login with the `john` user?

```bash
docker ps
```

Copy ubuntu id and run execute docker command:

```bash
docker exec -it -u john 386fb29fa7e4 bash
john@386fb29fa7e4:/$
```

If yopu can see john has dollar sign ($) and root has a hash sighn (#)

Go to the home directory and print pwd to look the dir path

```bash
cd ~
pwd
```

#### Alternative add command

In other hand there is other command to add user, it is `adduser`
This command will more interactive, but often to use.

### Managing Group

groupadd use to execute this

```bash
groupadd developers
```

Where it is, it in /etc/group, check it

```bash
cat /etc/group

# Result
# ...
developers:x:1001:

# 1001 is ID of the group
```

Add `john` to the group. Before do that let me explain the group detail:

> Every linux user has 1 primary group and 0 or more than 1 supplementary group. The primary group is automatically created when we add the user.

```bash
usermod -G developers john

# Check it
cat /etc/passwd | grep john

# Short way
grep john /etc/passwd

groups john # check john's group
```

## File Permission

We will try create a file, with give it permission.

First go to home directory and then create a `sh` file.

```bash
echo echo hello > deploy.sh

# check it
cat deploy.sh
echo hello # result
```

```bash
ls -l # full list data

# Result
-rw-r--r-- 1 root root   11 Mar  9 04:23 deploy.sh
drwxr-x--- 2 john john 4096 Mar  8 05:31 john
```

in the firs letter we will see permission

Explaiantion :

```
first letter (d, -)
 d: Directory
 -: A file

other letter:
It dived by 3 groups
-(rw-)(r--)(r--)
d(rwx)(r-x)(---)

r: read
w: write
x: execute

if (-) it's mean don't have permission for it

Now, so what mean for each group:
- first group is mean for user who create that file
- second group is permission for group who own that's file
- third gropu is permission for anyone else
```

Now try excute the sh file (deploy.sh)

```bash
/home# ./deploy.sh
bash: ./deploy.sh: Permission denied
```

You got error because you don't have permission for execute it

> -(rw-)r--r-- 1 root root 11 Mar 9 04:23 deploy.sh

Now, try change the permisiion for the user (u), group (g), or other(o).

```bash
chmod u+x deploy.sh # Add permission to execute for user (u). To remove use -

# check the update
ls -l
-rwxr--r-- 1 root root   11 Mar  9 04:23 deploy.sh
```

It's been changed: -rw`x`r--r--

Try it

```bash
./deploy.sh

# Result
hello
```

How to add bulk permission?

```bash
chmod og+x+w-r *.sh
```

It will update permission for other and group. In that case we add permission to execute and write, and remove permission for read.

\*.sh mean it will apply to all file with sh extention
