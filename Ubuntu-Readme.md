# Part Of Lesson Ubuntu Section


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

```
more /etc/adduser.conf
```

use `space` to ride you to the next content

**Other alternative is less, so you can scroll from mouse/trackpad**

Install less first

```
apt install less
```

To quit press `q`

**Show some line of text from the file**

- You can use `head` to show the first line from the file

```
head -n 5 /etc/adduser.conf
```

> Show first 5 line

- You can use `tail` to show the last line from the file

```
tail -n 5 /etc/adduser.conf
```

> Show last 5 line

## Redirection

We explain by example. We will read content from file1.txt and instantly copy the text to the new file call file2.txt

```
cat file1.txt > file2.txt
```