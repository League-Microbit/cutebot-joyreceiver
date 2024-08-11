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
    if (x > 507 && x < 525) {
        x = 512
    }
    if (y > 507 && y < 525) {
        y = 512
    }
})
let py = 0
let px = 0
let rw_speed = 0
let lw_speed = 0
let turn_speed = 0
let fwd_speed = 0
let y = 0
let b = 0
let x = 0
radio.setGroup(1)
basic.forever(function () {
    if (b == 0) {
        music.play(music.tonePlayable(262, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.InBackground)
        basic.showLeds(`
            . # # . .
            # . . # .
            # # # # .
            # . . # .
            # . . # .
            `)
    } else if (b == 1) {
        music.play(music.tonePlayable(330, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.InBackground)
        basic.showLeds(`
            # # # . .
            # . . # .
            # # # . .
            # . . # .
            # # # # .
            `)
    } else if (b == 2) {
        basic.showArrow(ArrowNames.West)
    } else if (b == 3) {
        basic.showArrow(ArrowNames.North)
    } else if (b == 4) {
        basic.showArrow(ArrowNames.East)
    } else if (b == 5) {
        basic.showArrow(ArrowNames.South)
    } else {
        basic.clearScreen()
        fwd_speed = Math.map(y - 0, 0, 1023, 0, 200) - 100
        turn_speed = Math.map(x - 0, 0, 1023, 100, 0) - 50
        lw_speed = fwd_speed + turn_speed
        rw_speed = fwd_speed - turn_speed
        cuteBot.motors(lw_speed, rw_speed)
        px = Math.map(x - 100, 1023, 0, -2, 2) + 2
        py = Math.map(y - 100, 1023, 0, -2, 2) + 2
        led.plot(px, py)
        serial.writeValue("x", x)
        serial.writeValue("y", y)
        serial.writeValue("fwd", fwd_speed)
        serial.writeValue("turn", turn_speed)
        serial.writeValue("rw", rw_speed)
        serial.writeValue("lw", lw_speed)
    }
})
