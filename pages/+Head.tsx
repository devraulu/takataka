// https://vike.dev/Head

import React from "react";
import favicon16 from "#root/assets/favicon-16x16.png";
import favicon32 from "#root/assets/favicon-32x32.png";
import appleTouchIcon from "#root/assets/apple-touch-icon.png";
import siteWebmanifest from "#root/assets/site.webmanifest";

export default function HeadDefault() {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <title>takataka</title>
      <meta name="description" content="A typing test app" />

      <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
      <link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
      <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
      <link rel="manifest" href={siteWebmanifest} />

      {/* <!-- Facebook Meta Tags --> */}
      <meta property="og:url" content="https://takataka.rauluis.com/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="takataka" />
      <meta property="og:description" content="A typing test app" />
      <meta property="og:image" content="https://takataka.rauluis.com/banner.png" />

      {/* <!-- Twitter Meta Tags --> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="takataka.rauluis.com" />
      <meta property="twitter:url" content="https://takataka.rauluis.com/" />
      <meta name="twitter:title" content="takataka" />
      <meta name="twitter:description" content="A typing test app" />
      <meta name="twitter:image" content="https://takataka.rauluis.com/banner.png" />
    </>
  );
}
