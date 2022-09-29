import json
from typing import Dict
from urllib.request import urlopen


def download_json(json_url: str) -> Dict:
    # TODO: can we do this as a stream?

    with urlopen(json_url) as response:
        # TODO: handle error
        data = json.loads(response.read())

    return data
