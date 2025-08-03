// ブラウザ用のtransform.js
async function formatOrderData() {
  try {
    // JSONファイルをfetchで読み込み
    const response = await fetch("./order.json");
    const data = await response.json();

    // ordersのみ抽出し、必要な情報を整形
    const orders = data.orders.map((order) => ({
      // 注文基本情報
      id: order.id, // 注文ID (例: "order_2073")
      orderAt: order.orderAt, // 注文日時のタイムスタンプ (例: 1735446129789)
      status: order.status, // 注文ステータス (例: "completed")

      // 顧客情報
      customer: {
        id: order.customer.id, // 顧客ID (例: "customer_0142")
        name: order.customer.name, // 顧客名 (例: "水野翔")
        email: order.customer.email, // メールアドレス (例: "mizuno.sho@example.com")
        phoneNumber: order.customer.phoneNumber, // 電話番号 (例: "09012345699")
        gender: order.customer.gender, // 性別 (例: "male")
        birthDate: order.customer.birthDate, // 生年月日 (例: "1995-10-31")
        prefecture: order.customer.prefecture.name, // 都道府県名 (例: "栃木県") ※prefecture.nameで取得
      },

      // アプリケーション情報
      app: {
        id: order.app.id, // アプリID (例: "app_0010")
        name: order.app.name, // アプリ名 (例: "海の支配者")
        platform: order.app.platform, // プラットフォーム配列 (例: ["android"])
      },

      // 決済方法
      paymentMethod: order.paymentMethod, // 決済方法 (例: "credit_card")

      // 購入アイテム情報
      item: {
        id: order.item.id, // アイテムID (例: "item_0010_0005")
        name: order.item.name, // アイテム名 (例: "海賊のコイン")
        price: order.item.price, // 価格 (例: 200)
        currency: order.item.currency, // 通貨 (例: "JPY")
        category: order.item.category, // カテゴリ (例: "currency")
      },
    }));
    return orders;
  } catch (error) {
    console.error("データの読み込みエラー:", error);
    throw error;
  }
}

// 元のJSONデータを取得する関数
async function getOriginalOrderData() {
  try {
    const response = await fetch("./order.json");
    const data = await response.json();
    return data.orders;
  } catch (error) {
    console.error("元データの読み込みエラー:", error);
    throw error;
  }
}

// グローバルに関数を公開
window.formatOrderData = formatOrderData;
window.getOriginalOrderData = getOriginalOrderData;

/*
ordersの内訳:
- 各orderオブジェクトには以下のプロパティが含まれます：

1. 注文基本情報:
   - id: order.id (注文の一意識別子)
   - orderAt: order.orderAt (注文日時のUnixタイムスタンプ)
   - status: order.status (注文の状態: "completed"など)

2. 顧客情報 (order.customer):
   - id: order.customer.id (顧客ID)
   - name: order.customer.name (顧客の氏名)
   - email: order.customer.email (メールアドレス)
   - phoneNumber: order.customer.phoneNumber (電話番号)
   - gender: order.customer.gender (性別)
   - birthDate: order.customer.birthDate (生年月日)
   - prefecture: order.customer.prefecture.name (都道府県名 ※ネストしたオブジェクトのnameプロパティ)

3. アプリ情報 (order.app):
   - id: order.app.id (アプリケーションID)
   - name: order.app.name (アプリケーション名)
   - platform: order.app.platform (対応プラットフォームの配列)

4. 決済情報:
   - paymentMethod: order.paymentMethod (決済方法)

5. 購入アイテム情報 (order.item):
   - id: order.item.id (アイテムID)
   - name: order.item.name (アイテム名)
   - price: order.item.price (価格)
   - currency: order.item.currency (通貨単位)
   - category: order.item.category (アイテムカテゴリ)
*/
