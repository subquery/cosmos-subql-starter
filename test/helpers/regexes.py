import re

block_id_regex = re.compile("^\w{64}$")
tx_id_regex = block_id_regex
msg_id_regex = re.compile("^\w{64}-\d+$")
event_id_regex = re.compile("^\w{64}-\d+-\d+$")
native_addr_id_regex = re.compile("^fetch\w{64}-\d+-\d+$")
