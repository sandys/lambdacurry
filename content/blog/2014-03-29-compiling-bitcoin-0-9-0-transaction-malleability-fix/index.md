---
title: "Compiling bitcoin 0.9.0 - the transaction malleability fix"
date: "2014-03-29"
# Head: "2014"
tags:
- blockchain
---

I had a bit of trouble compiling Bitcoin 0.9.0 (which contains the all important "transaction malleability" fix). So I'm posting here for the benefit of everyone. This is done on an Ubuntu 12.04 machine - which is relevant only for the system packages (if you're on any other machine just ask around for what are the **equivalent** packages)


```git clone https://github.com/bitcoin/bitcoin.git

cd bitcoin

git checkout v0.9.0

sudo apt-get install build-essential libboost-all-dev automake libtool autoconf #this part is dependent on Ubuntu

mkdir $PWD/release #I dont want to install bitcoin systemwide, so I make a local dir.

./autogen.sh && ./configure --with-incompatible-bdb --prefix=$PWD/release

make

make install```




P.S. if anybody reading this is on another platform and figures out a slightly different way of doing things, please post in the comments