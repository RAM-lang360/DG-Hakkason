// 指定されたURLにGETリクエストを送信する関数
async function executeOpenAPI() {
  const url = "https://598a2667cb7e.ngrok-free.app/open";

  console.log(`Executing request to: ${url}`);

  try {
    const response = await fetch(url);
    const data = await response.text();

    console.log("Status Code:", response.status);
    console.log("Headers:", Object.fromEntries(response.headers));
    console.log("Response Body:", data);
  } catch (err) {
    console.error("Request Error:", err.message);
  }
}

// 実行
if (require.main === module) {
  executeOpenAPI();
}

module.exports = {
  executeOpenAPI,
};
