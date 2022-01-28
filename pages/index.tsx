import type { GetServerSideProps, NextPage } from "next";
import styled, { css } from "styled-components";
import { HomePageStyled } from "../styles/HomePage.styled";
import { HeadComponent } from "../components/Head/Head";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../db/firebase";
import { useRouter } from "next/router";
import { addUserToDB, handleLogin } from "../db/utils";
import { Loader } from "../components/Loader/Loader";
import { useEffect } from "react";
import Cookies from "js-cookie";

interface Props {
  title : string;
  description : string;
}

const Home: NextPage<Props> = ({ title, description }) => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const logIn = async () => {
    await handleLogin();
  };


  useEffect(() => {
    if (!loading && user) {
      addUserToDB(
        user?.email as string,
        user?.displayName as string,
        user?.photoURL as string
       )
      Cookies.set("currentUser", (user?.email as string), { expires : 7 });
      router.push(`/account/${user?.email}`)
    }
  }, [user])

  if (loading) {
    return <Loader loading={loading}/>
  }


  if (!loading && !user) {
    return (
      <HomePageStyled>
        <HeadComponent
          title={title}
          description={description}
        />
        <img src="/chat-icon.png" />
        <button onClick={logIn}>Log in</button>
      </HomePageStyled>
    );
  }

  return <Loader loading={true}/>
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req, res } = ctx;
  const {
    cookies: { currentUser },
  } = req;

  if(currentUser) {
    return {
      redirect: {
        destination: `/account/${currentUser}`,
        permanent: false,
      },
    }
  }

  return {
    props : {
       title : "Chat App",
       description : "Chat App to Get In touch with friends"
    }
  }
}

export default Home;
