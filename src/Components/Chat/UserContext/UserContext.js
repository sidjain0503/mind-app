import {createContext} from 'react'

const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
  
    useEffect(() => {
      const unsub = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        console.log(user);
      });
  
      return () => {
        unsub();
      };
    }, []);
  
    return (
      <UserContext.Provider value={{ currentUser }}>
        {children}
      </UserContext.Provider>
    );
  };
  