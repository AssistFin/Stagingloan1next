export default function handler(req, res) {
  if (req.method === 'POST') {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(`
      <html>
        <head>
          <title>Redirecting...</title>
          <script>
            // Redirect after 1 second
            setTimeout(function() {
              window.location.href = '/loandisbursal';
            }, 1000);
          </script>
        </head>
        <body>
          <p style="text-align:center; margin-top: 50px;">Please wait... redirecting to Loan Disbursal Page.</p>
        </body>
      </html>
    `);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
