input.onButtonPressed(Button.A, () => {
    DS1307.setSecond(0)
    DS1307.setMinute(0)
})
DS1307.start()
basic.forever(() => {
    basic.showNumber(DS1307.getMinute())
    basic.pause(10)
})