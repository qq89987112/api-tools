Set oShell = WScript.CreateObject("WScript.Shell")

oShell.Run "regsvr32  /s dm.dll"
WScript.Sleep 100

Set oAutoIt = WScript.CreateObject("dm.dmsoft")