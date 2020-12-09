function play (Track: number) {
let bufr = pins.createBuffer(7);
bufr.setNumber(NumberFormat.UInt8BE, 0, 0xAA);
bufr.setNumber(NumberFormat.UInt8BE, 1, 0x07);
bufr.setNumber(NumberFormat.UInt8BE, 2, 0x02);
bufr.setNumber(NumberFormat.UInt8BE, 3, 0x00);
bufr.setNumber(NumberFormat.UInt8BE, 4, Track);
bufr.setNumber(NumberFormat.UInt8BE, 5, Track+0xB3);
serial.writeBuffer(bufr)
}
serial.redirect(
SerialPin.P1,
SerialPin.P0,
BaudRate.BaudRate9600
)
basic.forever(function () {
    let i:number = 15;
    while(true) {
    play(i++);
    basic.pause(2000);
    led.toggle(0, 0);
    }

})
