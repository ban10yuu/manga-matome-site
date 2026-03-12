export default function AuthorBox() {
  return (
    <div className="border border-gray-700 rounded-lg p-6 bg-gray-800/50 my-8">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">考</div>
        <div>
          <p className="font-bold text-lg text-white">マンガ考察ラボ編集部</p>
          <p className="text-sm text-gray-400">マンガ歴20年以上の考察チーム</p>
        </div>
      </div>
      <p className="text-sm text-gray-300 leading-relaxed">
        週刊少年ジャンプ・マガジン・サンデーを中心に、20作品以上の漫画考察を毎日更新。作品の伏線・キャラクター分析・ストーリー予想を独自の視点で解説しています。
      </p>
    </div>
  );
}
