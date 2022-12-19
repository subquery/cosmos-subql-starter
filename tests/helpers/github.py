from typing import BinaryIO, Optional

import requests

GITHUB_API__REPO_URL = "https://api.github.com/repos"


def download_github_release_asset(
    owner: str,
    repo: str,
    target_filename: str,
    writer: BinaryIO,
    token: Optional[str] = None,
    *,
    version: Optional[str] = "latest",
):

    auth = None
    if token is not None:
        auth = (token, "")

    releases_base_url = f"{GITHUB_API__REPO_URL}/{owner}/{repo}/releases"
    if version == "latest":
        release_id = "latest"
    else:
        with requests.get(releases_base_url, auth=auth) as r:
            r.raise_for_status()
            releases = list(
                filter(
                    lambda x: x.get("name", "") == version,
                    r.json(),
                )
            )
            assert len(releases) == 1
            release_id = releases[0]["id"]

    # query the latest information about the release
    release_url = f"{releases_base_url}/{release_id}"
    r = requests.get(release_url, auth=auth)
    r.raise_for_status()

    # find the release binary
    assets = list(
        filter(
            lambda x: x.get("name", "") == target_filename,
            r.json().get("assets", []),
        )
    )
    assert len(assets) == 1

    # build link to the asset we want to download
    target_url = (
        f'{GITHUB_API__REPO_URL}/{owner}/{repo}/releases/assets/{assets[0]["id"]}'
    )

    headers = {"Accept": "application/octet-stream"}

    with requests.get(target_url, stream=True, auth=(token, ""), headers=headers) as r:
        r.raise_for_status()

        for chunk in r.iter_content(chunk_size=8192):
            writer.write(chunk)
