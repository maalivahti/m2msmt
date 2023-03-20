from pprint import pprint

from wialon import Wialon

def load_test_mess():
    wialon = Wialon()
    sid = ""
    wialon.sid = "028fa99a8486358f4c237444a502fa3b"
    t1 = 1
    t2 = 1
    mess = wialon.messages_load_interval({
        "itemId": 12351316,
        "timeFrom": 1667321999,
        # "timeFrom": 1669822799,
        "timeTo": 1669913999,
        "flags": 0x0000,
        "flagsMask": 0xFF00,
        "loadCount": 0xffffffff
    })
    mess_block = mess['messages']
    # print(mess_block)
    return mess_block

last_mess = load_test_mess()

if last_mess:
    for mess in last_mess:
        if 'pos' in mess and mess['pos']:
            if 'x' in mess['pos'] and 'y' in mess['pos']:
                print(mess['pos']['x'], mess['pos']['y'])