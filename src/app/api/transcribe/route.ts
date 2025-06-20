import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // フォームデータの取得
  const formData = await req.formData();
  // const file = formData.get("file"); // 未使用なのでコメントアウト
  const duration = formData.get("duration");

  // ここで音声処理を行う（今回はダミー応答）
  return NextResponse.json({
    result: `ダミー応答: duration=${duration}秒で音声ファイルを受け取りました。`,
  });
}
