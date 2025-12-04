import type { DialogContentInstance } from '@primereact/types/shared/dialog';
import { useState, useEffect, useRef } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
// @ts-ignore - dom-to-image-more 没有类型定义
// import domtoimage from "dom-to-image-more";
import { Fieldset } from "primereact/fieldset";
import { Motion } from "@primereact/core/motion";
import { MinusIcon, PlusIcon } from "@primereact/icons";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Chip } from "primereact/chip";
import { InputGroup } from "primereact/inputgroup";
import { useTranslation } from "react-i18next";
import frameDropdownData from "../dropdown/frame_dropdown_data.json";
import iconDropdownData from "../dropdown/icon_dropdown_data.json";
import plateDropdownData from "../dropdown/plate_dropdown_data.json";
import charaDropdownData from "../dropdown/chara_dropdown_data.json";

type VisualOption = { label: string; value: string; image?: string };

type DropdownItem = {
  name_str: string;
  name_id: number;
};

type DropdownGenre = {
  genre: string;
  items: DropdownItem[];
};

// OSS 资源基础地址，后续如果迁移存储只需修改这里
const OSS_BASE_URL = "https://xray-studio.oss-cn-shanghai.aliyuncs.com";

const backgrounds: VisualOption[] = [
  { label: "DX", value: "dx"},
  { label: "Splash", value: "splash"},
  { label: "Splash Plus", value: "splashp"},
  { label: "Univers", value: "uni"},
  { label: "Festival", value: "fes"},
  { label: "Festival Plus", value: "fesp"},
  { label: "Buddies", value: "bud"},
  { label: "Buddies Plus", value: "budp"},
  { label: "Prism", value: "prism"},
  { label: "Prism Plus", value: "prismp"},
];

const rankSets: VisualOption[] = [
  { label: "Default", value: "defaut" },
  { label: "DX", value: "dx" },
  { label: "Festival", value: "fes" },
  { label: "Prism", value: "prism" },
  { label: "Splash", value: "splash" },
  { label: "Univers", value: "uni" },
  { label: "Buddies", value: "bud" },
];

const danSets: VisualOption[] = [
  { label: "初心者", value: "00" },
  { label: "初段", value: "01" },
  { label: "二段", value: "02" },
  { label: "三段", value: "03" },
  { label: "四段", value: "04" },
  { label: "五段", value: "05" },
  { label: "六段", value: "06" },
  { label: "七段", value: "07" },
  { label: "八段", value: "08" },
  { label: "九段", value: "09" },
  { label: "十段", value: "10" },
  { label: "皆伝", value: "11" },
  { label: "真初段", value: "12" },
  { label: "真二段", value: "13" },
  { label: "真三段", value: "14" },
  { label: "真四段", value: "15" },
  { label: "真五段", value: "16" },
  { label: "真六段", value: "17" },
  { label: "真七段", value: "18" },
  { label: "真八段", value: "19" },
  { label: "真九段", value: "20" },
  { label: "真十段", value: "21" },
  { label: "真皆伝", value: "22" },
  { label: "里皆伝", value: "23" },
];


const classSets: VisualOption[] = [
  { label: "B5", value: "00" },
  { label: "B4", value: "01" },
  { label: "B3", value: "02" },
  { label: "B2", value: "03" },
  { label: "B1", value: "04" },

  { label: "A5", value: "05" },
  { label: "A4", value: "06" },
  { label: "A3", value: "07" },
  { label: "A2", value: "08" },
  { label: "A1", value: "09" },

  { label: "S5", value: "10" },
  { label: "S4", value: "11" },
  { label: "S3", value: "12" },
  { label: "S2", value: "13" },
  { label: "S1", value: "14" },

  { label: "SS5", value: "15" },
  { label: "SS4", value: "16" },
  { label: "SS3", value: "17" },
  { label: "SS2", value: "18" },
  { label: "SS1", value: "19" },

  { label: "SSS5", value: "20" },
  { label: "SSS4", value: "21" },
  { label: "SSS3", value: "22" },
  { label: "SSS2", value: "23" },
  { label: "SSS1", value: "24" },

  { label: "Legend", value: "25" },
];

const recommendSets: VisualOption[] = [
  { label: "Default", value: "defaut" },
  { label: "Dx", value: "dx" },
  { label: "Splash", value: "splash" },  
  { label: "Univers", value: "uni" },
  { label: "Festival", value: "fes" },  
  { label: "Buddies", value: "bud" },
  { label: "Circle", value: "circle" },  
  { label: "Prism", value: "prism" },
]



type PreviewProps = { customData: FormData };

