export default async function handler(req, res) {
  try {
    const { message } = await req.json();

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Bạn là Gia Sư AI thân thiện, chuyên hỗ trợ học sinh phổ thông về các môn Toán, Lý, Hóa, Anh, Văn. Giải thích dễ hiểu, vui vẻ, có emoji học tập nếu hợp lý.",
          },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Đã xảy ra lỗi khi gọi API OpenAI." });
  }
}
