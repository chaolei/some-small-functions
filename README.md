some-small-functions
====================

a few small functions in my life or work!

一些业余时间或工作时写的小功能点。
由于文件中我提交的是zepto.min.js，它的选择器未做IE的兼容代码（当然还有其他部分），有需要的哥们直接换成jquery即可。

1、fullview 

就是传说中的全景浏览，网上很多用html5的canva来实现。我用的比较老式方式，23张图，鼠标拖动时改变背景。
其实可以做到一张图上，然后拖动时算background-position。

2、类似刮奖的功能

用html5的canva是最简单的方式，但是为了兼容，我用的常规的方式实现。
还是比较2，根据底图的大小，生成N多个10*10的div节点，然后给这些节点绑定事件，遇到mouseover的时候删除本节点。

