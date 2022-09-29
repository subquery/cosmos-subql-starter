import json
from http.server import BaseHTTPRequestHandler, HTTPServer

from .genesis_data import test_genesis_data


class _TestHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("content-type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(test_genesis_data).encode())


def serve_test_data(cls):
    cls.server = HTTPServer(("", cls.test_port), _TestHTTPRequestHandler)
    cls.server.serve_forever()
