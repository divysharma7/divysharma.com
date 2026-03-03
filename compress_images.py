from PIL import Image
import os

images = [
    'public/pixel-avatar.jpg',
    'public/bot-avatar-transparent.png'
]

for img_path in images:
    target = os.getcwd() + "/" + img_path
    if os.path.exists(target):
        img = Image.open(target)
        img.thumbnail((400, 400)) # Scale it down
        webp_path = os.path.splitext(target)[0] + '.webp'
        img.save(webp_path, 'WEBP', quality=80)
        print(f"Saved {webp_path}")
    else:
        print(f"Skipped missing {target}")