const PreviewCard = ({ customData }: PreviewProps) => {
  const baseW = 1700;
  const baseH = 2369;
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const [viewportWidth, setViewportWidth] = useState<number | null>(null);
  const mainTravelLevel = customData.travelConfigs?.[0]?.level ?? 1;

  useEffect(() => {
    const el = canvasRef.current;
    const parent = el?.parentElement;
    if (!parent) return;

    const update = () => {
      const parentWidth = parent.clientWidth || 1;
      const vh = typeof window !== "undefined" ? window.innerHeight : baseH;
      const vw = typeof window !== "undefined" ? window.innerWidth : baseW;

      setViewportWidth(vw);

      // 目标高度占视口高度的 85%
      const targetHeight = vh * 0.85;
      const scaleW = parentWidth / baseW;
      const scaleH = targetHeight / baseH;

      // 同时考虑宽度和高度，两者取较小值，兼顾 PC 和手机
      setScale(Math.min(scaleW, scaleH));
    };

    const ro = new ResizeObserver(update);
    update();
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  const isDesktop = viewportWidth && viewportWidth >= 1024;

  // const handleSaveScreenshot = async () => {
  //   if (!canvasRef.current) return;

  //   try {
  //     // 等待所有图片加载完成
  //     const images = canvasRef.current.querySelectorAll('img');
  //     const imagePromises = Array.from(images).map((img) => {
  //       if (img.complete) {
  //         return Promise.resolve();
  //       }
  //       return new Promise<void>((resolve, reject) => {
  //         img.onload = () => resolve();
  //         img.onerror = () => resolve(); // 即使加载失败也继续
  //         // 设置超时，避免无限等待
  //         setTimeout(() => resolve(), 5000);
  //       });
  //     });

  //     await Promise.all(imagePromises);

  //     // 临时移除所有边框样式和 transform（截图后会自动恢复）
  //     const originalStyles: Map<HTMLElement, { 
  //       border: string; 
  //       outline: string; 
  //       boxShadow: string;
  //       transform: string;
  //     }> = new Map();

  //     // 保存并移除 canvasRef 自身的 transform
  //     let originalCanvasTransform = '';
  //     if (canvasRef.current) {
  //       originalCanvasTransform = canvasRef.current.style.transform;
  //       canvasRef.current.style.transform = 'none';
  //     }

  //     const allElements = canvasRef.current.querySelectorAll('*');
  //     allElements.forEach((el) => {
  //       const htmlEl = el as HTMLElement;
  //       // 保存原始样式
  //       originalStyles.set(htmlEl, {
  //         border: htmlEl.style.border,
  //         outline: htmlEl.style.outline,
  //         boxShadow: htmlEl.style.boxShadow,
  //         transform: htmlEl.style.transform,
  //       });
  //       // 移除所有边框相关样式和 transform
  //       htmlEl.style.border = 'none';
  //       htmlEl.style.outline = 'none';
  //       htmlEl.style.boxShadow = 'none';
  //       htmlEl.style.transform = 'none';
  //     });

  //     try {
  //       // 使用 dom-to-image-more 截图，支持现代 CSS 特性
  //       // 注意：需要截图的是实际尺寸的内容，而不是缩放后的
  //       const dataUrl = await domtoimage.toPng(canvasRef.current, {
  //         quality: 1.0, // 最高质量
  //         cacheBust: true, // 强制刷新缓存
  //         bgcolor: '#ffffff', // 白色背景
  //         filter: (node: Node) => {
  //           // 过滤掉不需要的元素（如按钮等）
  //           if (node instanceof HTMLElement) {
  //             // 保留所有图片和内容元素
  //             return true;
  //           }
  //           return true;
  //         },
  //       });

  //       // 创建下载链接
  //       const link = document.createElement('a');
  //       link.href = dataUrl;
  //       link.download = `custom-best50-${Date.now()}.png`;
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //     } finally {
  //       // 恢复原始样式
  //       originalStyles.forEach((originalStyle, el) => {
  //         el.style.border = originalStyle.border;
  //         el.style.outline = originalStyle.outline;
  //         el.style.boxShadow = originalStyle.boxShadow;
  //         el.style.transform = originalStyle.transform;
  //       });
  //       // 恢复 canvasRef 的 transform
  //       if (canvasRef.current) {
  //         canvasRef.current.style.transform = originalCanvasTransform;
  //       }
  //     }
  //   } catch (error) {
  //     console.error('保存截图失败:', error);
  //     alert('保存截图失败，请重试');
  //   }
  // };

  return (
    <div>
      <Card
        style={{
          height: !isDesktop ? baseH * scale : undefined,
          width: isDesktop ? baseW * scale : undefined,
          overflow: "hidden",
        }}
      >
        <div style={{ height: baseH * scale }}>
          <div>


            <div
              ref={canvasRef}
              className="relative overflow-hidden"
              style={{
                width: baseW,
                height: baseH,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
            >

              <img
                src={typeof customData.frame === "number" ? `${OSS_BASE_URL}/frame/UI_Frame_${String(customData.frame).padStart(6, '0')}.png` : customData.frame}
                alt="框体"
                className="absolute top-0 left-0 w-full h-auto"
              />

              <img
                src={typeof customData.plate === "number" ? `${OSS_BASE_URL}/plate/UI_Plate_${String(customData.plate).padStart(6, '0')}.png` : customData.plate}
                alt="姓名框"
                style={{ position: "absolute", left: 32, top: 27, width: 1104, height: 178 }}
              />
              <img
                src={typeof customData.icon === "number" ? `${OSS_BASE_URL}/icon/UI_Icon_${String(customData.icon).padStart(6, '0')}.png` : customData.icon}
                alt="头像"
                style={{ position: "absolute", left: 46, top: 41, width: 150, height: 150 }}
              />
              <img
                src={`${OSS_BASE_URL}/rat/name.png`}
                alt="名字"
                style={{ position: "absolute", left: 0, top: 0 }}
              />
              <img
                src={`${OSS_BASE_URL}/rat/rat_150.png`}
                alt="rat"
                style={{ position: "absolute", left: -3, top: 0 }}
              />
              <img
                src={`${OSS_BASE_URL}/dan/dan_${customData.dan}.png`}
                alt="dan"
                style={{ position: "absolute", left: 0, top: 0 }}
              />




              <img
                src={`${OSS_BASE_URL}/class/class_${customData.gameClass}.png`}
                alt="fbr"
                style={{ position: "absolute", left: 0, top: -2 }}
              />
              <img
                src={`${OSS_BASE_URL}/title/15000.png`}
                alt="title"
                style={{ position: "absolute", left: 0, top: 0 }}
              />

              <span
                style={{ position: "absolute", left: 330, top: 41, fontSize: 28, color: "#FFDA48", letterSpacing: "4.1px", margin: 0, padding: 0 }}
              >
                16500
              </span>

              <span
                style={{ position: "absolute", left: 218, top: 91, fontSize: 40, color: "#000000", margin: 0, padding: 0 }}
              >
                客制化Best50
              </span>

              <img
                src={`${OSS_BASE_URL}/bg/${customData.background}.png`}
                alt="背景预览"
                className="h-full w-full object-cover"
              />


              {customData.frameMode === "recommend" ? (
                <>
                  <img
                    src={`${OSS_BASE_URL}/recommend/${customData.recommend}_rec.png`}
                    alt="推荐框体"
                    style={{ position: "absolute", left: 23, top: 269 }}
                  />
                </>
              ) : (
                <>
                  {/* 角色展示区域，参考 static/chara.py 的合成逻辑 */}
                  <div style={{position: "absolute",left: 23,top: 269,width: 998,height: 394,}}>
                    {/* 左侧角色底板 */}
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: 226,
                        height: 429,
                        overflow: "hidden",
                      }}
                    >
                      {/* base */}
                      <img
                        src={`${OSS_BASE_URL}/chara_temp/chara_base_6.png`}
                        alt="角色底板"
                        style={{ position: "absolute", left: 0, top: 0, width: 226, height: 429 }}
                      />

                      {/* 角色本体，使用 mask 裁切，参考 chara.py 的 mask 思路 */}
                      <div
                        style={{
                          position: "absolute",
                          left: -44,
                          top: 67,
                          width: 327,
                          height: 327,
                          overflow: "hidden",
                        }}
                      >
                        {/* TODO: 后续可以将 UI_Chara 的编号做成可配置，这里先用示例 ID 000301 */}
                        <img
                          src={`${OSS_BASE_URL}/demo/UI_Chara_000301.png`}
                          alt="角色"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>

                      {/* 上层角色边框 */}
                      <img
                        src={`${OSS_BASE_URL}/chara_temp/chara_frame_6.png`}
                        alt="角色边框"
                        style={{ position: "absolute", left: 0, top: 0, width: 226, height: 429 }}
                      />

                      {/* 等级文字：Lv + 1-9999，参考 chara.py 的居中排布 */}
                      <div
                        style={{
                          position: "absolute",
                          top: 10,
                          left: 0,
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "#FFFFFF",
                          textShadow: "0 0 4px rgba(0,0,0,0.8)",
                          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                        }}
                      >
                        <span style={{ fontSize: 20, marginRight: 4 }}>Lv</span>
                        <span style={{ fontSize: 30 }}>{mainTravelLevel}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{position: "absolute",left: 23+223*1,top: 269,width: 998,height: 394,}}>
                    {/* 左侧角色底板 */}
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: 226,
                        height: 429,
                        overflow: "hidden",
                      }}
                    >
                      {/* base */}
                      <img
                        src={`${OSS_BASE_URL}/chara_temp/chara_base_6.png`}
                        alt="角色底板"
                        style={{ position: "absolute", left: 0, top: 0, width: 226, height: 429 }}
                      />

                      {/* 角色本体，使用 mask 裁切，参考 chara.py 的 mask 思路 */}
                      <div
                        style={{
                          position: "absolute",
                          left: -44,
                          top: 67,
                          width: 327,
                          height: 327,
                          overflow: "hidden",
                        }}
                      >
                        {/* TODO: 后续可以将 UI_Chara 的编号做成可配置，这里先用示例 ID 000301 */}
                        <img
                          src={`${OSS_BASE_URL}/demo/UI_Chara_000301.png`}
                          alt="角色"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>

                      {/* 上层角色边框 */}
                      <img
                        src={`${OSS_BASE_URL}/chara_temp/chara_frame_6.png`}
                        alt="角色边框"
                        style={{ position: "absolute", left: 0, top: 0, width: 226, height: 429 }}
                      />

                      {/* 等级文字：Lv + 1-9999，参考 chara.py 的居中排布 */}
                      <div
                        style={{
                          position: "absolute",
                          top: 10,
                          left: 0,
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "#FFFFFF",
                          textShadow: "0 0 4px rgba(0,0,0,0.8)",
                          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                        }}
                      >
                        <span style={{ fontSize: 20, marginRight: 4 }}>Lv</span>
                        <span style={{ fontSize: 30 }}>{mainTravelLevel}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{position: "absolute",left: 23+223*2,top: 269,width: 998,height: 394,}}>
                    {/* 左侧角色底板 */}
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: 226,
                        height: 429,
                        overflow: "hidden",
                      }}
                    >
                      {/* base */}
                      <img
                        src={`${OSS_BASE_URL}/chara_temp/chara_base_6.png`}
                        alt="角色底板"
                        style={{ position: "absolute", left: 0, top: 0, width: 226, height: 429 }}
                      />

                      {/* 角色本体，使用 mask 裁切，参考 chara.py 的 mask 思路 */}
                      <div
                        style={{
                          position: "absolute",
                          left: -44,
                          top: 67,
                          width: 327,
                          height: 327,
                          overflow: "hidden",
                        }}
                      >
                        {/* TODO: 后续可以将 UI_Chara 的编号做成可配置，这里先用示例 ID 000301 */}
                        <img
                          src={`${OSS_BASE_URL}/demo/UI_Chara_000301.png`}
                          alt="角色"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>

                      {/* 上层角色边框 */}
                      <img
                        src={`${OSS_BASE_URL}/chara_temp/chara_frame_6.png`}
                        alt="角色边框"
                        style={{ position: "absolute", left: 0, top: 0, width: 226, height: 429 }}
                      />

                      {/* 等级文字：Lv + 1-9999，参考 chara.py 的居中排布 */}
                      <div
                        style={{
                          position: "absolute",
                          top: 10,
                          left: 0,
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "#FFFFFF",
                          textShadow: "0 0 4px rgba(0,0,0,0.8)",
                          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                        }}
                      >
                        <span style={{ fontSize: 20, marginRight: 4 }}>Lv</span>
                        <span style={{ fontSize: 30 }}>{mainTravelLevel}</span>
                      </div>
                    </div>
                  </div>


                  <div style={{position: "absolute",left: 23+223*3,top: 269,width: 998,height: 394,}}>
                    {/* 左侧角色底板 */}
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: 226,
                        height: 429,
                        overflow: "hidden",
                      }}
                    >
                      {/* base */}
                      <img
                        src={`${OSS_BASE_URL}/chara_temp/chara_base_6.png`}
                        alt="角色底板"
                        style={{ position: "absolute", left: 0, top: 0, width: 226, height: 429 }}
                      />

                      {/* 角色本体，使用 mask 裁切，参考 chara.py 的 mask 思路 */}
                      <div
                        style={{
                          position: "absolute",
                          left: -44,
                          top: 67,
                          width: 327,
                          height: 327,
                          overflow: "hidden",
                        }}
                      >
                        {/* TODO: 后续可以将 UI_Chara 的编号做成可配置，这里先用示例 ID 000301 */}
                        <img
                          src={`${OSS_BASE_URL}/demo/UI_Chara_000301.png`}
                          alt="角色"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>

                      {/* 上层角色边框 */}
                      <img
                        src={`${OSS_BASE_URL}/chara_temp/chara_frame_6.png`}
                        alt="角色边框"
                        style={{ position: "absolute", left: 0, top: 0, width: 226, height: 429 }}
                      />

                      {/* 等级文字：Lv + 1-9999，参考 chara.py 的居中排布 */}
                      <div
                        style={{
                          position: "absolute",
                          top: 10,
                          left: 0,
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "#FFFFFF",
                          textShadow: "0 0 4px rgba(0,0,0,0.8)",
                          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                        }}
                      >
                        <span style={{ fontSize: 20, marginRight: 4 }}>Lv</span>
                        <span style={{ fontSize: 30 }}>{mainTravelLevel}</span>
                      </div>
                    </div>
                  </div>


                  <div style={{position: "absolute",left: 23+223*4,top: 269,width: 998,height: 394,}}>
                    {/* 左侧角色底板 */}
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: 226,
                        height: 429,
                        overflow: "hidden",
                      }}
                    >
                      {/* base */}
                      <img
                        src={`${OSS_BASE_URL}/chara_temp/chara_base_6.png`}
                        alt="角色底板"
                        style={{ position: "absolute", left: 0, top: 0, width: 226, height: 429 }}
                      />

                      {/* 角色本体，使用 mask 裁切，参考 chara.py 的 mask 思路 */}
                      <div
                        style={{
                          position: "absolute",
                          left: -44,
                          top: 67,
                          width: 327,
                          height: 327,
                          overflow: "hidden",
                        }}
                      >
                        {/* TODO: 后续可以将 UI_Chara 的编号做成可配置，这里先用示例 ID 000301 */}
                        <img
                          src={`${OSS_BASE_URL}/demo/UI_Chara_000301.png`}
                          alt="角色"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>

                      {/* 上层角色边框 */}
                      <img
                        src={`${OSS_BASE_URL}/chara_temp/chara_frame_6.png`}
                        alt="角色边框"
                        style={{ position: "absolute", left: 0, top: 0, width: 226, height: 429 }}
                      />

                      {/* 等级文字：Lv + 1-9999，参考 chara.py 的居中排布 */}
                      <div
                        style={{
                          position: "absolute",
                          top: 10,
                          left: 0,
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "#FFFFFF",
                          textShadow: "0 0 4px rgba(0,0,0,0.8)",
                          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                        }}
                      >
                        <span style={{ fontSize: 20, marginRight: 4 }}>Lv</span>
                        <span style={{ fontSize: 30 }}>{mainTravelLevel}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}






              {/* card */}
              <div style={{ position: "absolute", left: 15, top: 749, width: 323, height: 137 }}>
                <img
                  src={`${OSS_BASE_URL}/cover/834.png`}
                  style={{ position: "absolute", left: 20, top: 18, width: 100, height: 100 }}
                />
                <img
                  src={`${OSS_BASE_URL}/card_bg/card_basic.png`}
                  style={{ position: "absolute", left: 0, top: 0, width: 323, height: 137 }}
                />
                <img
                  src={`${OSS_BASE_URL}/rank/${customData.rank}_rank_sssp.png`}
                  style={{ position: "absolute", left: 0, top: 0, width: 323, height: 137 }}
                />
                <img
                  src={`${OSS_BASE_URL}/bound/combo4.png`}
                  style={{ position: "absolute", left: 0, top: 0, width: 323, height: 137 }}
                />
                <img
                  src={`${OSS_BASE_URL}/bound/fs4.png`}
                  style={{ position: "absolute", left: 0, top: 0, width: 323, height: 137 }}
                />
                <img
                  src={`${OSS_BASE_URL}/star/star_5.png`}
                  style={{ position: "absolute", left: 0, top: 0, width: 323, height: 137 }}
                />
                <img
                  src={`${OSS_BASE_URL}/type/type_dx.png`}
                  style={{ position: "absolute", left: 0, top: 0, width: 323, height: 137 }}
                />
              </div>

              <div style={{ position: "absolute", left: 15 + 334, top: 749, width: 323, height: 137 }}>
                <img
                  src={`${OSS_BASE_URL}/cover/834.png`}
                  style={{ position: "absolute", left: 20, top: 18, width: 100, height: 100 }}
                />
                <img
                  src={`${OSS_BASE_URL}/card_bg/card_advanced.png`}
                  style={{ position: "absolute", left: 0, top: 0, width: 323, height: 137 }}
                />
                <img
                  src={`${OSS_BASE_URL}/rank/${customData.rank}_rank_sssp.png`}
                  style={{ position: "absolute", left: 0, top: 0, width: 323, height: 137 }}
                />
                <img
                  src={`${OSS_BASE_URL}/bound/combo4.png`}
                  style={{ position: "absolute", left: 0, top: 0, width: 323, height: 137 }}
                />
                <img
                  src={`${OSS_BASE_URL}/bound/fs4.png`}
                  style={{ position: "absolute", left: 0, top: 0, width: 323, height: 137 }}
                />
                <img
                  src={`${OSS_BASE_URL}/star/star_5.png`}
                  style={{ position: "absolute", left: 0, top: 0, width: 323, height: 137 }}
                />
                <img
                  src={`${OSS_BASE_URL}/type/type_dx.png`}
                  style={{ position: "absolute", left: 0, top: 0, width: 323, height: 137 }}
                />
              </div>

              <div style={{ position: "absolute", left: 15 + 334 * 2, top: 749, width: 323, height: 137 }}>
                <img
                  src={`${OSS_BASE_URL}/cover/834.png`}
                  style={{ position: "absolute", left: 20, top: 18, width: 100, height: 100 }}
                />
                <img
                  src={`${OSS_BASE_URL}/card_bg/card_expert.png`}
                  style={{ position: "absolute", left: 0, top: 0, width: 323, height: 137 }}
                />
                <img
                  src={`${OSS_BASE_URL}/rank/${customData.rank}_rank_sssp.png`}
                  style={{ position: "absolute", left: 0, top: 0, width: 323, height: 137 }}
                />
                <img
                  src={`${OSS_BASE_URL}/bound/combo4.png`}
                  style={{ position: "absolute", left: 0, top: 0, width: 323, height: 137 }}
                />
                <img
                  src={`${OSS_BASE_URL}/bound/fs4.png`}
                  style={{ position: "absolute", left: 0, top: 0, width: 323, height: 137 }}
                />
                <img
                  src={`${OSS_BASE_URL}/star/star_5.png`}
                  style={{ position: "absolute", left: 0, top: 0, width: 323, height: 137 }}
                />
                <img
                  src={`${OSS_BASE_URL}/type/type_dx.png`}
                  style={{ position: "absolute", left: 0, top: 0, width: 323, height: 137 }}
                />
              </div>

              <div style={{ position: "absolute", left: 15 + 334 * 3, top: 749, width: 323, height: 137 }}>
                <img
                  src={`${OSS_BASE_URL}/cover/834.png`}
                  style={{ position: "absolute", left: 20, top: 18, width: 100, height: 100 }}
                />
                <img
                  src={`${OSS_BASE_URL}/card_bg/card_master.png`}
                  style={{ position: "absolute", left: 0, top: 0, width: 323, height: 137 }}
                />
                <img
                  src={`${OSS_BASE_URL}/rank/${customData.rank}_rank_sssp.png`}
                  style={{ position: "absolute", left: 0, top: 0, width: 323, height: 137 }}
                />
                <img
                  src={`${OSS_BASE_URL}/bound/combo4.png`}
                  style={{ position: "absolute", left: 0, top: 0, width: 323, height: 137 }}
                />
                <img
                  src={`${OSS_BASE_URL}/bound/fs4.png`}
                  style={{ position: "absolute", left: 0, top: 0, width: 323, height: 137 }}
                />
                <img
                  src={`${OSS_BASE_URL}/star/star_5.png`}
                  style={{ position: "absolute", left: 0, top: 0, width: 323, height: 137 }}
                />
                <img
                  src={`${OSS_BASE_URL}/type/type_dx.png`}
                  style={{ position: "absolute", left: 0, top: 0, width: 323, height: 137 }}
                />
              </div>

              <div style={{ position: "absolute", left: 15 + 334 * 4, top: 749, width: 323, height: 137 }}>

                <img
                  src={`${OSS_BASE_URL}/cover/834.png`}
                  style={{ position: "absolute", left: 20, top: 18, width: 100, height: 100 }}
                />
                <img
                  src={`${OSS_BASE_URL}/card_bg/card_remaster.png`}
                  style={{ position: "absolute", left: 0, top: 0, width: 323, height: 137 }}
                />
                <img
                  src={`${OSS_BASE_URL}/rank/${customData.rank}_rank_sssp.png`}
                  style={{ position: "absolute", left: 0, top: 0, width: 323, height: 137 }}
                />
                <img
                  src={`${OSS_BASE_URL}/bound/combo4.png`}
                  style={{ position: "absolute", left: 0, top: 0, width: 323, height: 137 }}
                />
                <img
                  src={`${OSS_BASE_URL}/bound/fs4.png`}
                  style={{ position: "absolute", left: 0, top: 0, width: 323, height: 137 }}
                />
                <img
                  src={`${OSS_BASE_URL}/star/star_5.png`}
                  style={{ position: "absolute", left: 0, top: 0, width: 323, height: 137 }}
                />
                <img
                  src={`${OSS_BASE_URL}/type/type_dx.png`}
                  style={{ position: "absolute", left: 0, top: 0, width: 323, height: 137 }}
                />
              </div>

              {/* <img
                src={charaSets.find(chara => chara.value === customData.chara)?.image}
                alt="角色预览"
                className="absolute bottom-4 right-10 w-44 drop-shadow-[0_22px_35px_rgba(0,0,0,0.45)]"
              /> */}
              {/* <div
                className="absolute left-6 top-6 rounded-full bg-black/45 px-4 py-1 tracking-[0.3em] text-white"
                style={{ fontSize: "2rem" }}
              >
                PREVIEW
              </div> */}





            </div>
          </div>
        </div>
      </Card>
      {/* <div style={{ position:"relative", top: -100 }} className="flex justify-center">
        <Button
          onClick={handleSaveScreenshot}
          severity="primary"
        >
          <i className="pi pi-download mr-2" />
          <span>保存截图</span>
        </Button>
      </div> */}
    </div>
  );
};

