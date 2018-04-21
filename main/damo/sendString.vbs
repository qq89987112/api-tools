Set oShell = WScript.CreateObject("WScript.Shell")
oShell.Run "regsvr32  /s AutoItX3_x64.dll"

Set oAutoIt = WScript.CreateObject("AutoItX3.Control")
Set objArgs = WScript.Arguments
oAutoIt.Send objArgs(0)