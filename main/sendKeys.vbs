dim wshshell,objArgs
Set objArgs = WScript.Arguments
set wshshell=wscript.createobject("wscript.shell")
wshshell.sendkeys objArgs(0) 'wshshell.sendkeys'^{ESC}'