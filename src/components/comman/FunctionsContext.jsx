
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import Joi from "joi";
import { backEndCall, backEndCallObj } from "../../services/mainServiceFile";
import { useMovieContext } from "./Context"; // Importing useMovieContext

const FunctionsContext = createContext();

export const FunctionsContextProvider = ({ children }) => {
  const {
    setErrors,
    setAddadminData,
    // SetAdminControlsList,
    loading,
    setLoading,

    setErrorOccur,
    usersList, setUsersList,
    skip, setSkip,
    limit, setLimit,
    textDisplay,
    setTextDisplay,
    transactionHistory, setTransactionHistory,
    RecenttransactionHistory, setRecentTransactionHistory,
    // dashbord
    userData, setUserData,
    adminData, setAdminData,
    loanStatus, setLoanStatus,
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







  const UsersListData = async () => {
    console.log("hii ")
    setLoading(true);
    try {

      const obj = { skip, limit };
      // Check if usersList state is null or empty before making the call

      const response = await backEndCallObj("/admin/users_list", obj);
      console.log(response, "users")

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




  //  addAmin funtion
  const AddAdminlist = async () => {
    const response = await backEndCallObj("/admin/admins_list");
    setAddadminData(response);

  };


  // Fetch user  dashborad data
  const fetchUserData = async () => {
    try {
      const response = await backEndCall("/users/user_stats");
      setUserData(response);
      // console.log(response, "total amount")
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
    }
  };

  // Fetch admin  dashborad data
  const fetchAdminData = async () => {
    try {
      const response = await backEndCall("/admin/admin_stats");
      setAdminData(response);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
    }
  };
  // useEffect(() => {
  //   fetchUserData();
  //   fetchAdminData();

  // }, [fetchUserData, fetchAdminData]);


  return (
    <FunctionsContext.Provider
      value={{
        handleChange,
        checkErrors,
        UsersListData,
        setUsersList,
        textDisplay,
        setTextDisplay,
        transactionHistory, setTransactionHistory,
        RecenttransactionHistory, setRecentTransactionHistory,
        AddAdminlist,
        fetchUserData,

        fetchAdminData,
      }}
    >
      {children}
    </FunctionsContext.Provider>
  );
};

export const useFunctionContext = () => {
  return useContext(FunctionsContext);
};
