const forgotPasswordTemplate = ({ name, otp }) => {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f9f9f9;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .otp-box {
            background: #ffeb3b;
            font-size: 22px;
            padding: 15px;
            text-align: center;
            font-weight: bold;
            border-radius: 5px;
            width: fit-content;
            margin: 20px auto;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <p>Dear <strong>${name}</strong>,</p>
        <p>You have requested a password reset for your FlashBuy account. Please use the OTP code below to proceed with resetting your password:</p>
        
        <div class="otp-box">${otp}</div>
        
        <p>This OTP is valid for <strong>1 hour only</strong>. Enter this code on the <strong>FlashBuy</strong> website to reset your password.</p>
        
        <p>If you did not request this, please ignore this email or contact our support team.</p>
        
        <p>Best regards,</p>
        <p><strong>FlashBuy Support Team</strong></p>
        
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} FlashBuy. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
    `;
};

export default forgotPasswordTemplate;
