---
slug: tcp-sticky-package-and-unpacking
title: tcp的粘包拆包及其解决方式
tags: [tcp, 粘包, 拆包]
---

## 什么是粘包拆包？

假设客户端向服务端连续发送了两个数据包，用 packet1 和 packet2 来表示，那么服务端收到的数据可以分为三种，现列举如下

- 第一种：服务端正常接收到这两个数据包 package1 和 package2，即没有发生拆包和粘包
- 第二种：接收端只接收到一个包，由于tcp不会出现丢包的现象。所以这一个数据包中包含了发送端发送的两个数据包的信息，这种现象即为粘包。这种情况由于接收端不知道这两个数据包的界限，所以对于接收端来说很难处理。
- 第三种：这种情况有两种表现形式，接收端收到了两个数据包，但是这两个数据包要么是不完整的，要么就是多出来一块，这种情况即发生了拆包和粘包。（package1不完整，package2多了package1一部分；package1多了package2的一部分，package2不完整）


## 为什么会发生tcp粘包拆包？



- 滑动窗口

- MTU/MSS限制

- Nagle算法


### MTU/MSS限制

:::info

当需要传输的数据大于MSS或者MTU时，数据会被拆分成多个包进行传输。由于MSS是根据MTU计算出来的，因此当发送的数据满足MSS时，必然满足MTU。

MTU是以太网(数据链路层)传输数据方面的限制

由于MTU限制了一次最多可以发送1500个字节，而TCP协议在发送DATA时，还会加上额外的TCP Header和Ip Header，因此刨去这两个部分，就是TCP协议一次可以发送的实际应用数据的最大大小，也就是MSS。

MSS长度=MTU长度-IP Header-TCP Header

TCP Header的长度是20字节，IPv4中IP Header长度是20字节，IPV6中IP Header长度是40字节，因此：在IPV4中，以太网MSS可以达到1460byte；在IPV6中，以太网MSS可以达到1440byte。

需要注意的是MSS表示的一次可以发送的DATA的最大长度，而不是DATA的真实长度。发送方发送数据时，当数据量大于MSS时，操作系统会将数据进行拆分，使得每一部分都小于MSS，这就是拆包，然后每一部分都加上TCP Header，构成多个完整的TCP报文进行发送，当然经过网络层和数据链路层的时候，还会分别加上相应的内容。

:::

### 滑动窗口

:::info

TCP流量控制主要使用滑动窗口协议，滑动窗口是接收端使用的窗口大小，用来告诉发送端接收端的缓存大小，以此可以控制发送端发送数据的大小，从而达到流量控制的目的。这个窗口大小就是我们一次传输几个数据。对所有数据帧按顺序赋予编号，发送方在发送过程中始终保持着一个发送窗口，只有落在发送窗口内的帧才允许被发送；同时接收方也维持着一个接收窗口，只有落在接收窗口内的帧才允许接收。这样通过调整发送方窗口和接收方窗口的大小可以实现流量控制。

**滑动窗口大小这个字段是接收端告诉发送端自己还有多少缓冲区可以接收数据。于是发送端就可以根据这个接收端的处理能力来发送数据，而不会导致接收端处理不过来。**

来看一下滑动窗口是如何造成粘包、拆包的？

- 粘包：假设发送方的每256 bytes表示一个完整的报文，接收方由于数据处理不及时，这256个字节的数据都会被缓存到接收缓存区中。如果接收方的接收缓存区中缓存了多个报文，那么对于接收方而言，这就是粘包。

- 拆包：考虑另外一种情况，假设接收方的窗口只剩了128，意味着发送方最多还可以发送128字节，而由于发送方的数据大小是256字节，因此只能发送前128字节，等到接收方ack后，才能发送剩余字节。这就造成了拆包。

:::

### Nagle算法

Nagle算法就是为了尽可能发送大块数据，避免网络中充斥着许多小数据块。

Nagle算法的基本定义是任意时刻，最多只能有一个未被确认的小段。 所谓“小段”，指的是小于MSS尺寸的数据块，所谓“未被确认”，是指一个数据块发送出去后，没有收到对方发送的ACK确认该数据已收到。

Nagle算法的实现规则：

- 如果发送缓存区的包长度达到MSS，则允许发送；
- 如果发送缓存区中含有FIN，表示请求关闭连接，则先将发送缓存区中的剩余数据发送，再关闭；
- 设置了TCP_NODELAY=true选项，则允许发送。TCP_NODELAY是取消TCP的确认延迟机制，相当于禁用了Nagle 算法。
- 未设置TCP_CORK选项时，若所有发出去的小数据包（包长度小于MSS）均被确认，则允许发送;
- 上述条件都未满足，但发生了超时（一般为200ms），则立即发送。

:::info

tcp_nodelay：禁止nagle算法，有需要发送的就立即发送，比较常见

tcp_cork：它是一种加强的nagle算法，过程和nagle算法类似，都是累计数据然后发送。但在设置cork后，即使所有ack都已经收到，但我还是不想发送数据，我还想继续等待应用层更多的数据，所以它的效果比nagle更好。效率上与Nagle算法相比，Nagle算法主要避免网络因为太多的小包(协议头的比例非常之大)而拥塞，而CORK算法则是为了提高网络的利用率，使得总体上协议头占用的比例尽可能的小

:::

## 粘包、拆包解决办法

- 长度编码：发送端给每个数据包添加包首部，首部中应该至少包含数据包的长度，这样接收端在接收到数据后，通过读取包首部的长度字段，便知道每一个数据包的实际长度了。

- 特殊字符分隔符协议：可以在数据包之间设置边界，如添加特殊符号，这样，接收端通过这个边界就可以将不同的数据包拆分开。

- 定长协议：发送端将每个数据包封装为固定长度（不够的可以通过补0填充），这样接收端每次从接收缓冲区中读取固定长度的数据就自然而然的把每个数据包拆分开来。

## 补充：为什么UDP不会发生拆包和粘包？

- TCP协议是面向流的协议，UDP是面向消息的协议

UDP每一段都是一条消息，应用程序必须以消息为单位提取数据，不能一次提取任意字节的数据


- UDP具有保护消息边界，在每个UDP包中就有了消息头（消息来源地址，端口等信息），这样对于接收端来说就容易进行区分处理了。传输协议把数据当作一条独立的消息在网上传输，接收端只能接收独立的消息。接收端一次只能接收发送端发出的一个数据包,如果一次接受数据的大小小于发送端一次发送的数据大小，就会丢失一部分数据，即使丢失，接受端也不会分两次去接收