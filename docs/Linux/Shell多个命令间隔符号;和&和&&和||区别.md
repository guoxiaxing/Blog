---
slug: shell分隔符
title: Shell多个命令间隔符号;、&、&&、| 和 || 区别
tags: [Linux, shell]
---

## &

```bash
command1 & command2 & command3     # 三个命令同时执行
```

用 & 连接的多个符号将同时执行，不管命令是否执行成功

单个的与符号通常可以发现在一个 bash 命令的行尾：

```bash
sleep 2 & echo mi
```

其作用是令该命令转到后台执行。对于这样的命令，系统会创建一个 sub-shell 来运行这个命令。同时，在执行改行命令的 shell 环境中，这个命令会立刻返回 0 并且继续下面的 shell 命令的执行。除此之外，在执行这个命令之后，terminal 上会输出创建的 sub-shell 的线程 ID（PID）。

```bash
[1] 77923
hh
```

注意按照这种方法分支出去的 sub-shell 的 stdout 会仍然关联到其 parent-shell，也就是说你在当前的 terminal 中仍然可以发现这个后台进程的 stdout 输出。

通过&分支出去的 sub-shell 的 PID 被存储在一个特殊的变量`$!`中，

```bash
$ echo $!
77923
```

同时，你也可以通过 `jobs` 命令来检查 sub-shell 的信息

对于 sub-shell，你可以通过`fg`命令将其拉回当前的 terminal。

如果有多个命令需要放到后台运行，可以采用如下方式：

```bash
command1 & command2 & command3 &
```

在这个例子中，三个脚本会同时开始运行，且拥有各自独立的 sub-shell 环境。在 shell 脚本中，这个方法常常被用来利用计算机的多核性能来加速执行。

> 如果你想创建个完全和当前的 shell 独立的后台进程（而不是想上面提到的用&创建的，和当前 shell 的 stdout 关联的方法），可以使用 nohup 命令。

## ;

```bash
command1; command2; command3   # 无论前面命令执行成功没有，后面的命令继续执行
```

## &&

```bash
command1 && command2    #只有前面命令执行成功，后面命令才继续执行
```

`&&` 左边的命令（命令 1）返回真(即返回 0，成功被执行）后，`&&` 右边的命令（命令 2）才能够被执行；换句话说，“如果这个命令执行成功 && 那么执行这个命令”

## |

管道符号，是 unix 一个很强大的功能,符号为一条竖线:"|"。

```bash
command 1 | command 2
```

他的功能是把第一个命令 command 1 执行的结果作为 command2 的输入传给 command 2

## ||

```bash
command1 || command2
```

`||` 则与 `&&` 相反。如果`||`左边的命令（command1）未执行成功，那么就执行`||`右边的命令（command2）；或者换句话说，“如果这个命令执行失败了 || 那么就执行这个命令”。
