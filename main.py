def on_received_value(name, value):
    global x, y, b
    if name == "x":
        x = value
    elif name == "y":
        y = value
    elif name == "b":
        b = value
    else:
        pass
radio.on_received_value(on_received_value)

b = 0
y = 0
x = 0
radio.set_group(1)

def on_forever():
    pass
basic.forever(on_forever)
