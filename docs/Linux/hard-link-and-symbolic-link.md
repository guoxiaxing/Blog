---
slug: hard-link-and-symbolic-link
title: 硬链接和符号链接
tags: [Linux相关]
---

## Linux 的链接概念

Linux 链接分两种，一种被称为硬链接（Hard Link），另一种被称为符号链接（Symbolic Link）。默认情况下，ln 命令产生硬链接。

通俗一点理解，可以把硬链接当成源文件的副本，他和源文件一样的大小但是事实上却不占任何空间。
符号链接可以理解为类似 windows 一样的快捷方式。

## 硬链接

硬连接指通过索引节点来进行连接。
在 Linux 的文件系统中，保存在磁盘分区中的文件不管是什么类型都给它分配一个编号，称为索引节点号(Inode Index)。
在 Linux 中，多个文件名指向同一索引节点是存在的。一般这种连接就是硬连接。
硬连接的作用是允许一个文件拥有多个有效路径名，这样用户就可以建立硬连接到重要文件，以防止“误删”的功能。其原因如上所述，因为对应该目录的索引节点有一个以上的连接。只删除一个连接并不影响索引节点本身和其它的连接，只有当最后一个连接被删除后，文件的数据块及目录的连接才会被释放。也就是说，文件真正删除的条件是与之相关的所有硬连接文件均被删除。

```bash
ln existfile  newfile # 创建硬链接
```

硬链接文件有两个限制

- 不允许给目录创建硬链接
- 只允许在同一文件系统中的文件之间才能创建链接

对于硬链接文件进行读写和删除操作的时候，结果和符号链接相同。但是如果我们删除硬链接文件的源文件，硬链接文件仍存在，而且保留了原有的内容。

## 符号链接

另外一种连接称之为符号连接（Symbolic Link），也叫软连接。软链接文件有类似于 Windows 的快捷方式。它实际上是一个特殊的文件。在符号连接中，文件实际上是一个文本文件，这个文件包含了另一个文件的路径名。
可以是任意文件或目录，也可以链接不同文件系统的文件。甚至可以链接不存在的文件，这就产生一般称为“断裂”的问题（现象），还可以不断的循环链接自己。
在对符号链接进行读写操作的时候，系统会自动把该操作转换为对源文件的操作。但是删除链接文件时，系统仅仅删除符号链接文件，而不删除源文件本身。

```bash
ln -s source_file  softlink_file # 创建符号链接
```

## 实验一下

```bash
$ touch f1          #创建一个测试文件f1
$ ln f1 f2          #创建f1的一个硬连接文件f2
$ ln -s f1 f3       #创建f1的一个符号连接文件f3
$ ls -li            # -i参数显示文件的inode节点信息
total 0
7722708 -rw-r--r--  2 oracle oinstall 0 Apr 21 08:11 f1
7722708 -rw-r--r--  2 oracle oinstall 0 Apr 21 08:11 f2
7722757 lrwxrwxrwx  1 oracle oinstall 2 Apr 21 08:11 f3 -> f1
```

从上面的结果中可以看出，硬连接文件 f2 与原文件 f1 的 inode 节点相同，均为 7722708，然而符号连接文件的 inode 节点不同。

```text
$ echo "I am f1 file" >>f1
$ cat f1
I am f1 file
$ cat f2
I am f1 file
$ cat f3
I am f1 file
$ rm -f f1
$ cat f2
I am f1 file
cat f3
cat: f3: No such file or directory
```

通过上面的测试可以看出：当删除原始文件 f1 后，硬连接 f2 不受影响，但是符号连接 f1 文件无效

## 硬链接和符号链接的区别

- 硬链接仅能链接文件，而符号链接可以链接目录
- 硬链接在链接完成后仅和文件内容关联，和之前链接的文件没有任何关系。而符号链接始终和之前链接的文件关联，和文件内容不直接相关。

## 总结

- 删除符号连接 f3,对 f1,f2 无影响；

- 删除硬连接 f2，对 f1,f3 也无影响；

- 删除原文件 f1，对硬连接 f2 没有影响，导致符号连接 f3 失效；

- 同时删除原文件 f1,硬连接 f2，整个文件会真正的被删除。

符号链接（symbolic link）在建立的时候建立了一个新的 inode，并记录了指向源文件 inode 的路径。所以 symbolic 的 inode number 跟原始档案的 inode number 是不一样的。这也是为什么 symbolic link 能够跨越不同文件系统的原因。
符号链接建立了新的 inode number，所以它是一个真实的文件并占有一定的磁盘空间。另外对 symbolic link 的操作除了删除都会直接对源文件进行操作。

hard link 的 inode number 跟源文件的 inode number 是一样的。因为一个文件系统有着相同的 inode number，所以 hard link 是不可以跨文件系统创建的。也可以将 hard link 理解为不是一个文件，把它看成是同一个 inode 的别名，建立 hard link 后他和源文件互为别名，删除其中任何一个，inode 都不会释放。只有指向同一 inode 的文件名都删除后，inode 才释放。hard link 实际上是不占空间的。
