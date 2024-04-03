// import { createContext, useContext } from "react";
// import { useMovieContext } from "./Context";
// import Joi from "joi";
// import AddAdmin from './../admin/Addadmin';
// import { backEndCallObj } from "../../services/mainServiceFile";

// const FunctionsContext = createContext();

// export const FunctionsContextProvider = ({ children }) => {
//   const {

//     setErrors,
//     errors,
//     adminData,
//     setAdminData,
//     // adminControlsList,
//     // setAdminControlsList,
//   } = useMovieContext();

//   // Using Single Handlechange ,on change function for regiseter ,login, update ,new movies
//   const handleChange = (e, schema, newSetForm) => {
//     const { name, value } = e.target;

//     const errorMessage = schema?.validate(value)?.error?.message;

//     setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
//     newSetForm((prevForm) => ({ ...prevForm, [name]: value }));

//     console.log(errors);
//   };

//   const checkErrors = async (mainSchema, formData) => {
//     const schema = Joi.object(mainSchema);
//     const { error } = schema.validate(formData, { abortEarly: false });
//     if (error) {
//       const newErrors = {};
//       error.details.forEach((detail) => {
//         newErrors[detail.path[0]] = detail.message;
//       });
//       setErrors(newErrors);
//       return Promise.reject('Validation error occurred');
//     }
//     return Promise.resolve();
//   };


//   const AddAdminlist = async () => {

//     try {
//       const response = await backEndCallObj("/admin/admins_list");
//       setAdminData(response)
//       console.log(response, "hjshdkjashdjkashdkjash")
//     } catch (error) {
//       console.error("Error fetching user profile:", error);
//     }
//   };

//   // const AdminControllsList = async () => {

//   //   try {
//   //     const response = await backEndCallObj("/admin/get_admin_contrls");

//   //     const controls = ["login", "register", "withdraw"].map((key) => ({
//   //       value: response?.[key],
//   //       key,
//   //       heading: key.charAt(0).toUpperCase() + key.slice(1),
//   //     }));
//   //     setadmincontrols(controls);
//   //   } catch (error) {
//   //     console.error("Error fetching user profile:", error);
//   //   }
//   // };

//   // const AdminControllsList = async () => {
//   //   try {

//   //     const response = await backEndCallObj("/admin/get_admin_contrls");
//   //     const controls = ["login", "register", "withdraw"].map((key) => ({
//   //       value: response?.[key],
//   //       key,
//   //       heading: key.charAt(0).toUpperCase() + key.slice(1),
//   //     }));
//   //     setAdminControlsList(controls);
//   //     console.log(response, "djghjkashdgfjhadgfhjdgfhgdhj")
//   //   } catch (error) {
//   //     console.error("Error fetching admin controls:", error);

//   //   }
//   // };








//   return (
//     <FunctionsContext.Provider
//       value={{

//         handleChange,
//         checkErrors,
//         AddAdminlist,
//         // AdminControllsList,
//       }}
//       fetchesMoviesEveryTime
//     >
//       {children}
//     </FunctionsContext.Provider>
//   );
// };

// export const useFunctionContext = () => {
//   return useContext(FunctionsContext);
// };
// // FunctionsContextProvider

import { createContext, useContext, useState } from "react";
import Joi from "joi";
import { backEndCallObj } from "../../services/mainServiceFile";
import { useMovieContext } from "./Context"; // Importing useMovieContext

const FunctionsContext = createContext();

export const FunctionsContextProvider = ({ children }) => {
  const {
    setErrors,
    setAdminData,
    SetAdminControlsList,
    setLoading,

    setErrorOccur,
    usersList, setUsersList,
    skip, setSkip,
    limit, setLimit,
    textDisplay,
    setTextDisplay,
    toast
  } = useMovieContext();



  const handleChange = (e, schema, newSetForm) => {
    const { name, value } = e.target;
    const errorMessage = schema?.validate(value)?.error?.message;


    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    newSetForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const checkErrors = async (mainSchema, formData) => {
    const schema = Joi.object(mainSchema);
    const { error } = schema.validate(formData, { abortEarly: false });

    if (error) {
      const newErrors = {};
      error.details.forEach((detail) => {
        newErrors[detail.path[0]] = detail.message;
      });
      setErrors(newErrors);
      return Promise.reject('Validation error occurred');
    }

    return Promise.resolve();
  };



  const AddAdminlist = async () => {
    try {
      const response = await backEndCallObj("/admin/admins_list");
      setAdminData(response);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };


  const UsersList = async () => {
    setLoading(true);
    try {
      const obj = { skip, limit };
      const response = await backEndCallObj("/admin/users_list", obj);
      if (response?.length === 0) {
        setTextDisplay(true);
      } else {
        setUsersList(prevUsers => [...prevUsers, ...response]);
        if (response?.length >= 0) {
          setSkip(prevSkip => prevSkip + limit);
        }
      }
    } catch (ex) {
      setErrorOccur(true);
      if (ex.response && ex.response?.status === 400) {
        toast.error(ex.response?.data);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <FunctionsContext.Provider
      value={{
        handleChange,
        checkErrors,
        AddAdminlist,
        UsersList,
        setUsersList,
        skip,
        setSkip,
        limit,
        setLimit,
        textDisplay,
        setTextDisplay
      }}
    >
      {children}
    </FunctionsContext.Provider>
  );
};

export const useFunctionContext = () => {
  return useContext(FunctionsContext);
};
