def speedMap(input2: number, power: number):
    global normalized, scaled
    sign = 1 if input2 >= 0 else -1
    normalized = abs(input2) / 100
    scaled = normalized ** power
    return sign * scaled * 100
def debug():
    serial.write_value("x", x)
    serial.write_value("y", y)
    serial.write_value("fwd", fwd_speed)
    serial.write_value("turn", turn_speed)
    serial.write_value("rw", rw_speed)
    serial.write_value("lw", lw_speed)

def on_received_value(name, value):
    global x, b, y, enable_motors
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
    enable_motors = 1
    if x > 507 and x < 525:
        x = 512
    if y > 507 and y < 525:
        y = 512
radio.on_received_value(on_received_value)

py = 0
px = 0
lw_speed = 0
rw_speed = 0
turn_speed = 0
fwd_speed = 0
y = 0
x = 0
scaled = 0
normalized = 0
b = 0
enable_motors = 0
RadioGroup = 1
radio.set_group(1)
strip = neopixel.create(DigitalPin.P15, 2, NeoPixelMode.RGBW)
enable_motors = 0
b = -1
basic.show_icon(IconNames.GHOST)
cuteBot.set_servo(cuteBot.ServoList.S1, 150)

def on_forever():
    global RadioGroup, fwd_speed, turn_speed, lw_speed, rw_speed, px, py
    strip.show_color(neopixel.colors(NeoPixelColors.RED))
    if b == 0:
        basic.show_icon(IconNames.HEART)
    elif b == 1:
        basic.show_icon(IconNames.HAPPY)
        strip.show_color(neopixel.colors(NeoPixelColors.BLUE))
        music.play(music.tone_playable(330, music.beat(BeatFraction.QUARTER)),
            music.PlaybackMode.IN_BACKGROUND)
    elif b == 2:
        cuteBot.color_light(cuteBot.RGBLights.ALL, 0x7f00ff)
        basic.show_arrow(ArrowNames.WEST)
        cuteBot.set_servo(cuteBot.ServoList.S1, 90)
    elif b == 3:
        cuteBot.color_light(cuteBot.RGBLights.ALL, 0xffff00)
        basic.show_arrow(ArrowNames.NORTH)
        music.play(music.builtin_playable_sound_effect(soundExpression.sad),
            music.PlaybackMode.IN_BACKGROUND)
    elif b == 4:
        cuteBot.color_light(cuteBot.RGBLights.ALL, 0x00ff00)
        basic.show_arrow(ArrowNames.EAST)
        cuteBot.set_servo(cuteBot.ServoList.S1, 0)
    elif b == 5:
        cuteBot.color_light(cuteBot.RGBLights.ALL, 0x00ffff)
        basic.show_arrow(ArrowNames.SOUTH)
        music.play(music.builtin_playable_sound_effect(soundExpression.happy),
            music.PlaybackMode.IN_BACKGROUND)
    elif b == 6:
        basic.show_number(6)
    elif b == 7:
        music.play(music.builtin_playable_sound_effect(soundExpression.giggle),
            music.PlaybackMode.IN_BACKGROUND)
    elif input.logo_is_pressed():
        RadioGroup = (RadioGroup + 1) % 3
        radio.set_group(RadioGroup)
        basic.show_number(RadioGroup)
        basic.pause(1000)
    elif enable_motors == 1:
        basic.clear_screen()
        fwd_speed = Math.map(y - 0, 0, 1023, 0, 200) - 100
        fwd_speed = speedMap(fwd_speed, 2)
        turn_speed = Math.map(x - 0, 0, 1023, 200, 0) - 100
        turn_speed = turn_speed / 4
        lw_speed = fwd_speed + turn_speed
        rw_speed = fwd_speed - turn_speed
        cuteBot.motors(lw_speed, rw_speed)
        px = Math.map(x - 100, 1023, 0, -2, 2) + 2
        py = Math.map(y - 100, 1023, 0, -2, 2) + 2
        led.plot(px, py)
    else:
        pass
basic.forever(on_forever)
