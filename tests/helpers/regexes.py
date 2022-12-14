import re

block_id_regex = re.compile("^\w{64}$")  # noqa: W605
tx_id_regex = block_id_regex
msg_id_regex = re.compile("^\w{64}-\d+$")  # noqa: W605
event_id_regex = re.compile("^\w{64}-\d+-\d+$")  # noqa: W605
event_attr_id_regex = re.compile("^\w{64}-\d+-\d+-\d+$")  # noqa: W605
