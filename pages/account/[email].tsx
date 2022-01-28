import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { CreateChat } from "../../components/createChat/CreateChat";
import { HeadComponent } from "../../components/Head/Head";
import { LeftBar } from "../../components/LeftBar/LeftBar";
import { Loader } from "../../components/Loader/Loader";
import { Modal } from "../../components/Modal/Modal";
import { auth, db } from "../../db/firebase";
import { DATA, USER } from "../../db/types";
import { getDataHandler, getDateHandler, modifyDataHandler, transformDataHandler } from "../../db/utils";
import { filterData, getData } from "../../state/reducers/FilterReducer";
import { STATE } from "../../state/store";
import { AccountPageLayout } from "../../styles/AccountPage.styled";
//data[0]
export interface Data {
   id : string;
  participant: {
    email: string;
    username: string;
    photo: string;
    lastActive: string;
  };

  lastActive: string;
  message : string;
  notSeenMessages : any[];
}

interface Props {
  data: Data[];
  id : string;
}

const Account: NextPage<Props> = ({ data, id }) => {
  const [user, loading] = useAuthState(auth);
  const [chatsData, setChatsData] = useState<Data[]>(data)

  const modalState = useSelector((state: STATE) => state.modalState.open)
  const chatsDataArr = useSelector((state: STATE) => state.filterState.data);
  const filterValue = useSelector((state: STATE) => state.filterState.filterValue);
  const filteredData = useSelector((state: STATE) => state.filterState.filteredData);


  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getData({ data: chatsData }))
   
    const q = query(collection(db, "users", id, "chats"), orderBy("lastActive", "desc"))
    const unsub = onSnapshot(q, snapshot => {
       snapshot.docs.map(async doc => {
           let data: DATA[] = []
           const trasnformedData = await transformDataHandler<DATA>(snapshot.docs, data, id);
           const modifiedData = await modifyDataHandler<DATA, USER>(trasnformedData, id);
           setChatsData((modifiedData as Data[]))
           dispatch(getData({ data: modifiedData as Data[] }))
           dispatch(filterData())
       })
    })

    return unsub;

  }, [])

  useEffect(() => {
    if (!loading && !user || user?.email !== id) {
      router.push("/");
    }
  }, [user, loading]);

  if (loading) {
    return <>
    <HeadComponent
         title={`Account`}
         description="Account"
       />
   <Loader loading={loading} />
 </>
  }

  if (!loading && user && user?.email === id) {
    return (
      <>
        <HeadComponent
          title={`Account | ${user.displayName}`}
          description="Account"
        />
        <AccountPageLayout>
          <Modal open={modalState}/>
          <LeftBar data={filterValue.length > 0 ? filteredData : chatsDataArr} />
          <CreateChat />
        </AccountPageLayout>
      </>
    );
  }

  return <>
     <HeadComponent
          title={`Account`}
          description="Account"
        />
    <Loader loading={true} />
  </>
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { req, res } = ctx;
  const {
    cookies: { currentUser },
  } = req;

  const id = (ctx.params as { email: string }).email;

  if(!currentUser) {
    return {
      redirect : {
        destination : "/",
        permanent : false
      }
    }
  }


  if(currentUser && currentUser !== id) {
    return {
      redirect : {
        destination : `/account/${currentUser}`,
        permanent : false
      }
    }
  }

  const data = await getDataHandler<DATA, USER>(id);

  return {
    props: {
      data,
      id
    },
  };
};

export default Account;
