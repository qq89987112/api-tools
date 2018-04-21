import sys
import robot
rt = robot.Robot2()
print(getattr(rt, sys.argv[1])(sys.argv[2:]));
