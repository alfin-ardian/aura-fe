from collections import deque
from shutil import copyfile
from PIL import Image

src_backup = r"C:\Users\devel\AppData\Local\Temp\hero-in.png"
out_public = r"d:\KADA\Capstone\auraai-frontend\public\hero.png"
out_root = r"d:\KADA\Capstone\hero.png"

copyfile(src_backup, out_public)

im = Image.open(out_public).convert("RGBA")
px = im.load()
w, h = im.size
MARGIN = 90


def is_bg(a: int, r: int, g: int, b: int) -> bool:
    if a < 8:
        return True
    sat = max(r, g, b) - min(r, g, b)
    return a > 180 and r >= 215 and g >= 215 and b >= 215 and sat <= 14


visited = [[False] * h for _ in range(w)]
q: deque[tuple[int, int]] = deque()

for y in range(h):
    for x in range(w):
        near_edge = x < MARGIN or y < MARGIN or x >= w - MARGIN or y >= h - MARGIN
        if not near_edge:
            continue
        r, g, b, a = px[x, y]
        if is_bg(a, r, g, b):
            visited[x][y] = True
            q.append((x, y))

cleared = 0
while q:
    x, y = q.popleft()
    r, g, b, a = px[x, y]
    if a > 0 and is_bg(a, r, g, b):
        px[x, y] = (0, 0, 0, 0)
        cleared += 1
    for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
        if 0 <= nx < w and 0 <= ny < h and not visited[nx][ny]:
            rr, gg, bb, aa = px[nx, ny]
            if is_bg(aa, rr, gg, bb):
                visited[nx][ny] = True
                q.append((nx, ny))

im.save(out_public, "PNG")
copyfile(out_public, out_root)

r, g, b, a = px[60, 70]
mr, mg, mb, ma = px[200, 300]
er, eg, eb, ea = px[5, 5]
print(f"cleared={cleared} (60,70)A={a} midA={ma} midRGB={mr},{mg},{mb} edgeA={ea}")
