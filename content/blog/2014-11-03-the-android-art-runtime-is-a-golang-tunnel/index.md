---
title: "The Android ART runtime is a Golang tunnel"
date: "2014-11-03"
# Head: "2014"
tags:
- android
---

I'm willing to bet that the first reason that Android switched to ART from Dalvik is the possibility of linking directly to object code from Golang.

The problem is not speeding up individual apps...the problem is that the core of Android is built in Java and therefore is accessible to another application over the same **language/VM.** Now the issue is how do you get golang to link to this core?

ART compiles Java down to object code and is now able to link across language boundaries - theoretically, this means that I should be able to now use Android libs from Python as well.

Or, as is more likely, golang