// app/layout.js

export const metadata = {
  title: 'Southern Glazer\'s Wine & Spirits Brand Explorer',
  description: 'Explore and search wines and alcohol recommendations.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* You can add meta tags or link tags here */}
      </head>
      <body>
        <header style={{ display: 'flex', alignItems: 'center', padding: '20px' }}>
          <img src="/images/logo.png" alt="Logo" style={{ width: '100px' }} />
          <h1 style={{ fontSize: '50px', color: 'red', marginLeft: '20px' }}>
            Southern Glazer's Wine & Spirits Brand Explorer
          </h1>
        </header>
        <main style={{ padding: '20px' }}>{children}</main>
      </body>
    </html>
  );
}
