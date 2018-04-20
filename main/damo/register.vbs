set ws=createobject("Wscript.Shell")
ws.run "regsvr32 dm.dll /s"
Set dm = CreateObject("dm.dmsoft")
