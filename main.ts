function debug () {
    serial.writeValue("x", x)
    serial.writeValue("y", y)
    serial.writeValue("fwd", fwd_speed)
    serial.writeValue("turn", turn_speed)
    serial.writeValue("rw", rw_speed)
    serial.writeValue("lw", lw_speed)
}
radio.onReceivedValue(function (name, value) {
    if (name == "x") {
        x = value
        b = -1
    } else if (name == "y") {
        y = value
        b = -1
    } else if (name == "b") {
        b = value
    } else {
    	
    }
    enable_motors = 1
    if (x > 507 && x < 525) {
        x = 512
    }
    if (y > 507 && y < 525) {
        y = 512
    }
})
let py = 0
let px = 0
let lw_speed = 0
let rw_speed = 0
let turn_speed = 0
let fwd_speed = 0
let y = 0
let x = 0
let b = 0
let enable_motors = 0
let RadioGroup = 1
radio.setGroup(1)
let strip = neopixel.create(DigitalPin.P15, 2, NeoPixelMode.RGBW)
enable_motors = 0
b = -1
basic.showIcon(IconNames.Ghost)
basic.forever(function () {
    strip.showColor(neopixel.colors(NeoPixelColors.Red))
    if (b == 0) {
        basic.showIcon(IconNames.Heart)
    } else if (b == 1) {
        basic.showIcon(IconNames.Happy)
        strip.showColor(neopixel.colors(NeoPixelColors.Blue))
        music.play(music.tonePlayable(330, music.beat(BeatFraction.Quarter)), music.PlaybackMode.InBackground)
    } else if (b == 2) {
        cuteBot.colorLight(cuteBot.RGBLights.ALL, 0x7f00ff)
        basic.showArrow(ArrowNames.West)
    } else if (b == 3) {
        cuteBot.colorLight(cuteBot.RGBLights.ALL, 0xffff00)
        basic.showArrow(ArrowNames.North)
        music.play(music.builtinPlayableSoundEffect(soundExpression.sad), music.PlaybackMode.InBackground)
    } else if (b == 4) {
        cuteBot.colorLight(cuteBot.RGBLights.ALL, 0x00ff00)
        basic.showArrow(ArrowNames.East)
    } else if (b == 5) {
        cuteBot.colorLight(cuteBot.RGBLights.ALL, 0x00ffff)
        basic.showArrow(ArrowNames.South)
        music.play(music.builtinPlayableSoundEffect(soundExpression.happy), music.PlaybackMode.InBackground)
    } else if (b == 6) {
        basic.showNumber(6)
    } else if (b == 7) {
        music.play(music.builtinPlayableSoundEffect(soundExpression.giggle), music.PlaybackMode.InBackground)
    } else if (input.logoIsPressed()) {
        RadioGroup = (RadioGroup + 1) % 3
        radio.setGroup(RadioGroup)
        basic.showNumber(RadioGroup)
        basic.pause(1000)
    } else if (enable_motors == 1) {
        basic.clearScreen()
        fwd_speed = Math.map(y - 0, 0, 1023, 0, 200) - 100
        turn_speed = Math.map(x - 0, 0, 1023, 200, 0) - 100
        turn_speed = turn_speed / 4
        lw_speed = fwd_speed + turn_speed
        rw_speed = fwd_speed - turn_speed
        cuteBot.motors(lw_speed, rw_speed)
        px = Math.map(x - 100, 1023, 0, -2, 2) + 2
        py = Math.map(y - 100, 1023, 0, -2, 2) + 2
        led.plot(px, py)
    } else {
    	
    }
})
