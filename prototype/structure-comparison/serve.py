"""THROWAWAY: compare three layouts on the existing blog routes, ?variant=A|B|C.
Run from anywhere: python3 prototype/structure-comparison/serve.py
Reads the existing Jekyll build; never modifies production files.
"""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from urllib.parse import urlsplit, unquote

HERE = Path(__file__).resolve().parent
SITE = HERE.parents[1] / '_site'


class Preview(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(SITE), **kwargs)

    def do_GET(self):
        route = unquote(urlsplit(self.path).path)
        if route in ('/__prototype__/style.css', '/__prototype__/preview.js'):
            file = HERE / route.rsplit('/', 1)[1]
            mime = 'text/css' if file.suffix == '.css' else 'text/javascript'
            self.reply(file.read_bytes(), mime)
            return
        file = (SITE / route.lstrip('/')).resolve()
        if not file.is_relative_to(SITE.resolve()):
            self.send_error(404)
            return
        if file.is_dir():
            file /= 'index.html'
        if file.is_file() and file.suffix == '.html':
            html = file.read_text()
            # Jekyll's compressor omits optional head/body closing tags.
            html = html.replace('<body', '<link rel="stylesheet" href="/__prototype__/style.css"><body', 1)
            html += '<script src="/__prototype__/preview.js"></script>'
            self.reply(html.encode(), 'text/html')
            return
        super().do_GET()

    def reply(self, data, mime):
        self.send_response(200)
        self.send_header('Content-Type', mime + '; charset=utf-8')
        self.send_header('Content-Length', str(len(data)))
        self.send_header('Cache-Control', 'no-store')
        self.end_headers()
        self.wfile.write(data)


if __name__ == '__main__':
    print('Blog structure prototype: http://127.0.0.1:4174/?variant=D', flush=True)
    ThreadingHTTPServer(('127.0.0.1', 4174), Preview).serve_forever()
