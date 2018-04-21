import win32com.client

class Robot(object):

    def __init__(self):
        super(Robot, self).__init__()
        self.dm = win32com.client.Dispatch('dm.dmsoft')
        print(self.dm.Ver())

    ################################################################
    # setting
    ################################################################
    def setPath(self,path):
        return self.dm.SetPath(path)

    def getPath(self):
        return self.dm.GetPath(path)

    ################################################################
    # pic and color
    ################################################################

    def capture(self,x1, y1, x2, y2, file):
        return self.dm.Capture(x1, y1, x2, y2, file)

    def captureGif(self,x1, y1, x2, y2, file,delay,time):
        return self.dm.CaptureGif(x1, y1, x2, y2, file,delay,time)

    def captureJpg(self,x1, y1, x2, y2, file, quality):
        return self.dm.CaptureJpg(x1, y1, x2, y2, file, quality)

    def capturePng(self,x1,y1,x2,y2,file):
        return self.dm.CapturePng(x1,y1,x2,y2,file)

    def capturePre(self,file):
        return self.dm.CapturePre(file)

    def enableDisplayDebug(self,enable_debug):
        return self.dm.EnableDisplayDebug(enable_debug)

    def enableGetColorByCapture(self,enable):
        return self.dm.EnableGetColorByCapture(enable)

    def cmpColor(self,x,y,color,sim):
        return self.dm.CmpColor(x,y,color,sim)

    def findPicEx(self,x1, y1, x2, y2, pic_name, delta_color,sim, dir):
        return self.dm.FindPicEx(x1, y1, x2, y2, pic_name, delta_color,sim, dir)

    def findColorEx(self,x1, y1, x2, y2, color, sim, dir):
        return self.dm.FindColorEx(x1, y1, x2, y2, color, sim, dir)

    def findMultiColorEx(self,x1, y1, x2, y2,first_color,offset_color,sim, dir):
        return self.dm.FindMultiColorEx(x1, y1, x2, y2,first_color,offset_color,sim, dir)

    def getAveHSV(self,x1,y1,x2,y2):
        return self.dm.GetAveHSV(x1,y1,x2,y2)

    def getAveRGB(self,x1,y1,x2,y2):
        return self.dm.GetAveRGB(x1,y1,x2,y2)

    def getColorNum(self,x1, y1, x2, y2, color, sim):
        return self.dm.GetColorNum(x1, y1, x2, y2, color, sim)

    def getColor(self,x,y):
        return self.dm.GetColor(x,y)

    def getColorBGR(self,x,y):
        return self.dm.GetColorBGR(x,y)

    def getColorHSV(self,x,y):
        return self.dm.GetColorHSV(x,y)


    def isDisplayDead(self,x1,y1,x2,y2,t):
        return self.dm.IsDisplayDead(x1,y1,x2,y2,t)

    def imageToBmp(self,pic_name,bmp_name):
        return self.dm.ImageToBmp(pic_name,bmp_name)

    def matchPicName(self,pic_name):
        return self.dm.MatchPicName(pic_name)

    def RGB2BGR(self,rgb_color):
        return self.dm.RGB2BGR(rgb_color)


    def getPicSize(self,pic_name):
        return self.dm.GetPicSize(pic_name)

    def setPicPwd(self,pwd):
        return self.dm.SetPicPwd(pwd)


    ################################################################
    # str
    ################################################################

    def addDict(self,index,dict_info):
        return self.dm.AddDict(index,dict_info)

    def clearDict(self,index):
        return self.dm.ClearDict(index)

    def fetchWord(self,x1, y1, x2, y2, color, word):
        return set.dm.FetchWord(x1, y1, x2, y2, color, word)

    def findStrFastEx(self,x1,y1,x2,y2,string,color_format,sim):
        return self.dm.findStrFastEx(x1,y1,x2,y2,string,color_format,sim)

    def findStrWithFontEx(self,x1,y1,x2,y2,string,color_format,sim,font_name,font_size,flag):
        return self.dm.FindStrWithFontEx(x1,y1,x2,y2,string,color_format,sim,font_name,font_size,flag)

    def ocrEx(self,x1,y1,x2,y2,color_format,sim):
        return self.dm.OcrEx(x1,y1,x2,y2,color_format,sim)

    def setColGapNoDict(self,col_gap):
        return self.dm.SetColGapNoDict(col_gap)

    def setDict(self,index,file):
        return self.dm.SetDict(index,file)

    def setDictPwd(self,pwd):
        return self.dm.SetDictPwd(pwd)

    def setExactOcr(self,exact_ocr):
        return self.dm.SetExactOcr(exact_ocr)

    def setMinColGap(self,min_col_gap):
        return self.dm.SetMinColGap(min_col_gap)

    def setMinRowGap(self,min_row_gap):
        return self.dm.SetMinRowGap(min_row_gap)

    def setRowGapNoDict(self,row_gap):
        return self.dm.SetRowGapNoDict(row_gap)

    def setWordGap(self,word_gap):
        return self.dm.SetWordGap(word_gap)

    def setWordGapNoDict(self,word_gap):
        return self.dm.SetWordGapNoDict(word_gap)

    def setWordLineHeight(self,line_height):
        return self.dm.SetWordLineHeight(line_height)

    def setWordLineHeightNoDict(self,line_height):
        return self.dm.SetWordLineHeightNoDict(line_height)

    def useDict(self,index):
        return self.dm.UseDict(index)

    ################################################################
    # keyboard
    ################################################################

    def getCursorPos(self,x,y):
        return self.dm.GetCursorPos(x,y)

    def getKeyState(self,vk_code):
        return self.dm.GetKeyState(vk_code)

    def keyDown(self,vk_code):
        return self.dm.KeyDown(vk_code)

    def keyDownChar(self,key_str):
        return self.dm.KeyDownChar(key_str)

    def keyPress(self,vk_code):
        return self.dm.KeyPress(vk_code)

    def keyPressChar(self,key_str):
        return self.dm.KeyPressChar(key_str)

    def keyUp(self,vk_code):
        return self.dm.KeyUp(vk_code)

    def keyUpChar(self,key_str):
        return self.dm.KeyUpChar(key_str)

    def leftClick(self):
        return self.dm.LeftClick()

    def leftDoubleClick(self):
        return self.dm.LeftDoubleClick()

    def leftDown(self):
        return self.dm.LeftDown()

    def leftUp(self):
        return self.dm.LeftUp()

    def middleClick(self):
        return self.dm.MiddleClick()

    def moveR(self,rx,ry):
        return self.dm.MoveR(rx,ry)

    def moveTo(self,x,y):
        return self.dm.MoveTo(x,y)

    def moveToEx(self,x,y,w,h):
        return self.dm.MoveToEx(x,y,w,h)

    def rightClick(self):
        return self.dm.RightClick()

    def rightDown(self):
        return self.dm.RightDown()

    def rightUp(self):
        return self.dm.RightUp()

    def setKeypadDelay(self,type,delay):
        return self.dm.SetKeypadDelay(type,delay)

    def setMouseDelay(self,type,delay):
        return self.dm.SetMouseDelay(type,delay)

    def waitKey(self,vk_code,time_out):
        return self.dm.WaitKey(vk_code,time_out)

    def wheelDown(self):
        return self.dm.WheelDown()

    def wheelUp(self):
        return self.dm.WheelUp()

    ################################################################
    # Window
    ################################################################

    def enumWindow(self, parent, title, classname, filterf):
        return self.dm.EnumWindow(parent, title, classname, filterf)

    def findWindow(self, classname, title):
        return self.dm.FindWindow(classname, title)

    def findWindowForeground(self):
        return self.dm.GetForegroundWindow()

    def bind(self, hwnd, display, mouse, keypad, mode):
        return self.dm.BindWindow(hwnd, display, mouse, keypad, mode)

    def unbind(self):
        return self.dm.UnBindWindow()

    def getBindWindow(self):
        return self.dm.GetBindWindow()

    def sendString(self, hwnd, sendStr):
        return self.dm.SendString(hwnd, sendStr)



