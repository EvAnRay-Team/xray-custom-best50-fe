import { useState, useEffect, useRef } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Fieldset } from "primereact/fieldset";
import { Motion } from "@primereact/core/motion";
import { MinusIcon, PlusIcon } from "@primereact/icons";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { FloatLabel } from "primereact/label/float";
// import { usePopoverOpenChangeEvent } from '@primereact/types/shared/popover';
import { Chip } from "primereact/chip";
import { getAsset } from "../static";
import { InputGroup } from "primereact/inputgroup";

type VisualOption = { label: string; value: string; image?: string };

const mustGetAsset = (path: string) => {
  const asset = getAsset(path);
  if (!asset) throw new Error(`静态资源缺失: ${path}`);
  return asset;
};


const FrameDemo = mustGetAsset("demo/UI_Frame_105601.png");
const IconDemo = mustGetAsset("demo/UI_Icon_000301.png");
const PlateDemo = mustGetAsset("demo/UI_Plate_458012.png");
// const RecommendDemo = mustGetAsset("demo/UI_Plate_458012.png");
// const RankDemo = mustGetAsset("demo/UI_Rank_105601.png");
// const NameDemo = mustGetAsset("demo/UI_Name_105601.png");


const backgrounds: VisualOption[] = [
  { label: "DX", value: "dx", image: mustGetAsset("bg/dx.png") },
  { label: "Splash", value: "splash", image: mustGetAsset("bg/splash.png") },
  { label: "Splash Plus", value: "splashp", image: mustGetAsset("bg/splashp.png") },
  { label: "Univers", value: "uni", image: mustGetAsset("bg/uni.png") },
  { label: "Festival", value: "fes", image: mustGetAsset("bg/fes.png") },
  { label: "Festival Plus", value: "fesp", image: mustGetAsset("bg/fesp.png") },
  { label: "Buddies", value: "bud", image: mustGetAsset("bg/bud.png") },
  { label: "Buddies Plus", value: "budp", image: mustGetAsset("bg/budp.png") },
  { label: "Prism", value: "prism", image: mustGetAsset("bg/prism.png") },
  { label: "Prism Plus", value: "prismp", image: mustGetAsset("bg/prismp.png") },
];

const ranks: VisualOption[] = [
  { label: "Default", value: "default" },
  { label: "DX", value: "dx" },
  { label: "Festival", value: "fes" },
  { label: "Prism", value: "prism" },
  { label: "Splash", value: "splash" },
  { label: "Univers", value: "uni" },
  { label: "Buddies", value: "bud" },
];



const cardFrames: VisualOption[] = [
  { label: "Basic Card", value: "basic", image: mustGetAsset("card/card_bg/card_basic.png") },
  { label: "Expert Card", value: "expert", image: mustGetAsset("card/card_bg/card_expert.png") },
  { label: "Master Card", value: "master", image: mustGetAsset("card/card_bg/card_master.png") },
];

const charaSets: VisualOption[] = [
  { label: "角色 A", value: "chara-1", image: mustGetAsset("chara/chara_base_1.png") },
  { label: "角色 B", value: "chara-4", image: mustGetAsset("chara/chara_base_4.png") },
  { label: "角色 C", value: "chara-7", image: mustGetAsset("chara/chara_base_7.png") },
];

