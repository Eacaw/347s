import Head from "next/head";

export default function Metatags({
  title = "347s",
  description = "Recipes Repository for 347s",
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Head>
  );
}
