# microbit
microbitで遊ぼう

## EEPROM
EEPROMは0~99までの値を保持できる．
8bitのはずだから-127~128とか0~255かと思ったけど謎である．

### serial 通信

```
 ls /dev/cu.*
 screen /dev/cu.usbmodem14202 115200
```