function play (Track: number) {
    let bufr = pins.createBuffer(6);
bufr.setNumber(NumberFormat.UInt8BE, 0, 0xAA);
bufr.setNumber(NumberFormat.UInt8BE, 1, 0x07);
bufr.setNumber(NumberFormat.UInt8BE, 2, 0x02);
bufr.setNumber(NumberFormat.UInt8BE, 3, 0x00);
bufr.setNumber(NumberFormat.UInt8BE, 4, Track);
bufr.setNumber(NumberFormat.UInt8BE, 5, Track+0xB3);
serial.writeBuffer(bufr)
}
function volume(vol:number){
    let bufr = pins.createBuffer(5);
    bufr.setNumber(NumberFormat.UInt8BE, 0, 0xAA);
    bufr.setNumber(NumberFormat.UInt8BE, 1, 0x13);
    bufr.setNumber(NumberFormat.UInt8BE, 2, 0x01);
    bufr.setNumber(NumberFormat.UInt8BE, 3, vol);
    bufr.setNumber(NumberFormat.UInt8BE, 4, vol+0xBE);
serial.writeBuffer(bufr)

}


let i:number = 0
serial.redirect(
SerialPin.P1,
SerialPin.P0,
BaudRate.BaudRate9600
)
volume(20);
basic.forever(function () {
    while (true) {
        play(17)
        basic.pause(1000)
        led.toggle(0, 0)
    }
})
