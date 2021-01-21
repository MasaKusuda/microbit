namespace EEPROM{
    let DS1307_I2C_ADDR = 104;
    let DS1307_REG_SECOND = 0
    let DS1307_REG_MINUTE = 1
    let DS1307_REG_HOUR = 2
    let DS1307_REG_WEEKDAY = 3
    let DS1307_REG_DAY = 4
    let DS1307_REG_MONTH = 5
    let DS1307_REG_YEAR = 6
    let DS1307_REG_CTRL = 7
    export let DS1307_REG_RAM1 = 8
    export let DS1307_REG_RAM2 = 9
    export let DS1307_REG_RAM3 = 10
    export let DS1307_REG_RAM4 = 11
    export let DS1307_REG_RAM5 = 12
    export let DS1307_REG_RAM6 = 13
    export let DS1307_REG_RAM7 = 14
    export let DS1307_REG_RAM8 = 15


    function setReg(reg: number, dat: number): void {
    let buf = pins.createBuffer(2);
    buf[0] = reg;
    buf[1] = dat;
    pins.i2cWriteBuffer(DS1307_I2C_ADDR, buf);
    }

    function getReg(reg: number): number {
    pins.i2cWriteNumber(DS1307_I2C_ADDR, reg, NumberFormat.UInt8BE);
    return pins.i2cReadNumber(DS1307_I2C_ADDR, NumberFormat.UInt8BE);
    }
    
    function HexToDec(dat: number): number {
    return (dat >> 4) * 10 + (dat % 16);
    }
    
    function DecToHex(dat: number): number {
    return Math.idiv(dat, 10) * 16 + (dat % 10)
    }
    
    export function setEEPRom(data: number): void{
    setReg(DS1307_REG_RAM1, DecToHex(data % 100))
    }

    export function getEEPROM(): number{
    return HexToDec(getReg(DS1307_REG_RAM1))
    }

    export function setAnyEEP(reg:number,data:number):void{
    setReg(reg, DecToHex(data % 100))
    }

    export function getAnyEEP(reg:number): number{
    return HexToDec(getReg(reg))
    }
}
// EEPROM.setAnyEEP(EEPROM.DS1307_REG_RAM1,1);
// EEPROM.setAnyEEP(EEPROM.DS1307_REG_RAM2,3);
// EEPROM.setAnyEEP(EEPROM.DS1307_REG_RAM3,5);
// EEPROM.setAnyEEP(EEPROM.DS1307_REG_RAM4,7);
// EEPROM.setAnyEEP(EEPROM.DS1307_REG_RAM5,9);
// EEPROM.setAnyEEP(EEPROM.DS1307_REG_RAM6,0);
// EEPROM.setAnyEEP(EEPROM.DS1307_REG_RAM7,2);
// EEPROM.setAnyEEP(EEPROM.DS1307_REG_RAM8,4);
let arr =pins.createBuffer(8);
arr[0] = EEPROM.getAnyEEP(EEPROM.DS1307_REG_RAM1);
arr[1] = EEPROM.getAnyEEP(EEPROM.DS1307_REG_RAM2);
arr[2] = EEPROM.getAnyEEP(EEPROM.DS1307_REG_RAM3);
arr[3] = EEPROM.getAnyEEP(EEPROM.DS1307_REG_RAM4);
arr[4] = EEPROM.getAnyEEP(EEPROM.DS1307_REG_RAM5);
arr[5] = EEPROM.getAnyEEP(EEPROM.DS1307_REG_RAM6);
arr[6] = EEPROM.getAnyEEP(EEPROM.DS1307_REG_RAM7);
arr[7] = EEPROM.getAnyEEP(EEPROM.DS1307_REG_RAM8);

basic.forever(function () {
    for(let i=0;i<8;i++){
        basic.showNumber(arr[i])
        basic.pause(400);
    }
    basic.pause(400);
})

