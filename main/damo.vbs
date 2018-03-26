dim wshshell
set wshshell=wscript.createobject("wscript.shell")
wshshell.run "notepad"
wscript.sleep 200
wshshell.sendkeys"**************"
wshshell.sendkeys"^{a}"
wshshell.sendkeys"^{c}"
wshshell.sendkeys"^{v}"
wshshell.sendkeys"^{v}" '使用 wscript 或者 cscript 运行。 字符串里带中文会报错。


用Wscript的Arguments属性实现vbs的命令行参数形式启动 https://blog.csdn.net/anlegor/article/details/5730469
如何用VB运行过程中动态执行代码?  https://zhidao.baidu.com/question/391855003.html