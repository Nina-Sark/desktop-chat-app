import Head from "next/head";
import { FC } from "react";
import { HeadProps } from "./Head.types";

export const HeadComponent: FC<HeadProps> = ({ title, description }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/chat-icon.png" />
      </Head>
    </>
  );
};
