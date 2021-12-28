---
slug: shell分隔符
title: Shell多个命令间隔符号;、&、&&、| 和 || 区别
tags: [Linux, shell]
---

## &

```bash
command1 & command2 & command3     # 三个命令同时执行
```

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
