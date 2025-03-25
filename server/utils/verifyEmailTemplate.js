const verifyEmailTemplate = ({ name, url }) => {
  return `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f9f9f9;
          color: #333;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          padding: 30px;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .header h2 {
          color: #333;
        }
        .body-text {
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        .button {
          display: inline-block;
          padding: 14px 25px;
          margin-top: 20px;
          background-color: #ff6600;
          color: white;
          text-decoration: none;
          font-weight: bold;
          border-radius: 5px;
          text-align: center;
        }
        .button:hover {
          background-color:rgb(229, 195, 0);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Welcome to FlashBuy, ${name}!</h2>
        </div>
        <div class="body-text">
          <p>Thank you for registering with FlashBuy. To complete your registration and activate your account, please click the button below to verify your email address:</p>
        </div>
        <div style="text-align: center;">
          <a href="${url}" class="button">Verify Your Email</a>
        </div>
        <div class="body-text">
          <p>If you did not create an account with FlashBuy, please ignore this email.</p>
          <p>Best regards, <br> The FlashBuy Team</p>
        </div>
      </div>
    </body>
  </html>
  `;
};

export default verifyEmailTemplate;
