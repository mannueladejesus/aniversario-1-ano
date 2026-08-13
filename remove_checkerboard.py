from PIL import Image
from collections import deque

src = "/home/ubuntu/webdev-static-assets/mannuela-fada-final.png"
dst = "/home/ubuntu/webdev-static-assets/mannuela-fada-web.png"
img = Image.open(src).convert("RGBA")
pix = img.load()
w, h = img.size

def checker_like(x, y):
    r, g, b, a = pix[x, y]
    return a > 0 and max(r, g, b) - min(r, g, b) <= 8 and r >= 220 and g >= 220 and b >= 220

seen = bytearray(w * h)
q = deque()
for x in range(w):
    q.append((x, 0)); q.append((x, h - 1))
for y in range(h):
    q.append((0, y)); q.append((w - 1, y))
while q:
    x, y = q.popleft()
    i = y * w + x
    if seen[i] or not checker_like(x, y):
        continue
    seen[i] = 1
    pix[x, y] = (pix[x, y][0], pix[x, y][1], pix[x, y][2], 0)
    for nx, ny in ((x-1,y),(x+1,y),(x,y-1),(x,y+1)):
        if 0 <= nx < w and 0 <= ny < h:
            j = ny * w + nx
            if not seen[j]: q.append((nx, ny))
img.save(dst, "PNG", optimize=True)
print(dst)
