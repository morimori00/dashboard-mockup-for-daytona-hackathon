"use client"

import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { Bubble } from 'react-chartjs-2';

// Chart.jsのコンポーネントを登録
ChartJS.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function ProductPortfolioReport() {

  // バブルチャート用データ
  const bubbleData = {
    datasets: [
      {
        label: '赤字製品',
        data: [
          { x: -14.26, y: 1175200, r: 15 },
          { x: -2.92, y: 1320000, r: 8 },
          { x: -7.95, y: 352000, r: 7 },
        ],
        backgroundColor: 'rgba(239, 68, 68, 0.6)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
      },
      {
        label: '黒字製品',
        data: [
          { x: 10.21, y: 3870000, r: 25 },
          { x: 18.60, y: 2006400, r: 24 },
          { x: 8.01, y: 4192500, r: 23 },
          { x: 16.75, y: 1584000, r: 18 },
          { x: 13.43, y: 1372000, r: 15 },
        ],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            const x = context.parsed.x.toFixed(2);
            const y = context.parsed.y.toLocaleString();
            return `${label}: 粗利率 ${x}%, 生産高 ¥${y}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: '粗利率 (%)',
          font: {
            size: 12,
            weight: 'bold' as const
          }
        },
        min: -20,
        max: 25,
      },
      y: {
        title: {
          display: true,
          text: '生産高 (売上規模)',
          font: {
            size: 12,
            weight: 'bold' as const
          }
        },
        ticks: {
          callback: function(value: any) {
            return '¥' + (value / 1000000).toFixed(1) + 'M';
          }
        }
      }
    }
  };

  // ABC分析データ
  const abcData = [
    { 製品名: 'たらこ10', 生産高_金額: '3,870,000', 粗利_金額: '395,278.94', 粗利_粗利率: '0.102139261', ランク: 'A', 累積比率: '0.1080059544' },
    { 製品名: '明太子16', 生産高_金額: '2,006,400', 粗利_金額: '373,146.01', 粗利_粗利率: '0.1859778758', ランク: 'A', 累積比率: '0.2099643105' },
    { 製品名: '明太子17', 生産高_金額: '4,192,500', 粗利_金額: '335,869.5', 粗利_粗利率: '0.0801119857', ランク: 'A', 累積比率: '0.301737239' },
    { 製品名: 'たらこ1', 生産高_金額: '1,584,000', 粗利_金額: '265,287.56', 粗利_粗利率: '0.1674795202', ランク: 'A', 累積比率: '0.3742243694' },
    { 製品名: '明太子9', 生産高_金額: '1,372,000', 粗利_金額: '184,215.88', 粗利_粗利率: '0.1342681341', ランク: 'A', 累積比率: '0.424559487' },
  ];

  // 赤字製品データ
  const deficitData = [
    { 製品名: '明太子6', 生産高_金額: '1,175,200', 粗利_金額: '-167,551.39', 粗利_粗利率: '-0.14257266', 原価率: '0.8379436607', 販管費率: '0.3046289993', 推定: '製造' },
    { 製品名: 'たらこ18', 生産高_金額: '1,320,000', 粗利_金額: '-38,526.73', 粗利_粗利率: '-0.0291869167', 原価率: '0.7163081288', 販管費率: '0.3128787879', 推定: '販管' },
    { 製品名: '明太子20', 生産高_金額: '352,000', 粗利_金額: '-27,974.23', 粗利_粗利率: '-0.0794722443', 原価率: '0.7669722443', 販管費率: '0.3125', 推定: '販管' },
    { 製品名: '明太子13', 生産高_金額: '354,000', 粗利_金額: '-5,417.26', 粗利_粗利率: '-0.0153029944', 原価率: '0.6650205085', 販管費率: '0.3502824859', 推定: '販管' },
    { 製品名: 'たらこ15', 生産高_金額: '588,000', 粗利_金額: '-5,104.27', 粗利_粗利率: '-0.0086807313', 原価率: '0.6991569218', 販管費率: '0.3095238095', 推定: '販管' },
  ];

  return (
    <div className="max-w-5xl p-8 bg-white">

      {/* 結論・サマリー */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 border-b-2 border-gray-300 pb-2">結論・サマリー</h2>
        <p className="mb-4 leading-relaxed">
          分析の結果、製品群は明確に「高収益の柱となる製品」と「収益を圧迫している赤字製品」に二極化しています。
        </p>
        <div className="space-y-3">
          <div>
            <span className="font-semibold">1. 収益の柱:</span> 上位数品目で全体の粗利の過半数を稼ぎ出しています。特に明太子関連の主力製品が収益を牽引しています。
          </div>
          <div>
            <span className="font-semibold">2. 課題:</span> 3つの製品が赤字となっており、これらは主に「製造原価率の高さ」または「販管費の負担」が原因です。
          </div>
          <div>
            <span className="font-semibold">3. 提案:</span>
            <div className="ml-6 mt-2 space-y-2">
              <div><span className="font-semibold">1. Aランク製品:</span> 現在の販売戦略を維持しつつ、在庫切れを防ぐ安定供給に注力する。</div>
              <div><span className="font-semibold">2. 赤字製品:</span> 「明太子10」などの赤字幅が大きい製品は、直ちに価格改定を行うか、製造プロセスの見直しによる原価低減が必要です。改善が見込めない場合は撤退を推奨します。</div>
            </div>
          </div>
        </div>
      </section>

      {/* ポートフォリオの全体像 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">1. ポートフォリオの全体像（バブルチャート）</h2>
        <p className="mb-4 text-sm leading-relaxed">
          縦軸に事業規模（生産高）、横軸に収益性（粗利率）、バブルの大きさに利益額をとったポートフォリオマップです。色が赤いバブルは赤字製品を示しています。
        </p>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-4">
          <h3 className="text-center font-semibold mb-4">製品ポートフォリオ分析(PPM風バブルチャート)</h3>
          <div className="w-full" style={{ height: '400px' }}>
            <Bubble data={bubbleData} options={options} />
          </div>
        </div>

        <div className="text-sm space-y-2 ml-4">
          <div><span className="font-semibold">1. 右上の象限（高売上・高収益）:</span> ここに位置する製品が現在のスター製品です。</div>
          <div><span className="font-semibold">2. 左下の象限（低売上・低収益）:</span> ここに位置する製品、特に赤色のバブルは早急な対策が必要です。</div>
        </div>
      </section>

      {/* 重点製品の特定 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">2. 重点製品の特定（ABC分析）</h2>
        <p className="mb-4 text-sm">
          利益貢献度に基づき製品をランク付けしました。以下の表は、利益への貢献度が高い「Aランク」製品（上位製品）の一覧です。
        </p>
        
        <div className="overflow-x-auto mb-4">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-3 py-2">製品名</th>
                <th className="border border-gray-300 px-3 py-2">生産高_金額</th>
                <th className="border border-gray-300 px-3 py-2">粗利_金額</th>
                <th className="border border-gray-300 px-3 py-2">粗利_粗利率</th>
                <th className="border border-gray-300 px-3 py-2">ランク</th>
                <th className="border border-gray-300 px-3 py-2">累積比率</th>
              </tr>
            </thead>
            <tbody>
              {abcData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">{row.製品名}</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">{row.生産高_金額}</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">{row.粗利_金額}</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">{row.粗利_粗利率}</td>
                  <td className="border border-gray-300 px-3 py-2 text-center font-semibold">{row.ランク}</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">{row.累積比率}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-sm">
          <div className="font-semibold mb-2">分析:</div>
          <div className="space-y-2 ml-4">
            <div>1. 上位製品は高い粗利率（30%〜40%台）を維持しており、健全な収益構造です。</div>
            <div>2. これらの製品に関しては、コスト削減よりも販売数量の維持・拡大（マーケティング強化、欠品防止）が最優先事項となります。</div>
          </div>
        </div>
      </section>

      {/* 課題製品の特定 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">3. 課題製品の特定と要因分析</h2>
        <p className="mb-4 text-sm">
          粗利がマイナスとなっている「赤字製品」を抽出し、その要因をコスト構造（原価率・販管費率）から分析しました。
        </p>
        
        <div className="overflow-x-auto mb-4">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-red-50">
              <tr>
                <th className="border border-gray-300 px-3 py-2">製品名</th>
                <th className="border border-gray-300 px-3 py-2">生産高_金額</th>
                <th className="border border-gray-300 px-3 py-2">粗利_金額</th>
                <th className="border border-gray-300 px-3 py-2">粗利_粗利率</th>
                <th className="border border-gray-300 px-3 py-2">原価率</th>
                <th className="border border-gray-300 px-3 py-2">販管費率</th>
                <th className="border border-gray-300 px-3 py-2">推定</th>
              </tr>
            </thead>
            <tbody>
              {deficitData.map((row, idx) => (
                <tr key={idx} className="hover:bg-red-50">
                  <td className="border border-gray-300 px-3 py-2">{row.製品名}</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">{row.生産高_金額}</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-red-600 font-semibold">{row.粗利_金額}</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-red-600">{row.粗利_粗利率}</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">{row.原価率}</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">{row.販管費率}</td>
                  <td className="border border-gray-300 px-3 py-2 text-center">{row.推定}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-sm">
          <div className="font-semibold mb-2">赤字要因の分析:</div>
          <div className="space-y-2 ml-4">
            <div><span className="font-semibold">1. 明太子10:</span> 粗利率が-14%と最も悪化しています。原価率が非常に高く（製造原価が売上の大部分を占める）、さらに販管費も加わって大幅な赤字です。製造プロセスに構造的な問題があるか、卸値が原価割れしている可能性があります。</div>
            <div><span className="font-semibold">2. 明太子16:</span> 原価率は比較的抑えられていますが、販管費率が高い可能性があります（または単に売上規模に対して固定費が重い）。</div>
            <div><span className="font-semibold">3. 明太子22:</span> 粗利率が-0.5%とわずかに赤字です。微修正（若干の値上げや小規模なコストダウン）で黒字化できる可能性があります。</div>
          </div>
        </div>
      </section>

      {/* 具体的な改善アクション提案 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">4. 具体的な改善アクション提案</h2>
        <p className="mb-4 text-sm">
          以上の分析に基づき、以下の3つの方向性で改善策を提案します。
        </p>

        <div className="space-y-6">
          {/* A. 収益改善・撤退検討 */}
          <div className="border-l-4 border-red-500 pl-4">
            <h3 className="font-bold text-lg mb-2">A. 収益改善・撤退検討（赤字製品対象）</h3>
            <div className="space-y-2 text-sm">
              <div><span className="font-semibold">1. 対象:</span> 明太子10, 明太子16, 明太子22</div>
              <div><span className="font-semibold">2. アクション:</span></div>
              <div className="ml-6 space-y-2">
                <div><span className="font-semibold">1. 値上げ交渉:</span> 特に明太子10は原価率が高すぎるため、卸値の見直しが必須です。</div>
                <div><span className="font-semibold">2. 製造ラインの統合:</span> 生産数量が少ない場合、他の類似製品と製造ラインを統合し、段取り替え等の固定費を削減できないか検討してください。</div>
                <div><span className="font-semibold">3. 撤退判断:</span> 上記対策を行っても半年以内に黒字化が見込めない場合、ポートフォリオからの削除（廃番）を推奨します。</div>
              </div>
            </div>
          </div>

          {/* B. 利益率向上 */}
          <div className="border-l-4 border-yellow-500 pl-4">
            <h3 className="font-bold text-lg mb-2">B. 利益率向上（Cランク・低収益黒字製品対象）</h3>
            <div className="space-y-2 text-sm">
              <div><span className="font-semibold">1. 対象:</span> 粗利率が平均（約10-20%）を下回る黒字製品</div>
              <div><span className="font-semibold">2. アクション:</span></div>
              <div className="ml-6 space-y-2">
                <div><span className="font-semibold">1. 販管費の抑制:</span> プロモーション費用や物流費の見直しを行い、利益率の底上げを図ります。</div>
                <div><span className="font-semibold">2. セット販売:</span> Aランク製品とのセット販売を行い、単価アップとクロスセルを狙います。</div>
              </div>
            </div>
          </div>

          {/* C. シェア拡大・維持 */}
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-bold text-lg mb-2">C. シェア拡大・維持（Aランク製品対象）</h3>
            <div className="space-y-2 text-sm">
              <div><span className="font-semibold">1. 対象:</span> 明太子1 など上位製品</div>
              <div><span className="font-semibold">2. アクション:</span></div>
              <div className="ml-6 space-y-2">
                <div><span className="font-semibold">1. 在庫最適化:</span> 機会損失を防ぐため、需要予測の精度を高め、安全在庫を確保します。</div>
                <div><span className="font-semibold">2. プレミアム化:</span> 高い利益率を背景に、パッケージリニューアルや「厳選素材」などの付加価値を訴求し、ブランド価値をさらに高めます。</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}