import re

block_id_regex = re.compile("^\w{64}$")
tx_id_regex = block_id_regex
msg_id_regex = re.compile("^\w{64}-\d+$")
event_id_regex = re.compile("^\w{64}-\d+-\d+$")
event_attr_id_regex = re.compile("^\w{64}-\d+-\d+-\d+$")
