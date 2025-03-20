import { NextRequest } from "next/server";
import { verifySignature } from "@/utils/crypto";

// 配置信息，实际应用中应从环境变量获取
const TOKEN = process.env.TENCENT_MEETING_TOKEN || "";

/**
 * GET请求处理 - 用于获取表单数据
 */
export async function GET(request: NextRequest) {
    try {
        // 1. 获取Header参数
        const timestamp = request.headers.get("timestamp");
        const nonce = request.headers.get("nonce");
        const signature = request.headers.get("signature");

        // 2. 参数校验
        if (!timestamp || !nonce || !signature) {
            return new Response("Missing required parameters", { status: 400 });
        }

        // 3. 签名验证
        const isValid = verifySignature(
            TOKEN,
            timestamp,
            nonce,
            "",  // 空字符串作为验证数据
            signature
        );

        if (!isValid) {
            return new Response("Invalid signature", { status: 403 });
        }

        // 4. 返回表单数据
        // TODO: 实现获取表单数据的逻辑
        return new Response(JSON.stringify({
            status: "success",
            data: []
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error processing GET request:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}

/**
 * POST请求处理 - 用于提交表单数据
 */
export async function POST(request: NextRequest) {
    try {
        // 1. 获取Header参数
        const timestamp = request.headers.get("timestamp");
        const nonce = request.headers.get("nonce");
        const signature = request.headers.get("signature");

        // 2. 参数校验
        if (!timestamp || !nonce || !signature) {
            return new Response("Missing required parameters", { status: 400 });
        }

        // 3. 获取请求体
        const body = await request.json();
        if (!body) {
            return new Response("Missing request body", { status: 400 });
        }

        // 4. 签名验证
        const isValid = verifySignature(
            TOKEN,
            timestamp,
            nonce,
            JSON.stringify(body),
            signature
        );

        if (!isValid) {
            return new Response("Invalid signature", { status: 403 });
        }

        // 5. 处理表单数据
        // TODO: 实现处理表单数据的逻辑

        // 6. 返回成功响应
        return new Response(JSON.stringify({
            status: "success",
            message: "Form data processed successfully"
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error processing POST request:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}