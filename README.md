some-small-functions
====================

a few small functions in my life or work!

一些业余时间或工作时写的小功能点。
由于文件中我提交的是zepto.min.js，它的选择器未做IE的兼容代码（当然还有其他部分），有需要的哥们直接换成jquery即可。

1、fullview(fullview) 

就是传说中的全景浏览，网上很多用html5的canva来实现。我用的比较老式方式，23张图，鼠标拖动时改变背景。
其实可以做到一张图上，然后拖动时算background-position。

2、类似刮奖的功能

用html5的canvas是最简单的方式，但是为了兼容，我用的常规的方式实现。
还是比较2，根据底图的大小，生成N多个10*10的div节点，然后给这些节点绑定事件，遇到mouseover的时候删除本节点。

3、类似messager提示的功能(messager)

自己跟着自己的想法写了一个消息提示，包括了zindex的管理和消息的提示与关闭，样式和动画比较简单。以后可以继续改造。
下次写一个简单的树。

4、捕获用户的按键，类似游戏快捷键的设置(hotkey)

工作中涉及到了，就记录下来，主要是要简历一个键值和键内容的对照类。我这儿设计的是不支持单键的快捷键（除了小键盘数字），比如用户按下A，快捷键则是
ALT + A.

5、css3 简单的鼠标经过动画(css-scale animation)

利用css3 transform的scale和transition-duration实现简单的动画。增加用户
体验。也可以用在图片加载时。

6、简单的拖动排序(dragtosort)

我的做法是新建一个节点随着鼠标拖动，拖动距离（根据鼠标垂直位置上的偏移量）超过隔壁item的一半时就认为是需要改变（这个可以修改）。
鼠标松开，移动的节点移动到目标位置，然后进行节点顺序改变。

7、css3 人物摇头动画，全css实现(css-person-animation)

主要用css的radius、rotate创建人物，并摇头，实现比较粗糙不够精细。

8、小球自由落地运动动画(requestAnimationFrame)

用requestAnimationFrame 实现，具体内容比较简单,数学不太好，具体下坠和弹起的各个参数乱写的，使得动画看起来有点不太自然。
大致掌握requestAnimationFrame这个api即可。

9、太阳系轨道运动,我的家乡，3d房子展示(svg)

这几天学习了一下svg，尝试着写了这个动画。还有点瑕疵。画的过程中找点真的累人。

10、骰子动画(3dbox)

主要用css3的3d属性的运用如，transform-style: preserve-3d;perspective，rotateX，rotateY，translateZ等

11、动物变换（cssclipPath）

主要用css3的clip-path属性画出动物。

12、音乐演奏（music）

主要用html5的audio api发出声音