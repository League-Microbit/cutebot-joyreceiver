def on_received_value(name, value):
    global x, b, y
    if name == "x":
        x = value
        b = -1
    elif name == "y":
        y = value
        b = -1
    elif name == "b":
        b = value
    else:
        pass
    if x > 507 and x < 525:
        x = 512
    if y > 507 and y < 525:
        y = 512
radio.on_received_value(on_received_value)

py = 0
px = 0
rw_speed = 0
lw_speed = 0
turn_speed = 0
fwd_speed = 0
y = 0
b = 0
x = 0
radio.set_group(1)

def on_forever():
    global fwd_speed, turn_speed, lw_speed, rw_speed, px, py
    if b == 0:
        music.play(music.tone_playable(262, music.beat(BeatFraction.SIXTEENTH)),
            music.PlaybackMode.IN_BACKGROUND)
        basic.show_leds("""
            . # # . .
            # . . # .
            # # # # .
            # . . # .
            # . . # .
            """)
    elif b == 1:
        music.play(music.tone_playable(330, music.beat(BeatFraction.SIXTEENTH)),
            music.PlaybackMode.IN_BACKGROUND)
        basic.show_leds("""
            # # # . .
            # . . # .
            # # # . .
            # . . # .
            # # # # .
            """)
    elif b == 2:
        basic.show_arrow(ArrowNames.WEST)
    elif b == 3:
        basic.show_arrow(ArrowNames.NORTH)
    elif b == 4:
        basic.show_arrow(ArrowNames.EAST)
    elif b == 5:
        basic.show_arrow(ArrowNames.SOUTH)
    else:
        basic.clear_screen()
        fwd_speed = Math.map(y - 0, 0, 1023, 0, 200) - 100
        turn_speed = Math.map(x - 0, 0, 1023, 200, 0) - 100
        turn_speed = turn_speed / 4
        lw_speed = fwd_speed + turn_speed
        rw_speed = fwd_speed - turn_speed
        cuteBot.motors(lw_speed, rw_speed)
        px = Math.map(x - 100, 1023, 0, -2, 2) + 2
        py = Math.map(y - 100, 1023, 0, -2, 2) + 2
        led.plot(px, py)
        serial.write_value("x", x)
        serial.write_value("y", y)
        serial.write_value("fwd", fwd_speed)
        serial.write_value("turn", turn_speed)
        serial.write_value("rw", rw_speed)
        serial.write_value("lw", lw_speed)
basic.forever(on_forever)
