/**
 * Utility function to download resume as PDF
 * Opens print dialog which allows saving as PDF
 */
export const downloadResume = () => {
    // Create a new window with the resume content
    const printWindow = window.open("", "_blank");

    if (!printWindow) {
        alert("Please allow pop-ups to download the resume");
        return;
    }

    // Get the resume HTML content
    const resumeContent = document.getElementById("resume-content");

    if (!resumeContent) {
        alert("Resume content not found");
        return;
    }

    // Create the HTML document for printing - Optimized for single page
    const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Naveen Kumar - Resume</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Arial', 'Helvetica', sans-serif;
            color: #000;
            background: #fff;
            padding: 15px;
            line-height: 1.3;
            font-size: 11px;
          }
          .resume-container {
            max-width: 100%;
            margin: 0 auto;
          }
          h1 {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 2px;
          }
          h2 {
            font-size: 12px;
            font-weight: bold;
            margin-top: 8px;
            margin-bottom: 4px;
            border-bottom: 1px solid #333;
            padding-bottom: 2px;
          }
          h3 {
            font-size: 11px;
            font-weight: bold;
            margin-top: 6px;
            margin-bottom: 2px;
          }
          h4 {
            font-size: 10px;
            font-weight: bold;
            margin-top: 4px;
            margin-bottom: 2px;
          }
          p {
            margin-bottom: 3px;
            font-size: 10px;
            line-height: 1.2;
          }
          ul {
            margin-left: 15px;
            margin-bottom: 4px;
            margin-top: 2px;
          }
          li {
            margin-bottom: 1px;
            font-size: 9px;
            line-height: 1.2;
          }
          .header {
            border-bottom: 2px solid #333;
            padding-bottom: 8px;
            margin-bottom: 8px;
          }
          .contact-info {
            font-size: 9px;
            margin-top: 4px;
          }
          .contact-info div {
            margin-bottom: 1px;
            display: inline-block;
            margin-right: 12px;
          }
          .skills-section {
            margin-bottom: 8px;
          }
          .skill-tag {
            display: inline-block;
            background: #f0f0f0;
            padding: 2px 6px;
            margin: 2px;
            border-radius: 2px;
            font-size: 8px;
          }
          .work-experience {
            margin-bottom: 8px;
          }
          .company {
            margin-bottom: 6px;
          }
          .project {
            margin-left: 10px;
            margin-bottom: 4px;
          }
          .education-item {
            margin-bottom: 4px;
          }
          .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }
          @media print {
            body {
              padding: 10px;
              font-size: 10px;
            }
            .resume-container {
              max-width: 100%;
              padding: 0;
            }
            @page {
              margin: 0.5cm;
              size: A4;
            }
            h1 { font-size: 18px; }
            h2 { font-size: 11px; margin-top: 6px; }
            h3 { font-size: 10px; }
            h4 { font-size: 9px; }
            p { font-size: 9px; }
            li { font-size: 8px; }
            .skill-tag { font-size: 7px; padding: 1px 4px; }
          }
        </style>
      </head>
      <body>
        <div class="resume-container">
          ${resumeContent.innerHTML}
        </div>
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 250);
          };
        </script>
      </body>
    </html>
  `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
};

/**
 * Alternative: Generate and download as HTML file
 */
export const downloadResumeAsHTML = () => {
    const resumeContent = document.getElementById("resume-content");

    if (!resumeContent) {
        alert("Resume content not found");
        return;
    }

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Naveen Kumar - Resume</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Arial', 'Helvetica', sans-serif;
      color: #000;
      background: #fff;
      padding: 15px;
      line-height: 1.3;
      font-size: 11px;
    }
    .resume-container {
      max-width: 100%;
      margin: 0 auto;
    }
    h1 {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 2px;
    }
    h2 {
      font-size: 12px;
      font-weight: bold;
      margin-top: 8px;
      margin-bottom: 4px;
      border-bottom: 1px solid #333;
      padding-bottom: 2px;
    }
    h3 {
      font-size: 11px;
      font-weight: bold;
      margin-top: 6px;
      margin-bottom: 2px;
    }
    h4 {
      font-size: 10px;
      font-weight: bold;
      margin-top: 4px;
      margin-bottom: 2px;
    }
    p {
      margin-bottom: 3px;
      font-size: 10px;
      line-height: 1.2;
    }
    ul {
      margin-left: 15px;
      margin-bottom: 4px;
      margin-top: 2px;
    }
    li {
      margin-bottom: 1px;
      font-size: 9px;
      line-height: 1.2;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .skill-tag {
      display: inline-block;
      background: #f0f0f0;
      padding: 2px 6px;
      margin: 2px;
      border-radius: 2px;
      font-size: 8px;
    }
    @media print {
      body {
        padding: 10px;
        font-size: 10px;
      }
      @page {
        margin: 0.5cm;
        size: A4;
      }
    }
  </style>
</head>
<body>
  <div class="resume-container">
    ${resumeContent.innerHTML}
  </div>
</body>
</html>
  `;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Naveen_Kumar_Resume.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

