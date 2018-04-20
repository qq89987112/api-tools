Set oShell = WScript.CreateObject("WScript.Shell")

oShell.Run "regsvr32  /s AutoItX3_x64.dll"
WScript.Sleep 100

Set oAutoIt = WScript.CreateObject("AutoItX3.Control")