type FormData = {
  background: string;
  rank: string;
  dan: string;
  gameClass: string;
  plate: string | number;
  icon: string | number;
  frame: string | number;
  frameMode: "recommend" | "chara";
  recommend: string;
  travelConfigs: Array<{ buddy: string; level: number; id: number }>;
};

const Customizer = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    background: backgrounds[0].value,
    rank: rankSets[0].value,
    dan: danSets[0].value,
    gameClass: classSets[0].value,
    plate: 458012,
    icon: 301,
    frame: 105601,
    frameMode: "recommend",
    recommend: 'defaut',
    travelConfigs: Array.from({ length: 5 }, () => ({ buddy: "", level: 1, id: 0 })),
  });

  const [showBg, setShowBg] = useState(false);
  const [showRecommendChara, setShowRecommendChara] = useState(false);
  const [showRank, setShowRank] = useState(false);
  const [showDan, setShowDan] = useState(false);
  const [showGameClass, setShowGameClass] = useState(false);
  const [showCollectibles, setShowCollectibles] = useState(false);
  const [showRecommend, setShowRecommend] = useState(false);

  const [openSelectChara, setOpenSelectChara] = useState(false);
  const [selectingField, setSelectingField] = useState<"plate" | "icon" | "frame" | "chara" | "travel" | null>(null);
  const [selectingTravelIndex, setSelectingTravelIndex] = useState<number | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  // 根据 selectingField 获取对应的数据
  const getDropdownData = (): DropdownGenre[] => {
    if (selectingField === "frame") {
      return frameDropdownData as DropdownGenre[];
    } else if (selectingField === "icon") {
      return iconDropdownData as DropdownGenre[];
    } else if (selectingField === "plate") {
      return plateDropdownData as DropdownGenre[];
    } else if (selectingField === "chara" || selectingField === "travel") {
      return charaDropdownData as DropdownGenre[];
    }
    return [];
  };

  const dropdownData = getDropdownData();
  const selectedGenreData = dropdownData.find((g) => g.genre === selectedGenre);

  // 获取显示名称：如果是 name_id，查找对应的 name_str；如果是本地资源路径，返回文件名
  const getDisplayName = (value: string | number, field: "plate" | "icon" | "frame"): string => {
    if (!value) return "";

    // 如果是数字（name_id），查找对应的 name_str
    if (typeof value === "number") {
      // 根据字段类型获取对应的数据
      let data: DropdownGenre[] = [];
      if (field === "frame") {
        data = frameDropdownData as DropdownGenre[];
      } else if (field === "icon") {
        data = iconDropdownData as DropdownGenre[];
      } else if (field === "plate") {
        data = plateDropdownData as DropdownGenre[];
      }

      // 在所有分类中查找对应的 item
      for (const genre of data) {
        const item = genre.items.find((i) => i.name_id === value);
        if (item) {
          return item.name_str;
        }
      }
      return value.toString(); // 如果找不到，返回 name_id
    }

    // 如果是字符串（本地资源路径），返回文件名
    if (typeof value === "string") {
      if (value.includes("demo/") || value.includes("static/")) {
        return value.split("/").pop() || value;
      }
      // 如果是 URL，尝试提取 name_id
      const match = value.match(/\/(\d+)\.png$/);
      if (match) {
        const nameId = parseInt(match[1]);
        return getDisplayName(nameId, field);
      }
      return value;
    }

    return "";
  };

  // 获取图片 URL：根据 name_id 或本地路径构建 URL
  const getImageUrl = (value: string | number, field: "plate" | "icon" | "frame"): string => {
    if (!value) return "";

    // 如果是数字（name_id），构建 OSS URL
    if (typeof value === "number") {
      const typeMap: Record<"frame" | "icon" | "plate", string> = {
        frame: "frame",
        icon: "icon",
        plate: "plate"
      };
      return `${OSS_BASE_URL}/${typeMap[field]}/${value}.png`;
    }

    // 如果是字符串（本地资源路径），直接返回
    return value;
  };

  const handleInputChange = (name: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTravelConfigChange = (index: number, field: "buddy" | "level" | "id", value: string | number) => {
    setFormData((prev) => {
      const newConfigs = [...prev.travelConfigs];
      newConfigs[index] = { ...newConfigs[index], [field]: value };
      return { ...prev, travelConfigs: newConfigs };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("表单数据:", formData);
    // 这里可以添加提交逻辑
  };

  useEffect(() => {
    // 每当formData变化时会触发该回调
    // 你可以在这里放置相关的刷新/副作用逻辑
    console.log("formData has changed:", formData);
  }, [formData]);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ width: "100%" }} className="flex flex-col lg:flex-row lg:items-start lg:gap-10">
        {/* 左侧：预览卡，PC 端固定在左侧 */}
        <div style={{ padding: "16px" }} className="lg:flex-none lg:sticky lg:top lg:self-start mb-4 lg:mb-0">
          <PreviewCard
            customData={formData}
          />
        </div>

        {/* 右侧：设置区域，PC 端可滚动；移动端正常纵向排布 */}
        <div style={{ padding: "16px" }} className="lg:flex-1 lg:pl-10">
          <form onSubmit={handleSubmit} className="settings-container lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto space-y-4">
            <Fieldset>
              <Fieldset.Legend onClick={() => setShowBg((prev) => !prev)}>
                <Button type="button" variant="text" size="small" className="mr-2 align-middle">
                  {showBg ? <MinusIcon /> : <PlusIcon />}
                </Button>
                <span className="align-middle font-medium text-sm">
                  {t("customizer.backgroundLayer")}
                </span>
                <span className="ml-4 text-xs text-surface-500 align-middle">
                  {t("common.optionCount", { count: backgrounds.length })}
                </span>
              </Fieldset.Legend>
              <Motion in={showBg} name="p-toggleable-content">
                <Fieldset.Content>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 mt-3">
                    {backgrounds.map((option) => {
                      const isActive = formData.background === option.value;
                      return (
                        <Button
                          key={option.value}
                          type="button"
                          name="background"
                          value={option.value}
                          onClick={() => handleInputChange("background", option.value)}
                          severity={isActive ? "primary" : "secondary"}
                          className="w-full justify-start"
                        >
                          <div className="flex flex-col w-full items-start">
                            <span className="text-sm font-semibold">{option.label}</span>
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                </Fieldset.Content>
              </Motion>
            </Fieldset>

            {/* rank */}
            <Fieldset>
              <Fieldset.Legend onClick={() => setShowRank((prev) => !prev)}>
                <Button type="button" variant="text" size="small" className="mr-2 align-middle">
                  {showRank ? <MinusIcon /> : <PlusIcon />}
                </Button>
                <span className="align-middle font-medium text-sm">
                  {t("customizer.rank")}
                </span>
                <span className="ml-4 text-xs text-surface-500 align-middle">
                  {t("common.optionCount", { count: rankSets.length })}
                </span>
              </Fieldset.Legend>
              <Motion in={showRank} name="p-toggleable-content">
                <Fieldset.Content>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 mt-3">
                    {rankSets.map((option) => {
                      const isActive = formData.rank === option.value;
                      return (
                        <Button
                          type="button"
                          size="small"
                          key={option.value}
                          name="rank"
                          value={option.value}
                          onClick={() => handleInputChange("rank", option.value)}
                          severity={isActive ? "primary" : "secondary"}
                          className="w-full justify-start"
                        >
                          <span className="text-sm font-semibold">{option.label}</span>
                        </Button>
                      );
                    })}
                  </div>
                </Fieldset.Content>
              </Motion>
            </Fieldset>

            {/* dan */}
            <Fieldset>
              <Fieldset.Legend onClick={() => setShowDan((prev) => !prev)}>
                <Button type="button" variant="text" size="small" className="mr-2 align-middle">
                  {showDan ? <MinusIcon /> : <PlusIcon />}
                </Button>
                <span className="align-middle font-medium text-sm">
                  {t("customizer.dan")}
                </span>
                <span className="ml-4 text-xs text-surface-500 align-middle">
                  {t("common.optionCount", { count: danSets.length })}
                </span>
              </Fieldset.Legend>
              <Motion in={showDan} name="p-toggleable-content">
                <Fieldset.Content>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 mt-3">
                    {danSets.map((option) => {
                      const isActive = formData.dan === option.value;
                      return (
                        <Button
                          type="button"
                          size="small"
                          key={option.value}
                          name="dan"
                          value={option.value}
                          onClick={() => handleInputChange("dan", option.value)}
                          severity={isActive ? "primary" : "secondary"}
                          className="w-full justify-start"
                        >
                          <span className="text-sm font-semibold">{option.label}</span>
                        </Button>
                      );
                    })}
                  </div>
                </Fieldset.Content>
              </Motion>

            </Fieldset>

            {/* class */}
            <Fieldset>
              <Fieldset.Legend onClick={() => setShowGameClass((prev) => !prev)}>
                <Button type="button" variant="text" size="small" className="mr-2 align-middle">
                  {showGameClass ? <MinusIcon /> : <PlusIcon />}
                </Button>
                <span className="align-middle font-medium text-sm">
                  {t("customizer.class")}
                </span>
                <span className="ml-4 text-xs text-surface-500 align-middle">
                  {t("common.optionCount", { count: classSets.length })}
                </span>
              </Fieldset.Legend>
              <Motion in={showGameClass} name="p-toggleable-content">
                <Fieldset.Content>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 mt-3">
                    {classSets.map((option) => {
                      const isActive = formData.gameClass === option.value;
                      return (
                        <Button
                          type="button"
                          size="small"
                          key={option.value}
                          name="gameClass"
                          value={option.value}
                          onClick={() => handleInputChange("gameClass", option.value)}
                          severity={isActive ? "primary" : "secondary"}
                          className="w-full justify-start"
                        >
                          <span className="text-sm font-semibold">{option.label}</span>
                        </Button>
                      );
                    })}
                  </div>
                </Fieldset.Content>
              </Motion>
            </Fieldset>

            {/* 收藏品 */}
            <Fieldset>
              <Fieldset.Legend onClick={() => setShowCollectibles((prev) => !prev)}>
                <Button type="button" variant="text" size="small" className="mr-2 align-middle">
                  {showCollectibles ? <MinusIcon /> : <PlusIcon />}
                </Button>
                <span className="align-middle font-medium text-sm">
                  {t("customizer.collectibles")}
                </span>
              </Fieldset.Legend>
              <Motion in={showCollectibles} name="p-toggleable-content">
                <Fieldset.Content>
                  <div className="grid gap-3 sm:grid-cols-1 lg:grid-cols-3 mt-3">
                    <InputGroup className="w-full">
                      <InputText
                        name="plate"
                        readOnly
                        size="small"
                        placeholder="plate"
                        value={getDisplayName(formData.plate, "plate")}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("plate", e.target.value)}
                      />
                      <InputGroup.Addon>
                        <Button
                          type="button"
                          size="small"
                          severity="secondary"
                          variant="text"
                          onClick={() => {
                            setSelectingField("plate");
                            setOpenSelectChara(true);
                          }}
                        >
                          <i className="pi pi-search" />
                        </Button>
                      </InputGroup.Addon>
                    </InputGroup>
                    <InputGroup className="w-full">
                      <InputText
                        name="icon"
                        readOnly
                        size="small"
                        placeholder="icon"
                        value={getDisplayName(formData.icon, "icon")}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("icon", e.target.value)}
                      />
                      <InputGroup.Addon>
                        <Button
                          type="button"
                          size="small"
                          severity="secondary"
                          variant="text"
                          onClick={() => {
                            setSelectingField("icon");
                            setOpenSelectChara(true);
                          }}
                        >
                          <i className="pi pi-search" />
                        </Button>
                      </InputGroup.Addon>
                    </InputGroup>
                    <InputGroup className="w-full">
                      <InputText
                        name="frame"
                        readOnly
                        size="small"
                        placeholder="frame"
                        value={getDisplayName(formData.frame, "frame")}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("frame", e.target.value)}
                      />
                      <InputGroup.Addon>
                        <Button
                          type="button"
                          size="small"
                          severity="secondary"
                          variant="text"
                          onClick={() => {
                            setSelectingField("frame");
                            setOpenSelectChara(true);
                          }}
                        >
                          <i className="pi pi-search" />
                        </Button>
                      </InputGroup.Addon>
                    </InputGroup>
                  </div>
                  <p className="mt-2 text-xs text-surface-500 dark:text-surface-400">
                    {t("customizer.collectiblesHint")}
                  </p>
                </Fieldset.Content>
              </Motion>
            </Fieldset>

            {/* 开关选项 */}
            <Fieldset>
              <Fieldset.Legend onClick={() => setShowRecommendChara((prev) => !prev)}>
                <Button
                  type="button"
                  variant="text"
                  size="small"
                  className="mr-2 align-middle"
                >
                  {showRecommendChara ? <MinusIcon /> : <PlusIcon />}
                </Button>
                <span className="align-middle font-medium text-sm">
                  {t("customizer.modeTitle")}
                </span>
              </Fieldset.Legend>
              <Motion in={showRecommendChara} name="p-toggleable-content">
                <Fieldset.Content>
                  <div className="flex gap-2 mt-3">
                    <Button
                      type="button"
                      name="frameMode"
                      value="recommend"
                      severity={formData.frameMode === "recommend" ? "primary" : "secondary"}
                      onClick={() => handleInputChange("frameMode", "recommend")}
                    >
                      <span className="align-middle font-medium text-sm">
                        {t("customizer.modeRecommend")}
                      </span>
                    </Button>
                    <Button
                      type="button"
                      name="frameMode"
                      value="chara"
                      severity={formData.frameMode === "chara" ? "primary" : "secondary"}
                      onClick={() => handleInputChange("frameMode", "chara")}
                    >
                      <span className="align-middle font-medium text-sm">
                        {t("customizer.modeChara")}
                      </span>
                    </Button>
                  </div>
                  <div className="mt-3 text-sm">
                    {formData.frameMode === "recommend" ? (
                                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 mt-3">
                                        {recommendSets.map((option) => {
                                          const isActive = formData.recommend === option.value;
                                          return (
                                            <Button
                                              type="button"
                                              size="small"
                                              key={option.value}
                                              name="recommend"
                                              value={option.value}
                                              onClick={() => handleInputChange("recommend", option.value)}
                                              severity={isActive ? "primary" : "secondary"}
                                              className="w-full justify-start"
                                            >
                                              <span className="text-sm font-semibold">{option.label}</span>
                                            </Button>
                                          );
                                        })}
                                      </div>
                    ) : (
                      <div>
                        {formData.travelConfigs.map((cfg, index) => (
                          <div key={index} className="space-y-2 mt-8">
                            <div className="flex flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <Chip severity="secondary">{index + 1}</Chip>
                                <InputGroup>
                                  <InputText
                                    name={`travelConfigs[${index}].buddy`}
                                    readOnly
                                    size="small"
                                    placeholder={t("customizer.travelPartnerPlaceholder")}
                                    value={cfg.buddy}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTravelConfigChange(index, "buddy", e.target.value)}
                                  />
                                  <InputGroup.Addon>
                                    <Button
                                      type="button"
                                      size="small"
                                      severity="secondary"
                                      variant="text"
                                      onClick={() => {
                                        setSelectingField("travel");
                                        setSelectingTravelIndex(index);
                                        setOpenSelectChara(true);
                                      }}
                                    >
                                      <i className="pi pi-search" />
                                    </Button>
                                  </InputGroup.Addon>
                                </InputGroup>

                                
                                <InputGroup>
                                  <InputGroup.Addon>
                                    <Button
                                      type="button"
                                      size="small"
                                      severity="secondary"
                                      onClick={() => {
                                        const current = Number(cfg.level) || 0;
                                        const next = Math.min(current + 1, 9999);
                                        handleTravelConfigChange(index, "level", next);
                                      }}
                                    >
                                      <i className="pi pi-plus" />
                                    </Button>
                                  </InputGroup.Addon>
                                  <InputText
                                    name={`travelConfigs[${index}].level`}
                                    size="small"
                                    placeholder={t("customizer.levelPlaceholder")}
                                    value={String(cfg.level ?? "")}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                      const raw = e.target.value.replace(/[^0-9]/g, "");
                                      if (!raw) {
                                        handleTravelConfigChange(index, "level", 1);
                                        return;
                                      }
                                      const num = Math.max(1, Math.min(9999, parseInt(raw, 10)));
                                      handleTravelConfigChange(index, "level", num);
                                    }}
                                  />
                                  <InputGroup.Addon>
                                    <Button
                                      type="button"
                                      size="small"
                                      severity="secondary"
                                      onClick={() => {
                                        const current = Number(cfg.level) || 1;
                                        const next = Math.max(current - 1, 1);
                                        handleTravelConfigChange(index, "level", next);
                                      }}
                                    >
                                      <i className="pi pi-minus" />
                                    </Button>
                                  </InputGroup.Addon>
                                </InputGroup>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Fieldset.Content>
              </Motion>
            </Fieldset>
          </form>
        </div>
      </div>








      {/* 选择收藏品 Dialog */}
      <Dialog
        open={openSelectChara}
        opened={openSelectChara}
        onOpenChange={(e: any) => setOpenSelectChara(e.value as boolean)}
        modal
        draggable={false}
      >
        <Dialog.Portal style={{ width: '40rem', maxWidth: '90vw' }}>
          <Dialog.Header>
            <Dialog.Title>
              {selectingField === "plate" && t("customizer.dialogChoosePlate")}
              {selectingField === "icon" && t("customizer.dialogChooseIcon")}
              {selectingField === "frame" && t("customizer.dialogChooseFrame")}
            </Dialog.Title>
            <Dialog.HeaderActions>
              <Dialog.Close />
            </Dialog.HeaderActions>
          </Dialog.Header>
          <Dialog.Content>
            {(instance: DialogContentInstance) => {
              const { dialog } = instance;
              return (
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-surface-700 dark:text-surface-300">
                      {t("customizer.dialogChooseCategoryLabel")} ({dropdownData.length})
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1 border border-surface-200 dark:border-surface-700 rounded-lg">
                      {dropdownData.map((genreData) => (
                        <Button
                          key={genreData.genre}
                          type="button"
                          size="small"
                          severity={selectedGenre === genreData.genre ? "primary" : "secondary"}
                          onClick={() => setSelectedGenre(genreData.genre)}
                          className="text-left justify-start text-xs"
                        >
                          <span className="truncate">{genreData.genre}</span>
                          <span className="ml-2 text-xs opacity-70">({genreData.items.length})</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* 第二层：选择 Item */}
                  {selectedGenreData ? (
                    <div>
                      <label className="block text-sm font-medium mb-2 text-surface-700 dark:text-surface-300">
                        {t("customizer.dialogChooseItemLabel")} - {selectedGenreData.genre} ({selectedGenreData.items.length})
                      </label>
                      <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto p-1 border border-surface-200 dark:border-surface-700 rounded-lg">
                        {selectedGenreData.items.map((item) => (
                          <Button
                            key={item.name_id}
                            type="button"
                            size="small"
                            severity="secondary"
                            onClick={() => {
                              if (!selectingField) {
                                return;
                              }

                              if (selectingField === "plate" || selectingField === "icon" || selectingField === "frame") {
                                // 收藏品：直接存储 name_id 到对应字段
                                handleInputChange(selectingField, item.name_id);
                              } else if (selectingField === "travel") {
                                // 旅行搭档：使用双层选择（chara_dropdown_data），写入 travelConfigs
                                if (selectingTravelIndex == null) {
                                  return;
                                }
                                handleTravelConfigChange(selectingTravelIndex, "buddy", item.name_str);
                                handleTravelConfigChange(selectingTravelIndex, "id", item.name_id);
                              } else {
                                return;
                              }

                              setSelectedGenre(null);
                              setSelectingField(null);
                              setSelectingTravelIndex(null);
                              setOpenSelectChara(false);
                              dialog?.close?.();
                            }}
                            className="text-left justify-start"
                          >
                            <span className="truncate">{item.name_str}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-surface-500 dark:text-surface-400 text-center py-8">
                      {t("customizer.dialogChooseCategoryPlaceholder")}
                    </div>
                  )}
                </div>
              )
            }
            }

          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </div>
  );
};

export default Customizer;