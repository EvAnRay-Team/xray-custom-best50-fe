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

canvas_width, canvas_height = 1700, 711
canvas = Image.new('RGBA', (canvas_width, canvas_height), (255, 255, 255, 0))

#背景板
frame_image_path = '代码中自定义图片素材/UI_Frame_105601.png'
frame_image = Image.open(frame_image_path).convert('RGBA')
frame_image = frame_image.resize((1700, 711), Image.LANCZOS)
canvas = alpha_composite(canvas, frame_image, (0, 0))

# ==================== 显示控制设置开始 ====================
# 在此处可以控制各个元素的显示/关闭
SHOW_LEFT_CHARA = False    # 是否显示最左侧旅行伙伴（True显示/False关闭）
SHOW_CHARAS = False        # 是否显示右侧旅行伙伴（True显示/False关闭）
SHOW_recommend =True
# ==================== 显示控制设置结束 ====================

#最左侧旅行伙伴
if SHOW_LEFT_CHARA:  # 新增：显示控制判断
    mask_path = 'chara/left_chara_mask.png'                           # mask文件路径位置
    target_image_path = '代码中自定义图片素材/UI_Chara_200104.png'      # 被指导透明度文件位置
    target_size = (485, 485)                                          # 最左侧旅行伙伴尺寸
    target_position = (-80, 226)                                      # 最左侧旅行伙伴位置
    try:
        target_image = Image.open(target_image_path).convert('RGBA')
        target_image = target_image.resize(target_size, Image.LANCZOS)
        mask_image = Image.open(mask_path).convert('L')
        
        # ==================== 手动合成阿尔法代码开始 ====================
        # 创建新的目标图片，用于存储应用mask后的结果
        masked_target_image = Image.new('RGBA', target_size, (0, 0, 0, 0))
        
        # 手动将mask应用到目标图片的每个像素
        for x in range(target_size[0]):
            for y in range(target_size[1]):
                # 计算在mask图像中的对应位置
                mask_x = target_position[0] + x
                mask_y = target_position[1] + y
                
                # 获取目标图片的原始像素
                target_pixel = target_image.getpixel((x, y))
                original_alpha = target_pixel[3]  # 原始alpha值
                
                # 检查是否在mask范围内
                if 0 <= mask_x < canvas_width and 0 <= mask_y < canvas_height:
                    # 获取mask的alpha值（白色=255=不透明，黑色=0=透明）
                    mask_alpha_value = mask_image.getpixel((mask_x, mask_y))
                    
                    # 方法2：结合原始alpha和mask alpha（乘法混合）
                    new_alpha = int(original_alpha * (mask_alpha_value / 255.0))
                    
                else:
                    # 如果超出mask范围，设置为完全透明
                    new_alpha = 0
                
                # 创建新的像素，保持RGB不变，只修改Alpha通道
                new_pixel = (
                    target_pixel[0],  # R
                    target_pixel[1],  # G
                    target_pixel[2],  # B
                    new_alpha         # 新的alpha值
                )
                
                # 设置新图片的像素
                masked_target_image.putpixel((x, y), new_pixel)
        
        # ==================== 手动合成阿尔法代码结束 ====================
        
        # 将处理后的图片合成到画布上
        canvas = alpha_composite(canvas, masked_target_image, target_position)
        
        print("最左侧旅行伙伴合成成功！")
        print(f"目标图片位置: {target_position}")
        print(f"目标图片尺寸: {target_size}")

    except Exception as e:
        print(f"应用mask时出错: {e}")
        import traceback
        traceback.print_exc()
        
    # 最左侧旅行伙伴等级底板
    level_image_path = 'chara/left_chara_frama_7.png'
    level_image = Image.open(level_image_path).convert('RGBA')
    canvas = alpha_composite(canvas, level_image, (58, 557))

    # 最左侧旅行伙伴等级数字
    draw = ImageDraw.Draw(canvas)
    font = ImageFont.truetype("font/FOT-NewRodinProN-EB.otf", 30)
    text = '9999'
    text_position = (153, 574)
    text_color = (255, 255, 255, 255)
    draw.text(text_position, text, fill=text_color, font=font)
else:
    print("最左侧旅行伙伴已关闭显示")

