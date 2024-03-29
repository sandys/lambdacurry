---
title: "Suspending systemd/upowerd/logind on low battery (Fedora or Ubuntu)"
date: "2015-10-25"
# Head: "2015"
tags:
- India
---

On older Linux OS versions, the system used to automatically suspend on low battery. Then this was managed by gsettings using


<blockquote>`gsettings set org.gnome.settings-daemon.plugins.power critical-battery-action 'suspend'`</blockquote>


But there have been some breaking changes (for the good) that has taken all of this out of any obvious control of the user. If you open _/etc/UPower/UPower.conf , _you will see that the only option _CriticalPowerAction=HybridSleep _. So Hybrid-Sleep/Hibernate/Shutdown are the only options on low power. Testing out hybrid-sleep (using _sudo /usr/lib/systemd/systemd-sleep hybrid-sleep_) does not do anything... which is unsurprising.

So what you need to do is switch HybridSleep to actually suspend. The way to do it is

Create a /etc/systemd/sleep.conf




>     
>     <code>[Sleep]
>     # And finally settings for hybrid-sleep -action
>     HybridSleepMode=suspend platform
>     HybridSleepState=mem
>     
>     
>     # Setting for suspend -action
>     SuspendState=mem disk #freeze
>     SuspendMode=suspend
>     </code>
> 
> 



verify by running `sudo /usr/lib/systemd/systemd-sleep hybrid-sleep`



