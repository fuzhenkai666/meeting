import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // 从请求体中获取 challenge 值
    const body = await request.json();
    const challenge = body.challenge;

    // 检查 challenge 是否存在
    if (challenge) {
      // 返回 challenge 值
      return new Response(JSON.stringify({ challenge }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      // 如果 challenge 不存在，返回错误信息
      return new Response(
        JSON.stringify({ error: "Challenge not found in request body" }), 
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }), 
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}