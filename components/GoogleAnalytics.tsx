import Script from "next/script";

const ID_MEDICAO = "G-Q8Q258867V";

export function GoogleAnalytics() {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${ID_MEDICAO}`} strategy="afterInteractive" />
      <Script id="google-analytics-inicio" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ID_MEDICAO}');`}
      </Script>
    </>
  );
}
