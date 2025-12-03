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


#最左侧旅行伙伴
mask_path = 'chara/left_chara_mask.png'                           # mask文件路径位置
target_image_path = '代码中自定义图片素材/UI_Chara_000603.png'                   # 被指导透明度文件位置
target_size = (485, 485)                                          #最左侧旅行伙伴尺寸
target_position = (-80, 226)                                      #最左侧旅行伙伴位置
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
                
                # 方法1：直接使用mask的alpha值
                # new_alpha = mask_alpha_value
                
                # 方法2：结合原始alpha和mask alpha（乘法混合）
                new_alpha = int(original_alpha * (mask_alpha_value / 255.0))
                
                # 方法3：取两者中较小的值（更严格的透明度控制）
                # new_alpha = min(original_alpha, mask_alpha_value)
                
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
    
    print("Mask透明度应用成功！")
    print(f"目标图片位置: {target_position}")
    print(f"目标图片尺寸: {target_size}")
    
except Exception as e:
    print(f"应用mask时出错: {e}")
    import traceback
    traceback.print_exc()

canvas.show()