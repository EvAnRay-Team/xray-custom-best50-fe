from PIL import Image, ImageDraw, ImageFont

def alpha_composite(dest, src, position):
    """手动实现 Alpha 合成"""
    x, y = position
    src_width, src_height = src.size
    dest_width, dest_height = dest.size
    
    for i in range(src_width):
        for j in range(src_height):
            if x + i < dest_width and y + j < dest_height:
                # 获取源像素和目标像素
                src_pixel = src.getpixel((i, j))
                dest_pixel = dest.getpixel((x + i, y + j))
                
                # 计算 Alpha 混合
                src_alpha = src_pixel[3] / 255.0
                dest_alpha = dest_pixel[3] / 255.0
                
                # 计算最终 Alpha
                out_alpha = src_alpha + dest_alpha * (1 - src_alpha)
                
                if out_alpha == 0:
                    out_pixel = (0, 0, 0, 0)
                else:
                    # 计算混合后的 RGB 值
                    out_red = int((src_pixel[0] * src_alpha + dest_pixel[0] * dest_alpha * (1 - src_alpha)) / out_alpha)
                    out_green = int((src_pixel[1] * src_alpha + dest_pixel[1] * dest_alpha * (1 - src_alpha)) / out_alpha)
                    out_blue = int((src_pixel[2] * src_alpha + dest_pixel[2] * dest_alpha * (1 - src_alpha)) / out_alpha)
                    
                    out_pixel = (out_red, out_green, out_blue, int(out_alpha * 255))
                
                # 设置目标像素
                dest.putpixel((x + i, y + j), out_pixel)
    
    return dest

canvas_width, canvas_height = 1136, 205
canvas = Image.new('RGBA', (canvas_width, canvas_height), (255, 255, 255, 0))

# 加载并调整姓名框
plate_image_path = 'nameplate/UI_Plate_458012.png'
plate = Image.open(plate_image_path).convert('RGBA')
plate = plate.resize((1104, 178), Image.LANCZOS)
canvas.paste(plate, (32, 27), plate.split()[3] if plate.mode == 'RGBA' else None)
canvas = alpha_composite(canvas, plate, (32, 27))

# 加载并调整头像
icon_image_path = 'nameplate/UI_Icon_000301.png'
icon_image = Image.open(icon_image_path).convert('RGBA')
icon_image = icon_image.resize((150, 150), Image.LANCZOS)
canvas = alpha_composite(canvas, icon_image, (46, 41))

# 加载名字图像
name_image_path = 'nameplate/name.png'
name_image = Image.open(name_image_path).convert('RGBA')
canvas = alpha_composite(canvas, name_image, (0, 0))

# 加载rat框
rat_image_path = 'nameplate/rat/rat_150.png'
rat_image = Image.open(rat_image_path).convert('RGBA')
canvas = alpha_composite(canvas, rat_image, (-3, 0))

# 加载段位图标
dan_image_path = 'nameplate/dan/fbr_14.png'
dan_image = Image.open(dan_image_path).convert('RGBA')
canvas = alpha_composite(canvas, dan_image, (0, 0))

# 加载友人对战图标
fbr_image_path = 'nameplate/class/class_25.png'
fbr_image = Image.open(fbr_image_path).convert('RGBA')
canvas = alpha_composite(canvas, fbr_image, (0, -2))

# 加载称号框
title_image_path = 'nameplate/title/15000.png'
title_image = Image.open(title_image_path).convert('RGBA')
canvas = alpha_composite(canvas, title_image, (0, 0))

# 玩家Rating
draw = ImageDraw.Draw(canvas)
font = ImageFont.truetype("nameplate/字体/江城圆体 500W.ttf", 29)
text = '16500'
text_position = (428, 47)
text_color = (255, 218, 72, 255)

#Rating字符间距
letter_spacing = 3.9
total_width = 0
for char in text:
    total_width += font.getsize(char)[0] + letter_spacing
total_width -= letter_spacing 
x = text_position[0] - total_width
y = text_position[1]
for char in text:
    char_width = font.getsize(char)[0]
    draw.text((x, y), char, fill=text_color, font=font)
    x += char_width + letter_spacing

# 玩家昵称
draw = ImageDraw.Draw(canvas)
font = ImageFont.truetype("nameplate/字体/江城圆体 500W.ttf", 40)
text = '客制化Best50'
text_position = (218, 102)
text_color = (0, 0, 0, 255)
draw.text(text_position, text, fill=text_color, font=font)

# 玩家Rating总和
draw = ImageDraw.Draw(canvas)
font = ImageFont.truetype("nameplate/字体/RoGSanSrfStd-Bd.otf", 20)
text = '旧版本*****+新版本****'
text_position = (260, 165)
text_color = (255, 255, 255, 255)
draw.text(text_position, text, fill=text_color, font=font)
outline_color = (60, 60, 60, 255)
outline_width = 1

for dx in [-outline_width, 0, outline_width]:
    for dy in [-outline_width, 0, outline_width]:
        if dx != 0 or dy != 0:
            draw.text(
                (text_position[0] + dx, text_position[1] + dy),
                text,
                fill=outline_color,
                font=font
            )
draw.text(text_position,  text, fill=text_color, font=font)

canvas.show()