# ==================== CHARA代码开始 ====================
if SHOW_CHARAS:  # 新增：显示控制判断
    # 在此处可以调整右侧旅行伙伴的位置、间隔和文件路径

    # chara基础设置
    chara_start_position = (323, 283)  # 第一个chara的起始位置 (x, y)
    chara_count = 4                    # chara的数量
    chara_spacing = 224                # chara之间的统一间隔（像素）

    # 第一个Chara的通用设置（其他Chara将使用这些设置）
    first_chara_config = {
        'canvas_size': (226, 429),                        # chara画布尺寸
        'target_size': (327, 327),                        # 角色图片尺寸
        'internal_position': (-44, 67),                   # 角色在画布内位置
    }

    # 每个chara的单独文件路径和等级文字设置
    chara_configs = [
        {   # chara 1 配置
            'base_image': 'chara/chara_base_7.png',           # 底板文件
            'target_image': '代码中自定义图片素材/UI_Chara_000301.png',  # 角色文件
            'frame_image': 'chara/chara_frame_7.png',         # 边框文件
            'level_text': '9999'                              # 等级文字
        },
        {   # chara 2 配置
            'base_image': 'chara/chara_base_6.png',           # 可以设置为不同文件
            'target_image': '代码中自定义图片素材/UI_Chara_000302.png',
            'frame_image': 'chara/chara_frame_6.png',
            'level_text': '8888'                              # 不同等级
        },
        {   # chara 3 配置
            'base_image': 'chara/chara_base_5.png',
            'target_image': '代码中自定义图片素材/UI_Chara_000303.png',
            'frame_image': 'chara/chara_frame_5.png',
            'level_text': '7777'
        },
        {   # chara 4 配置
            'base_image': 'chara/chara_base_4.png',
            'target_image': '代码中自定义图片素材/UI_Chara_000304.png',
            'frame_image': 'chara/chara_frame_4.png',
            'level_text': '6666'
        }
    ]

    # 统一的mask路径（不可自定义）
    mask_path = 'chara/chara_mask.png'

    for i in range(chara_count):
        # 获取当前chara的配置
        custom_config = chara_configs[i]
        
        # 合并配置：使用第一个Chara的通用设置 + 当前Chara的自定义设置
        config = {**first_chara_config, **custom_config}
        
        # 计算当前chara的位置（使用统一间隔）
        chara_x = chara_start_position[0] + i * chara_spacing
        chara_y = chara_start_position[1]
        
        # 创建chara画布
        chara_canvas = Image.new('RGBA', config['canvas_size'], (255, 255, 255, 0))
        
        # 旅行伙伴底板
        try:
            frame_image_path = config['base_image']
            frame_image = Image.open(frame_image_path).convert('RGBA')
            frame_image = frame_image.resize(config['canvas_size'], Image.LANCZOS)
            chara_canvas = alpha_composite(chara_canvas, frame_image, (0, 0))
        except Exception as e:
            print(f"Chara {i+1} 底板加载失败: {e}")
        
        # 旅行伙伴角色
        try:
            target_image_path = config['target_image']
            target_image = Image.open(target_image_path).convert('RGBA')
            target_image = target_image.resize(config['target_size'], Image.LANCZOS)
            mask_image = Image.open(mask_path).convert('L')
            
            # 创建新的目标图片，用于存储应用mask后的结果
            masked_target_image = Image.new('RGBA', config['target_size'], (0, 0, 0, 0))
            
            # 手动将mask应用到目标图片的每个像素
            for x in range(config['target_size'][0]):
                for y in range(config['target_size'][1]):
                    # 计算在mask图像中的对应位置（相对于chara画布）
                    mask_x = config['internal_position'][0] + x
                    mask_y = config['internal_position'][1] + y
                    
                    # 获取目标图片的原始像素
                    target_pixel = target_image.getpixel((x, y))
                    original_alpha = target_pixel[3]
                    
                    # 检查是否在mask范围内
                    if 0 <= mask_x < config['canvas_size'][0] and 0 <= mask_y < config['canvas_size'][1]:
                        mask_alpha_value = mask_image.getpixel((mask_x, mask_y))
                        new_alpha = int(original_alpha * (mask_alpha_value / 255.0))
                    else:
                        new_alpha = 0
                    
                    new_pixel = (target_pixel[0], target_pixel[1], target_pixel[2], new_alpha)
                    masked_target_image.putpixel((x, y), new_pixel)
            
            # 将处理后的图片合成到chara画布上
            chara_canvas = alpha_composite(chara_canvas, masked_target_image, config['internal_position'])
            
        except Exception as e:
            print(f"Chara {i+1} 角色加载失败: {e}")
            import traceback
            traceback.print_exc()
        
        # 旅行伙伴上框
        try:
            frame_image_path = config['frame_image']
            frame_image = Image.open(frame_image_path).convert('RGBA')
            frame_image = frame_image.resize(config['canvas_size'], Image.LANCZOS)
            chara_canvas = alpha_composite(chara_canvas, frame_image, (0, 0))
        except Exception as e:
            print(f"Chara {i+1} 边框加载失败: {e}")
        
        # 旅行伙伴等级
        try:
            draw = ImageDraw.Draw(chara_canvas)
            font_lv = ImageFont.truetype("font/RoGSanSrfStd-UB.otf", 20)
            font_level = ImageFont.truetype("font/FOT-NewRodinProN-EB.otf", 30)
            
            text_lv = 'Lv'
            text_level = config['level_text']
            
            # 计算文本尺寸和位置
            bbox_lv = draw.textbbox((0, 0), text_lv, font=font_lv)
            bbox_level = draw.textbbox((0, 0), text_level, font=font_level)
            
            width_lv = bbox_lv[2] - bbox_lv[0]
            width_level = bbox_level[2] - bbox_level[0]
            total_width = width_lv + width_level
            
            canvas_width_chara = chara_canvas.width
            start_x = (canvas_width_chara - total_width) // 2
            y_position = 17
            
            lv_x = start_x
            level_x = start_x + width_lv + 7
            
            text_color = (255, 255, 255, 255)
            draw.text((lv_x, y_position + 9), text_lv, fill=text_color, font=font_lv)
            draw.text((level_x, y_position), text_level, fill=text_color, font=font_level)
        except Exception as e:
            print(f"Chara {i+1} 等级文字绘制失败: {e}")
        
        # 将chara合成到主画布上
        canvas = alpha_composite(canvas, chara_canvas, (chara_x, chara_y))
        
        print(f"Chara {i+1} 合成成功！位置: ({chara_x}, {chara_y})")
