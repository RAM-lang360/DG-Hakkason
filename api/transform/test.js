const fs = require("fs");
const path = require("path");

async function getOrder() {
  try {
    const response = await fetch(
      "https://tjufwmnunr.ap-northeast-1.awsapprunner.com/api/v1/orders?appId=app_0001"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // orders.jsonファイルのパスを設定
    const ordersPath = path.join(__dirname, "../data/orders.json");

    // JSONファイルに書き出し
    fs.writeFileSync(ordersPath, JSON.stringify(data, null, 2));

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
module.exports = {
  getOrder,
};
