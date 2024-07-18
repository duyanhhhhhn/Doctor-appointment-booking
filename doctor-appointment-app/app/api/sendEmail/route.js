import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import EmailTemplate from '@/emails';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    try {
        const response = await req.json();
        console.log('Data received:', response); // Log toàn bộ dữ liệu nhận được

        const result = response.data;

        const data = await resend.emails.send({
            from: 'your-verified-email@gmail.com',  // Thay đổi thành một địa chỉ email đã xác minh
            to: [result.Email],
            subject: 'Appointment Booking Confirmation',
            react: EmailTemplate(result)  // Đảm bảo bạn truyền đúng tham số vào EmailTemplate
        });

        console.log('Email sent:', data); // Log phản hồi từ API gửi email
        return NextResponse.json({ data: "Email Sent" });
    } catch (error) {
        console.error("Error sending email:", error); // Log lỗi chi tiết
        return NextResponse.json({ error });
    }
}
