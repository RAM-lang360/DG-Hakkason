
async function formatReviewData() {
  try {
    const response = await fetch("./review.json");
    const data = await response.json();
    const reviews = data.reviews.map((review) => ({
      // アプリ基本情報
      appId: review.appId, // アプリID (例: "app_0001")
      averageRating: review.averageRating, // 平均評価 (例: 4.2)
      count: review.count, // レビュー数 (例: 1250)
    }));
    return reviews;
  } catch (error) {
    console.error("レビューデータの読み込みエラー:", error);
    throw error;
  }
}

// 元のJSONデータを取得する関数
async function getOriginalReviewData() {
  try {
    const response = await fetch("./review.json");
    const data = await response.json();
    return data.reviews;
  } catch (error) {
    console.error("元レビューデータの読み込みエラー:", error);
    throw error;
  }
}

// グローバルに関数を公開
window.formatReviewData = formatReviewData;
window.getOriginalReviewData = getOriginalReviewData;

/*
reviewsの内訳:
- 各reviewオブジェクトには以下のプロパティが含まれます：

1. アプリ情報:
   - appId: review.appId (アプリの一意識別子)
   - averageRating: review.averageRating (平均評価値: 0.0-5.0の範囲)
   - count: review.count (レビュー総数)
*/
