// import { createContext, useContext, useEffect, useState } from "react";
// import { jwtDecode } from "jwt-decode";

// const MovieContext = createContext();

// export const MovieContextProvider = ({ children }) => {
//   // All the component states declared on the Top To avaoid unnessary confusions and main thing these are the global states , every component have its one local state , even passing props from one component to anothe component is not allowed in my coding

//   const [movieItem, setMovieItem] = useState({
//     _id: "",
//     title: "",
//     genre: { _id: "", name: "" },
//     numberInStock: "",
//     dailyRentalRate: "",
//     publishDate: "",
//     liked: false,
//   });
//   const [adminData, setAdminData] = useState([]);
//   const [adminControlsList, SetAdminControlsList] = useState([]);

//   const [genresData, setGenresData] = useState([]);

//   let loginedUser = localStorage.getItem("userDataJwt");

//   const [user, setUser] = useState(
//     localStorage.getItem("userDataJwt") ? jwtDecode(loginedUser) : ""
//   );

//   const [actualMovies, setActualMovies] = useState([]);
//   const [sameMovies, setSameMovies] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(4);
//   const [itemSelect, setItemSelect] = useState("All");
//   const [sortCriteria, setSortCriteria] = useState(null);
//   const [sortAscending, setSortAscending] = useState(true);

//   const [errors, setErrors] = useState({});

//   const [loading, setLoading] = useState(false)
//   const [errorOccur, setErrorOccur] = useState(false)












//   return (
//     <MovieContext.Provider
//       value={{
//         movieItem,
//         setMovieItem,
//         genresData,
//         setGenresData,
//         user,
//         setUser,
//         actualMovies,
//         setActualMovies,
//         sameMovies,
//         setSameMovies,
//         currentPage,
//         setCurrentPage,
//         itemsPerPage,
//         setItemsPerPage,
//         itemSelect,
//         setItemSelect,
//         sortCriteria,
//         setSortCriteria,
//         sortAscending,
//         setSortAscending,
//         errors,
//         setErrors,
//         errorOccur,
//         setErrorOccur,
//         loading,
//         setLoading,
//         adminData, setAdminData,

//         adminControlsList, SetAdminControlsList
//       }}
//     >
//       {children}
//     </MovieContext.Provider>
//   );
// };

// export const useMovieContext = () => {
//   return useContext(MovieContext);
// };
import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const MovieContext = createContext();

export const MovieContextProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("userDataJwt") ? jwtDecode(localStorage.getItem("userDataJwt")) : "");
  const [adminData, setAdminData] = useState([]);
  const [adminControlsList, SetAdminControlsList] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorOccur, setErrorOccur] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [skip, setSkip] = useState(0); // Define 'skip' state
  const [limit, setLimit] = useState(10); // Define 'limit' state
  const [textDisplay, setTextDisplay] = useState(false); // Define 'textDisplay' state

  return (
    <MovieContext.Provider
      value={{
        user,
        setUser,
        adminData,
        setAdminData,
        adminControlsList,
        SetAdminControlsList,

        errors,
        setErrors,
        errorOccur,
        setErrorOccur,
        loading,
        setLoading,
        usersList, setUsersList,
        skip, setSkip,
        limit, setLimit,
        textDisplay,
        setTextDisplay
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  return useContext(MovieContext);
};
