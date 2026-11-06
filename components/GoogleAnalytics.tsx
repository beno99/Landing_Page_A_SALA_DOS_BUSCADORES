import Script from "next/script";

const ID_MEDICAO = "G-JZNRTQR4JH";

export function GoogleAnalytics() {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${ID_MEDICAO}`} strategy="beforeInteractive" />
      <Script id="google-analytics-inicio" strategy="beforeInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ID_MEDICAO}');`}
      </Script>
    </>
  );
}
