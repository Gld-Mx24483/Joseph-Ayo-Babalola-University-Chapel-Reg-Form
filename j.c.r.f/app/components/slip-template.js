// slip-template.js
// The registration slip a student downloads after submitting. Also regenerated when an admin edits a record.
export const generateSlipHTML = (data, passportUrl, date = new Date()) => {
  const currentDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body, html {
          margin: 0;
          padding: 0;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.4;
          color: #333;
          font-size: 10px;
        }
        .container {
          width: 100%;
          max-width: 800px;
          margin: auto;
          padding: 20px;
        }
        .header {
          text-align: left;
          padding-bottom: 10px;
        }
        h1 {
          color: #333;
          margin-bottom: 5px;
          font-size: 16px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1px;
          line-height: 1.2;
        }
        .header-line {
          border-bottom: 1px solid #333;
          margin-bottom: 10px;
        }
        .timestamp {
          color: #718096;
          font-size: 10px;
          margin-bottom: 10px;
        }
        .content {
          margin-bottom: 10px;
          position: relative;
          min-height: 100px;
        }
        .details span {
          font-weight: bold;
        }
        .image-container {
          position: absolute;
          top: 0;
          right: 10px;
          width: 80px;
          height: 100px;
          border: 1px solid #333;
        }
        .passport-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .letter-body {
          clear: both;
          margin-top: 30px;
        }
        .letter-body p:last-child {
          margin-top: 30px;
        }
        .signature-section {
          margin-top: 50px;
          display: flex;
          justify-content: space-between;
          width: 100%;
        }
        .signature {
          width: 120px;
          text-align: center;
        }
        .signature-line {
          width: 100%;
          border-bottom: 1px solid #333;
          margin-bottom: 5px;
        }
        .signature p {
          margin: 0;
          font-size: 10px;
          text-align: center;
          width: 100%;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>JABU CHAPLAINCY UNIT<br>REGISTRATION VERIFICATION<br>DOCUMENT</h1>
          <div class="header-line"></div>
        </div>
       <div class="timestamp">${currentDate}</div>
          <div class="content">
            <div class="image-container">
              <img class="passport-img" src="${passportUrl}" alt="Passport Photo">
            </div>
          <div class="details">
            <p>Dear <span>${data.firstName} ${data.surname}</span>,</p>
              <p><span>${data.department}</span></p>
              <p><span>${data.level} Level</span></p>
              <p><span>${data.phoneNo}</span></p>
              <p><span>${data.sex}</span></p>
          </div>
        </div>
        <div class="letter-body">
          <p>
            You've completed your Chaplaincy Clearance form successfully. You are now authorized to meet with the Chaplain to present this slip for his signature.
          </p>
          <p>Remain Blessed,</p>
        </div>
        <div class="signature-section">
          <div class="signature">
            <div class="signature-line"></div>
            <p>Pastor Oluwasanmi J.O.</p>
          </div>
          <div class="signature">
            <div class="signature-line"></div>
            <p>${data.firstName} ${data.surname}</p>
          </div>
        </div>
      </div>
    </body>
  </html>
  `;
};