class Robot2(object):

    def __init__(self):
        super(Robot2, self).__init__()
        self.dm = win32com.client.Dispatch('dm.dmsoft')

    ################################################################
    # setting
    ################################################################
    def setPath(self,*arg):
        return self.dm.SetPath(arg[0])


    ################################################################
    # pic and color
    ################################################################

    def capture(self,*arg):
        arg = arg[0]
        return self.dm.Capture(arg[0], arg[1], arg[2], arg[3], arg[4])

    def captureGif(self,*arg):
        arg = arg[0]
        return self.dm.CaptureGif(arg[0], arg[1], arg[2], arg[3], arg[4],arg[5],arg[6])

    def captureJpg(self,*arg):
        arg = arg[0]
        return self.dm.CaptureJpg(arg[0], arg[1], arg[2], arg[3], arg[4], arg[5])

    def capturePng(self,*arg):
        arg = arg[0]
        return self.dm.CapturePng(arg[0],arg[1],arg[2],arg[3],arg[4])

    def capturePre(self,*arg):
        arg = arg[0]
        return self.dm.CapturePre(arg[0])

    def enableDisplayDebug(self,*arg):
        arg = arg[0]
        return self.dm.EnableDisplayDebug(arg[0])

    def enableGetColorByCapture(self,*arg):
        arg = arg[0]
        return self.dm.EnableGetColorByCapture(arg[0])

    def cmpColor(self,*arg):
        arg = arg[0]
        return self.dm.CmpColor(arg[0],arg[1],arg[2],arg[3])

    def findPicEx(self,*arg):
        arg = arg[0]
        return self.dm.FindPicEx(arg[0], arg[1], arg[2], arg[3], arg[4], arg[5],arg[6], arg[7])

    def findColorEx(self,*arg):
        arg = arg[0]
        return self.dm.FindColorEx(arg[0], arg[1], arg[2], arg[3], arg[4], arg[5], arg[6])

    def findMultiColorEx(self,*arg):
        arg = arg[0]
        return self.dm.FindMultiColorEx(arg[0], arg[1], arg[2], arg[3], arg[4], arg[5],arg[6], arg[7])

    def getAveHSV(self,*arg):
        arg = arg[0]
        return self.dm.GetAveHSV(arg[0], arg[1], arg[2], arg[3])

    def getAveRGB(self,*arg):
        arg = arg[0]
        return self.dm.GetAveRGB(arg[0], arg[1], arg[2], arg[3])

    def getColorNum(self,*arg):
        arg = arg[0]
        return self.dm.GetColorNum(arg[0], arg[1], arg[2], arg[3], arg[4], arg[5])

    def getColor(self,*arg):
        arg = arg[0]
        return self.dm.GetColor(arg[0],arg[1])

    def getColorBGR(self,*arg):
        arg = arg[0]
        return self.dm.GetColorBGR(arg[0],arg[1])

    def getColorHSV(self,*arg):
        arg = arg[0]
        return self.dm.GetColorHSV(arg[0],arg[1])


    def isDisplayDead(self,*arg):
        arg = arg[0]
        return self.dm.IsDisplayDead(arg[0], arg[1], arg[2], arg[3], arg[4])

    def imageToBmp(self,*arg):
        arg = arg[0]
        return self.dm.ImageToBmp(arg[0],arg[1])

    def matchPicName(self,*arg):
        arg = arg[0]
        return self.dm.MatchPicName(arg[0])

    def RGB2BGR(self,*arg):
        arg = arg[0]
        return self.dm.RGB2BGR(arg[0])


    def getPicSize(self,*arg):
        arg = arg[0]
        return self.dm.GetPicSize(arg[0])

    def setPicPwd(self,*arg):
        arg = arg[0]
        return self.dm.SetPicPwd(arg[0])


    ################################################################
    # str
    ################################################################

    def addDict(self,*arg):
        arg = arg[0]
        return self.dm.AddDict(arg[0], arg[1])

    def clearDict(self,*arg):
        arg = arg[0]
        return self.dm.ClearDict(arg[0])

    def fetchWord(self,*arg):
        arg = arg[0]
        return set.dm.FetchWord(arg[0], arg[1], arg[2], arg[3], arg[4],arg[5])

    def findStrFastEx(self,*arg):
        arg = arg[0]
        return self.dm.findStrFastEx(arg[0], arg[1], arg[2], arg[3], arg[4],arg[5],arg[6])

    def findStrWithFontEx(self,*arg):
        arg = arg[0]
        return self.dm.FindStrWithFontEx(arg[0], arg[1], arg[2], arg[3], arg[4],arg[5],arg[6],arg[7],arg[8],arg[9])

    def ocrEx(self,*arg):
        arg = arg[0]
        return self.dm.OcrEx(arg[0], arg[1], arg[2], arg[3], arg[4],arg[5])

    def setColGapNoDict(self,*arg):
        arg = arg[0]
        return self.dm.SetColGapNoDict(arg[0])

    def setDict(self,*arg):
        arg = arg[0]
        return self.dm.SetDict(arg[0], arg[1])

    def setDictPwd(self,*arg):
        arg = arg[0]
        return self.dm.SetDictPwd(arg[0])

    def setExactOcr(self,*arg):
        arg = arg[0]
        return self.dm.SetExactOcr(arg[0])

    def setMinColGap(self,*arg):
        arg = arg[0]
        return self.dm.SetMinColGap(arg[0])

    def setMinRowGap(self,*arg):
        arg = arg[0]
        return self.dm.SetMinRowGap(arg[0])

    def setRowGapNoDict(self,*arg):
        arg = arg[0]
        return self.dm.SetRowGapNoDict(arg[0])

    def setWordGap(self,*arg):
        arg = arg[0]
        return self.dm.SetWordGap(arg[0])

    def setWordGapNoDict(self,*arg):
        arg = arg[0]
        return self.dm.SetWordGapNoDict(arg[0])

    def setWordLineHeight(self,*arg):
        arg = arg[0]
        return self.dm.SetWordLineHeight(arg[0])

    def setWordLineHeightNoDict(self,*arg):
        arg = arg[0]
        return self.dm.SetWordLineHeightNoDict(arg[0])

    def useDict(self,*arg):
        arg = arg[0]
        return self.dm.UseDict(arg[0])

    ################################################################
    # keyboard
    ################################################################

    def getCursorPos(self,*arg):
        arg = arg[0]
        return self.dm.GetCursorPos(arg[0],arg[1])

    def getKeyState(self,*arg):
        arg = arg[0]
        return self.dm.GetKeyState(arg[0])

    def keyDown(self,*arg):
        arg = arg[0]
        return self.dm.KeyDown(arg[0])

    def keyDownChar(self,*arg):
        arg = arg[0]
        return self.dm.KeyDownChar(arg[0])

    def keyPress(self,*arg):
        arg = arg[0]
        return self.dm.KeyPress(arg[0])

    def KeyPressChar(self,*arg):
        arg = arg[0]
        return self.dm.KeyPressChar(arg[0])

    def keyUp(self,*arg):
        arg = arg[0]
        return self.dm.KeyUp(arg[0])

    def keyUpChar(self,*arg):
        arg = arg[0]
        return self.dm.KeyUpChar(arg[0])

    def leftClick(self,*arg):
        arg = arg[0]
        return self.dm.LeftClick()

    def leftDoubleClick(self,*arg):
        arg = arg[0]
        return self.dm.LeftDoubleClick()

    def leftDown(self,*arg):
        arg = arg[0]
        return self.dm.LeftDown()

    def leftUp(self,*arg):
        arg = arg[0]
        return self.dm.LeftUp()

    def middleClick(self,*arg):
        arg = arg[0]
        return self.dm.MiddleClick()

    def moveR(self,*arg):
        arg = arg[0]
        return self.dm.MoveR(arg[0],arg[1])

    def moveTo(self,*arg):
        arg = arg[0]
        return self.dm.MoveTo(arg[0],arg[1])

    def moveToEx(self,*arg):
        arg = arg[0]
        return self.dm.MoveToEx(arg[0],arg[1],arg[2],arg[3])

    def rightClick(self,*arg):
        arg = arg[0]
        return self.dm.RightClick()

    def rightDown(self,*arg):
        arg = arg[0]
        return self.dm.RightDown()

    def rightUp(self,*arg):
        arg = arg[0]
        return self.dm.RightUp()

    def setKeypadDelay(self,*arg):
        arg = arg[0]
        return self.dm.SetKeypadDelay(arg[0],arg[1])

    def setMouseDelay(self,*arg):
        arg = arg[0]
        return self.dm.SetMouseDelay(arg[0],arg[1])

    def waitKey(self,*arg):
        arg = arg[0]
        return self.dm.WaitKey(arg[0],arg[1])

    def wheelDown(self,*arg):
        arg = arg[0]
        return self.dm.WheelDown()

    def wheelUp(self,*arg):
        arg = arg[0]
        return self.dm.WheelUp()

    ################################################################
    # Window
    ################################################################

    def enumWindow(self,*arg):
        arg = arg[0]
        return self.dm.EnumWindow(arg[0],arg[1],arg[2],arg[3])

    def findWindow(self,*arg):
        arg = arg[0]
        return self.dm.FindWindow(arg[0],arg[1])

    def findWindowForeground(self,*arg):
        arg = arg[0]
        return self.dm.GetForegroundWindow()

    def bind(self,*arg):
        arg = arg[0]
        return self.dm.BindWindow(arg[0],arg[1],arg[2],arg[3],arg[4])

    def unbind(self,*arg):
        arg = arg[0]
        return self.dm.UnBindWindow()

    def getBindWindow(self,*arg):
        arg = arg[0]
        return self.dm.GetBindWindow()

    def sendString(self,*arg):
        arg = arg[0]
        return self.dm.SendString(arg[0], arg[1])
