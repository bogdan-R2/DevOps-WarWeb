const [userEmail, setUserEmail] = useState({value: {}, isFetching: false});



useEffect (() => { 
    if(loading) return;
    if(!user) return Navigate("/");
const setAsyncUserEmail = async () => {
    try {
      //setUserEmail(getAuth().currentUser.email);
      //setUserEmail(getAuth().currentUser.email);
      setUserEmail({value: userEmail.value, isFetching: true})
      //const userEmailValue = getAuth().currentUser.email;
      const userEmailValue = user.email;
      if(!userEmail) {
        setUserEmail({value: {}, isFetching: false})
      }else 
        setUserEmail({value: userEmailValue, isFetching: false})

    } catch(error) {
      setUserEmail({value: {}, isFetching: false})
      throw new Error(error);
    }
  
  }

  setAsyncUserEmail();
}, [user, loading]);
