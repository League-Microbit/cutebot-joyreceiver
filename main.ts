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
})
let py = 0
let px = 0
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
        px = Math.map(x - 100, 1023, 0, -2, 2) + 2
        py = Math.map(y - 100, 1023, 0, -2, 2) + 2
        led.plot(px, py)
    }
})