else:
    print("右侧旅行伙伴已关闭显示")
# ==================== CHARA代码结束 ====================

if SHOW_recommend:  # 新增：显示控制判断
    # ==================== 推荐定数代码开始 ====================
    try:
        # 示例代码：
        recommend_path = 'recommend/prism_rec.png'
        recommend_image = Image.open(recommend_path).convert('RGBA')
        recommend_image = recommend_image.resize((998, 394), Image.LANCZOS)
        canvas = alpha_composite(canvas, recommend_image, (60, 260))
        
        print("推荐定数合成成功！")
        
    except Exception as e:
        print(f"推荐定数加载失败: {e}")
        import traceback
        traceback.print_exc()
    
    # ==================== 推荐定数代码结束 ====================
else:
    print("推荐定数已关闭显示")

# ==================== 姓名框代码开始 ====================
# 在此处可以调整姓名板的位置和大小
plate_position = (14, 14)  # 调整姓名板位置 (x, y)
plate_width, plate_height = 1166, 210  # 调整姓名板大小比例

# 创建姓名板画布
plate_canvas = Image.new('RGBA', (plate_width, plate_height), (255, 255, 255, 0))

# 加载并调整姓名框
plate_image_path = '代码中自定义图片素材/UI_Plate_458012.png'
plate = Image.open(plate_image_path).convert('RGBA')
plate = plate.resize((1104, 178), Image.LANCZOS)
plate_canvas.paste(plate, (32, 27), plate.split()[3] if plate.mode == 'RGBA' else None)
plate_canvas = alpha_composite(plate_canvas, plate, (32, 27))

# 加载并调整头像
icon_image_path = '代码中自定义图片素材/UI_Icon_000301.png'
icon_image = Image.open(icon_image_path).convert('RGBA')
icon_image = icon_image.resize((150, 150), Image.LANCZOS)
plate_canvas = alpha_composite(plate_canvas, icon_image, (46, 41))

# 加载名字图像
name_image_path = 'nameplate/name.png'
name_image = Image.open(name_image_path).convert('RGBA')
plate_canvas = alpha_composite(plate_canvas, name_image, (0, 0))

# 加载rat框
rat_image_path = 'nameplate/rat/rat_150.png'
rat_image = Image.open(rat_image_path).convert('RGBA')
plate_canvas = alpha_composite(plate_canvas, rat_image, (-3, 0))

# 加载段位图标
dan_image_path = 'nameplate/dan/fbr_14.png'
dan_image = Image.open(dan_image_path).convert('RGBA')
plate_canvas = alpha_composite(plate_canvas, dan_image, (0, 0))

# 加载友人对战图标
fbr_image_path = 'nameplate/class/class_25.png'
fbr_image = Image.open(fbr_image_path).convert('RGBA')
plate_canvas = alpha_composite(plate_canvas, fbr_image, (0, -2))

# 加载称号框
title_image_path = 'nameplate/title/15000.png'
title_image = Image.open(title_image_path).convert('RGBA')
plate_canvas = alpha_composite(plate_canvas, title_image, (0, 0))

# 玩家Rating
draw = ImageDraw.Draw(plate_canvas)
font = ImageFont.truetype("font/江城圆体 500W.ttf", 29)
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
draw = ImageDraw.Draw(plate_canvas)
font = ImageFont.truetype("font/江城圆体 500W.ttf", 40)
text = '客制化Best50'
text_position = (218, 102)
text_color = (0, 0, 0, 255)
draw.text(text_position, text, fill=text_color, font=font)

# 玩家Rating总和
draw = ImageDraw.Draw(plate_canvas)
font = ImageFont.truetype("font/RoGSanSrfStd-Bd.otf", 20)
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

# 将姓名板合成到主画布上（最顶层）
canvas = alpha_composite(canvas, plate_canvas, plate_position)
# ==================== 姓名框代码结束 ====================

canvas.show()