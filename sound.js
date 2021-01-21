function play (Track: number) {
    let bufr = pins.createBuffer(6);
bufr.setNumber(NumberFormat.UInt8BE, 0, 0xAA);
bufr.setNumber(NumberFormat.UInt8BE, 1, 0x07);
bufr.setNumber(NumberFormat.UInt8BE, 2, 0x02);
bufr.setNumber(NumberFormat.UInt8BE, 3, 0x00);
bufr.setNumber(NumberFormat.UInt8BE, 4, Track);
bufr.setNumber(NumberFormat.UInt8BE, 5, Track+0xB3);
serial.writeBuffer(bufr);
}
function volume(vol:number){
    let bufr = pins.createBuffer(5);
    bufr.setNumber(NumberFormat.UInt8BE, 0, 0xAA);
    bufr.setNumber(NumberFormat.UInt8BE, 1, 0x13);
    bufr.setNumber(NumberFormat.UInt8BE, 2, 0x01);
    bufr.setNumber(NumberFormat.UInt8BE, 3, vol);
    bufr.setNumber(NumberFormat.UInt8BE, 4, vol+0xBE);
serial.writeBuffer(bufr);
}
function set_the_loop_mode(mode:number){
    let bufr = pins.createBuffer(5);
    bufr.setNumber(NumberFormat.UInt8BE, 0, 0xAA);
    bufr.setNumber(NumberFormat.UInt8BE, 1, 0x18);
    bufr.setNumber(NumberFormat.UInt8BE, 2, 0x01);
    bufr.setNumber(NumberFormat.UInt8BE, 3, mode);
    bufr.setNumber(NumberFormat.UInt8BE, 4, mode+0xC3);
serial.writeBuffer(bufr);
}
function set_the_numbers_of_loop_time(times:number){
    let bufr = pins.createBuffer(6);
    bufr.setNumber(NumberFormat.UInt8BE, 0, 0xAA);
    bufr.setNumber(NumberFormat.UInt8BE, 1, 0x19);
    bufr.setNumber(NumberFormat.UInt8BE, 2, 0x02);
    bufr.setNumber(NumberFormat.UInt8BE, 3, 0x00);
    bufr.setNumber(NumberFormat.UInt8BE, 4, times);
    bufr.setNumber(NumberFormat.UInt8BE, 5, times+0xC5);
serial.writeBuffer(bufr);
}
function pause() {
    let bufr = pins.createBuffer(4);
    bufr.setNumber(NumberFormat.UInt8BE, 0, 0xAA);
    bufr.setNumber(NumberFormat.UInt8BE, 1, 0x03);
    bufr.setNumber(NumberFormat.UInt8BE, 2, 0x00);
    bufr.setNumber(NumberFormat.UInt8BE, 3, 0xAD);
    serial.writeBuffer(bufr);
}
function stop() {
    let bufr = pins.createBuffer(4);
    bufr.setNumber(NumberFormat.UInt8BE, 0, 0xAA);
    bufr.setNumber(NumberFormat.UInt8BE, 1, 0x04);
    bufr.setNumber(NumberFormat.UInt8BE, 2, 0x00);
    bufr.setNumber(NumberFormat.UInt8BE, 3, 0xAE);
serial.writeBuffer(bufr);
}


let i:number = 0
serial.redirect(
SerialPin.P1,
SerialPin.P0,
BaudRate.BaudRate9600
)

volume(20);
basic.forever(function () {
    let i:number = 0;
    while (true) {
        play(i)
        basic.pause(10000)
        led.toggle(0, 0)
        i++;
    }
})
