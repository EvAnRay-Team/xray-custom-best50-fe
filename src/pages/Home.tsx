import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Link } from "react-router-dom";

const Home = () => (
  <Card className="rounded-3xl p-10 space-y-8">
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-xs uppercase tracking-[0.4em]">コントロールパネル</p>
        <h1 className="mt-3 text-3xl font-semibold">XrayTeam フロントエンド研究室</h1>
        <p className="mt-2 text-sm">
          現在のテーマ状態を表示し、スタイル設定ページへ移動できます。
        </p>
      </div>
    </div>
    <div className="flex flex-wrap gap-4 text-sm">
      <Card className="flex-1 min-w-48 p-4">
        <p className="text-xs uppercase tracking-wide">ハイライト</p>
        <p className="mt-2 text-2xl font-semibold">PrimeReact ベース</p>
      </Card>
      <Card className="flex-1 min-w-48 p-4">
        <p className="text-xs uppercase tracking-wide">テーマ</p>
        <p className="mt-2 text-2xl font-semibold">Noir プリセット</p>
      </Card>
    </div>
    <Button as={Link} to="/customizer" rounded className="w-fit">
      スタイル設定を開く
    </Button>
  </Card>
);

export default Home;