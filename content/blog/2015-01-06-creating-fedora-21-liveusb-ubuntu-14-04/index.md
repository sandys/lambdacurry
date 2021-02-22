---
title: "The correct way to update/change git submodules"
date: "2015-01-06"
# Head: "2015"
tags:
- git
---

Sadly, Ubuntu's startup disk creator does not allow you to create fedora images.

The **officially **sanctioned way to create a fedora liveusb in ubuntu is the following:


`sudo aptitude install isomd5sum python-parted python-pyisomd5sum python-urlgrabber extlinux python-qt4 python-qt4-dbus tar udisks libudisks2-dev`

`git clone https://github.com/lmacken/liveusb-creator.git`

`sudo ./liveusb-creator`