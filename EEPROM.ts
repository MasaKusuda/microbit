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
    let DS1307_REG_RAM = 8

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
    setReg(DS1307_REG_RAM, DecToHex(data % 100))
    }

    export function getEEPROM(): number{
    return HexToDec(getReg(DS1307_REG_RAM))
    }

    export function setRegBig(reg: number, dat:Buffer): void {
        let length: number = dat.length;
        let buf = pins.createBuffer(length + 1);
        buf[0] = reg;
        for (let i = 1; i <= length;i++){
            buf[i]=dat[i];
        }
        pins.i2cWriteBuffer(DS1307_I2C_ADDR, buf);
    }

    export function setEEPBigNum(data:Buffer): void{
        let buf:Buffer = pins.createBuffer(data.length);
        for(let i=0;i<data.length;i++){
            buf[i]=DecToHex(data[i]%100);
        }
        setRegBig(DS1307_REG_RAM,buf);
    }

    export function getEEPBigNum(): number{
    pins.i2cWriteNumber(DS1307_I2C_ADDR, DS1307_REG_RAM, NumberFormat.UInt8BE);
    return pins.i2cReadNumber(DS1307_I2C_ADDR, NumberFormat.UInt8BE);
    }
}