const rankSets: VisualOption[] = [
  { label: "Bud S", value: "bud-s", image: mustGetAsset("card/rank/bud_rank_s.png") },
  { label: "Fes S", value: "fes-s", image: mustGetAsset("card/rank/fes_rank_s.png") },
  { label: "Prism S", value: "prism-s", image: mustGetAsset("card/rank/prism_rank_s.png") },
  { label: "Splash S", value: "splash-s", image: mustGetAsset("card/rank/splash_rank_s.png") },
  { label: "Uni S", value: "uni-s", image: mustGetAsset("card/rank/uni_rank_s.png") },
  { label: "DX S", value: "dx-s", image: mustGetAsset("card/rank/dx_rank_s.png") },
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

const travelBuddies = [
  { label: "旅行伙伴 1", value: "buddy-1" },
  { label: "旅行伙伴 2", value: "buddy-2" },
  { label: "旅行伙伴 3", value: "buddy-3" },
  { label: "旅行伙伴 4", value: "buddy-4" },
  { label: "旅行伙伴 5", value: "buddy-5" },
];

const travelLevels = [
  { label: "Lv.1", value: "lv1" },
  { label: "Lv.2", value: "lv2" },
  { label: "Lv.3", value: "lv3" },
  { label: "Lv.4", value: "lv4" },
  { label: "Lv.5", value: "lv5" },
];

type PreviewProps = { background: VisualOption; card: VisualOption; chara: VisualOption; rank: VisualOption };

const PreviewCard = ({ background, card, chara, rank }: PreviewProps) => {
  const baseW = 1700;
  const baseH = 2369;
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const [viewportWidth, setViewportWidth] = useState<number | null>(null);

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

  return (
    <Card
      style={{
        height: !isDesktop ? baseH * scale : undefined,
        width: isDesktop ? baseW * scale : undefined,
        overflow: "hidden",
      }}
    >
      <div style={{height: baseH * scale }}>
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

          <img src={FrameDemo} alt="框体" className="absolute top-0 left-0 w-full h-auto" />
          
          <img
            src={PlateDemo}
            alt="姓名框"
            style={{ position: "absolute", left: 32, top: 27, width: 1104, height: 178 }}
          />
          <img
            src={IconDemo}
            alt="头像"
            style={{ position: "absolute", left: 46, top: 41, width: 150, height: 150 }}
          />
          <img
            src={mustGetAsset("nameplate/name.png")}
            alt="名字"
            style={{ position: "absolute", left: 0, top: 0 }}
          />
          <img
            src={mustGetAsset("nameplate/rat/rat_150.png")}
            alt="rat"
            style={{ position: "absolute", left: -3, top: 0 }}
          />
          <img
            src={mustGetAsset("nameplate/dan/fbr_14.png")}
            alt="dan"
            style={{ position: "absolute", left: 0, top: 0 }}
          />




          <img
            src={mustGetAsset("nameplate/class/class_25.png")}
            alt="fbr"
            style={{ position: "absolute", left: 0, top: -2 }}
          />
          <img
            src={mustGetAsset("nameplate/title/15000.png")}
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

          <span
            style={{
              position: "absolute",
              left: 260,
              top: 155,
              fontSize: 28,
              color: "#000",
              margin: 0,
              padding: 0,
              zIndex: 999,
            }}
            className="rating-total-span"
          >
            旧版本*****+新版本****
          </span>


          <img src={background.image} alt="背景预览" className="h-full w-full object-cover" />
          <img src={card.image} alt="卡面预览" className="absolute bottom-6 left-6 w-56 rounded-xl shadow-2xl" />
          <img src={chara.image} alt="角色预览" className="absolute bottom-4 right-10 w-44 drop-shadow-[0_22px_35px_rgba(0,0,0,0.45)]" />
          <img src={rank.image} alt="段位" className="absolute top-6 right-6 w-20 drop-shadow-[0_10px_25px_rgba(0,0,0,0.55)]" />
          <div
            className="absolute left-6 top-6 rounded-full bg-black/45 px-4 py-1 tracking-[0.3em] text-white"
            style={{ fontSize: "2rem" }}
          >
            PREVIEW
          </div>





        </div>
      </div>
    </Card>
  );
};

const Customizer = () => {
  const [background, setBackground] = useState(backgrounds[0].value);
  const [rank, setRank] = useState(ranks[0].value);
  const [dan, setDan] = useState(danSets[0].value);
  const [gameClass, setGameClass] = useState(classSets[0].value);

  const [plate, setPlate] = useState(0);
  const [icon, setIcon] = useState(0);
  const [frame, setFrame] = useState(0);


  const [showBg, setShowBg] = useState(false);
  const [showRecommendChara, setShowRecommendChara] = useState(false);
  const [showRank, setShowRank] = useState(false);
  const [showDan, setShowDan] = useState(false);
  const [showGameClass, setShowGameClass] = useState(false);
  const [showCollectibles, setShowCollectibles] = useState(false);


  const [card, setCard] = useState(cardFrames[0].value);
  const [chara, setChara] = useState(charaSets[0].value);
  // const [rank, setRank] = useState(rankSets[0].value);
  const [plateMode, setPlateMode] = useState<"recommend" | "chara">("recommend");
  const [travelConfigs, setTravelConfigs] = useState(
    () => Array.from({ length: 5 }, () => ({ buddy: travelBuddies[0].value, level: travelLevels[0].value, id: "" }))
  );
  const [openSelectChara, setOpenSelectChara] = useState(false);
  const backgroundMeta = backgrounds.find((item) => item.value === background) ?? backgrounds[0];
  const cardMeta = cardFrames.find((item) => item.value === card) ?? cardFrames[0];
  const charaMeta = charaSets.find((item) => item.value === chara) ?? charaSets[0];
  const rankMeta = rankSets.find((item) => item.value === rank) ?? rankSets[0];

  return (
    <div style={{width:"100%"}}>
      <div style={{width:"100%"}} className="flex flex-col lg:flex-row lg:items-start lg:gap-10">
        {/* 左侧：预览卡，PC 端固定在左侧 */}
        <div style={{ paddingTop: "16px" }} className="lg:flex-none lg:sticky lg:top-24 lg:self-start mb-4 lg:mb-0">
          <PreviewCard
            background={backgroundMeta}
            card={cardMeta}
            chara={charaMeta}
            rank={rankMeta}
          />
        </div>

        {/* 右侧：设置区域，PC 端可滚动；移动端正常纵向排布 */}
        <div style={{ padding: "16px" }} className="lg:flex-1 lg:pl-10">
          <div className="settings-container lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto space-y-4">
            <Fieldset>
              <Fieldset.Legend onClick={() => setShowBg((prev) => !prev)}>
                <Button variant="text" size="small" className="mr-2 align-middle">
                  {showBg ? <MinusIcon /> : <PlusIcon />}
                </Button>
                <span className="align-middle font-medium text-sm">背景レイヤー</span>
                <span className="ml-4 text-xs text-surface-500 align-middle">{backgrounds.length} 选项</span>
              </Fieldset.Legend>
              <Motion in={showBg} name="p-toggleable-content">
                <Fieldset.Content>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 mt-3">
                    {backgrounds.map((option) => {
                      const isActive = background === option.value;
                      return (
                        <Button
                          key={option.value}
                          onClick={() => setBackground(option.value)}
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


            <Fieldset>
              <Fieldset.Legend onClick={() => setShowRank((prev) => !prev)}>
                <Button variant="text" size="small" className="mr-2 align-middle">
                  {showRank ? <MinusIcon /> : <PlusIcon />}
                </Button>
                <span className="align-middle font-medium text-sm">rank</span>
                <span className="ml-4 text-xs text-surface-500 align-middle">{ranks.length} 选项</span>
              </Fieldset.Legend>
              <Motion in={showRank} name="p-toggleable-content">
                <Fieldset.Content>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 mt-3">
                    {ranks.map((option) => {
                      const isActive = rank === option.value;
                      return (
                        <Button size="small"
                          key={option.value} onClick={() => setRank(option.value)} severity={isActive ? "primary" : "secondary"} className="w-full justify-start">
                          <span className="text-sm font-semibold">{option.label}</span>
                        </Button>
                      );
                    })}
                  </div>
                </Fieldset.Content>
              </Motion>
            </Fieldset>

            <Fieldset>
              <Fieldset.Legend onClick={() => setShowDan((prev) => !prev)}>
                <Button variant="text" size="small" className="mr-2 align-middle">
                  {showDan ? <MinusIcon /> : <PlusIcon />}
                </Button>
                <span className="align-middle font-medium text-sm">dan</span>
                <span className="ml-4 text-xs text-surface-500 align-middle">{danSets.length} 选项</span>
              </Fieldset.Legend>
              <Motion in={showDan} name="p-toggleable-content">
                <Fieldset.Content>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 mt-3">
                    {danSets.map((option) => {
                      const isActive = dan === option.value;
                      return (
                        <Button size="small" key={option.value} onClick={() => setDan(option.value)} severity={isActive ? "primary" : "secondary"} className="w-full justify-start">
                          <span className="text-sm font-semibold">{option.label}</span>
                        </Button>
                      );
                    })}
                  </div>
                </Fieldset.Content>
              </Motion>

            </Fieldset>

            <Fieldset>
              <Fieldset.Legend onClick={() => setShowGameClass((prev) => !prev)}>
                <Button variant="text" size="small" className="mr-2 align-middle">
                  {showGameClass ? <MinusIcon /> : <PlusIcon />}
                </Button>
                <span className="align-middle font-medium text-sm">class</span>
                <span className="ml-4 text-xs text-surface-500 align-middle">{classSets.length} 选项</span>
              </Fieldset.Legend>
              <Motion in={showGameClass} name="p-toggleable-content">
                <Fieldset.Content>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 mt-3">
                    {classSets.map((option) => {
                      const isActive = gameClass === option.value;
                      return (
                        <Button size="small" key={option.value} onClick={() => setGameClass(option.value)} severity={isActive ? "primary" : "secondary"} className="w-full justify-start">
                          <span className="text-sm font-semibold">{option.label}</span>
                        </Button>
                      );
                    })}
                  </div>
                </Fieldset.Content>
              </Motion>
            </Fieldset>

            <Fieldset>
              <Fieldset.Legend onClick={() => setShowCollectibles((prev) => !prev)}>
                <Button variant="text" size="small" className="mr-2 align-middle">
                  {showCollectibles ? <MinusIcon /> : <PlusIcon />}
                </Button>
                <span className="align-middle font-medium text-sm">collectibles</span>
              </Fieldset.Legend>
              <Motion in={showCollectibles} name="p-toggleable-content">
                <Fieldset.Content>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 mt-3">
                    <InputGroup>
                      <InputText readOnly size="small" placeholder="plate" />
                      <InputGroup.Addon>
                        <Button size="small" severity="secondary" variant="text">
                          <i className="pi pi-search" onClick={() => setOpenSelectChara(true)} />
                        </Button>
                      </InputGroup.Addon>
                    </InputGroup>
                    <InputGroup>
                      <InputText readOnly size="small" placeholder="icon" />
                      <InputGroup.Addon>
                        <Button size="small" severity="secondary" variant="text">
                          <i className="pi pi-search" onClick={() => setOpenSelectChara(true)} />
                        </Button>
                      </InputGroup.Addon>
                    </InputGroup>
                    <InputGroup>
                      <InputText readOnly size="small" placeholder="frame" />
                      <InputGroup.Addon>
                        <Button size="small" severity="secondary" variant="text">
                          <i className="pi pi-search" onClick={() => setOpenSelectChara(true)} />
                        </Button>
                      </InputGroup.Addon>
                    </InputGroup>
                  </div>
                </Fieldset.Content>
              </Motion>
            </Fieldset>

            <Fieldset>
              <Fieldset.Legend onClick={() => setShowRecommendChara((prev) => !prev)}>
                <Button
                  variant="text"
                  size="small"
                  className="mr-2 align-middle"
                >
                  {showRecommendChara ? <MinusIcon /> : <PlusIcon />}
                </Button>
                <span className="align-middle font-medium text-sm">Recommend / Chara 配置模式</span>
              </Fieldset.Legend>
              <Motion in={showRecommendChara} name="p-toggleable-content">
                <Fieldset.Content>
                  <div className="flex gap-2 mt-3">
                    <Button
                      severity={plateMode === "recommend" ? "primary" : "secondary"}
                      onClick={() => setPlateMode("recommend")}
                    >
                      <span className="align-middle font-medium text-sm">Recommend</span>
                    </Button>
                    <Button
                      severity={plateMode === "chara" ? "primary" : "secondary"}
                      onClick={() => setPlateMode("chara")}
                    >
                      <span className="align-middle font-medium text-sm">Chara</span>
                    </Button>
                  </div>
                  <div className="mt-3 text-sm">
                    {plateMode === "recommend" ? (
                      <span>Recommend 配置占位（后续可在此添加推荐相关设置）</span>
                    ) : (
                      <div>
                        {travelConfigs.map((cfg, index) => (
                          <div key={index} className="space-y-2 mt-8">
                            <div className="flex flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <Chip severity="secondary">{index + 1}</Chip>
                                <InputGroup>
                                  <InputText readOnly size="small" placeholder="旅行パートナー" />
                                  <InputGroup.Addon>
                                    <Button size="small" severity="secondary" variant="text">
                                      <i className="pi pi-search" onClick={() => setOpenSelectChara(true)} />
                                    </Button>
                                  </InputGroup.Addon>
                                </InputGroup>
                                <InputGroup>
                                  <InputGroup.Addon>
                                    <Button size="small" severity="secondary">
                                      <i className="pi pi-plus" />
                                    </Button>
                                  </InputGroup.Addon>
                                  <InputText size="small" placeholder="レベル" />
                                  <InputGroup.Addon>
                                    <Button size="small" severity="secondary">
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
          </div>
        </div>
      </div>

      {/* <Card className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-surface-0/70 dark:bg-surface-900/70 p-6 space-y-4">
        <header className="flex items-center justify-between text-sm font-medium text-surface-500">
          <span>カードデザイン</span>
          <span>{cardFrames.length} 选项</span>
        </header>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {cardFrames.map((option) => {
            const isActive = card === option.value;
            return (
              <Button
                key={option.value}
                onClick={() => setCard(option.value)}
                className={`rounded-2xl border p-6 text-left transition text-base font-medium ${
                  isActive
                    ? "border-primary-400 bg-primary-50/60 dark:bg-primary-500/10 text-primary-600"
                    : "border-surface-200 dark:border-surface-800 hover:border-primary-300"
                }`}
              >
                <div className="aspect-[7/10] overflow-hidden rounded-2xl border border-white/20 shadow-inner">
                  <img src={option.image} alt={option.label} className="h-full w-full object-cover" />
                </div>
                <span className="mt-4 block text-sm font-semibold">{option.label}</span>
              </Button>
            );
          })}
        </div>
      </Card>
      <Card className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-surface-0/70 dark:bg-surface-900/70 p-6 space-y-4">
        <header className="flex items-center justify-between text-sm font-medium text-surface-500">
          <span>キャラクタースタイル</span>
          <span>{charaSets.length} 选项</span>
        </header>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {charaSets.map((option) => {
            const isActive = chara === option.value;
            return (
              <Button
                key={option.value}
                onClick={() => setChara(option.value)}
                className={`rounded-2xl border p-4 text-left transition text-base font-medium ${
                  isActive
                    ? "border-primary-400 bg-primary-50/60 dark:bg-primary-500/10 text-primary-600"
                    : "border-surface-200 dark:border-surface-800 hover:border-primary-300"
                }`}
              >
                <div className="aspect-[3/5] overflow-hidden rounded-2xl bg-surface-0/40">
                  <img src={option.image} alt={option.label} className="h-full w-full object-contain" />
                </div>
                <span className="mt-3 block text-sm font-semibold">{option.label}</span>
              </Button>
            );
          })}
        </div>
      </Card>
      <Card className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-surface-0/70 dark:bg-surface-900/70 p-6 space-y-4">
        <header className="flex items-center justify-between text-sm font-medium text-surface-500">
          <span>ランクバッジ</span>
          <span>{rankSets.length} 选项</span>
        </header>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {rankSets.map((option) => {
            const isActive = rank === option.value;
            return (
              <Button
                key={option.value}
                onClick={() => setRank(option.value)}
                className={`rounded-2xl border p-4 text-left transition text-base font-medium ${
                  isActive
                    ? "border-primary-400 bg-primary-50/60 dark:bg-primary-500/10 text-primary-600"
                    : "border-surface-200 dark:border-surface-800 hover:border-primary-300"
                }`}
              >x w
                <div className="aspect-[4/3] overflow-hidden rounded-xl bg-surface-0/30">
                  <img src={option.image} alt={option.label} className="h-full w-full object-contain" />
                </div>
                <span className="mt-3 block text-sm font-semibold">{option.label}</span>
              </Button>
            );
          })}
        </div>
      </Card> */}






      {/* 临时数据 Popover 示例 */}
      <Dialog open={openSelectChara} onOpenChange={(e: any) => setOpenSelectChara(e.value as boolean)} modal draggable={false}>
        <Dialog.Portal style={{ width: '25rem' }}>
          <Dialog.Header>
            <Dialog.Title>Edit Profile</Dialog.Title>
            <Dialog.HeaderActions>
              <Dialog.Close />
            </Dialog.HeaderActions>
          </Dialog.Header>
          <Dialog.Content>
            <div className="flex flex-col gap-2">
              {charaSets.map((option) => (
                <Button key={option.value} onClick={() => setChara(option.value)}>
                  {option.label}
                </Button>
              ))}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
      {/* <Popover open={openSelectChara} usePopoverOpenChangeEvent={(e: any) => setOpenSelectChara(e.value)}>
        <Popover.Trigger className="min-w-48">
          Show Popover
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content>
            <div className="flex flex-col gap-2">
              
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover> */}
    </div>
  );
};

export default Customizer;