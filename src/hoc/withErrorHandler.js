import React,{useState} from 'react';
import Modal from '../components/UI/modal/Modal'

const withErrorHandler = (Component, axios) =>{
  return props =>{
    const [error, setError] = useState({
      show: false,
      error: null
    });

    axios.interceptors.request.use(req => req,
      err => {
        setError({
          show: true,
          error: err
        });
        return Promise.reject(err)
      }
      )
    axios.interceptors.response.use(res => res,
      err=>{
        setError({
          show: true,
          error: err
        });
        return Promise.reject(err)
      }
      )

    const removeError =() =>{
      setError({
        show: false,
        error: null
      })
    }

    return (
      <React.Fragment>
        {error.error && <Modal show={error.show} click={removeError}>
          {error.error.message}</Modal>
        }
        <Component {...props} />
      </React.Fragment>
      )
  }
}

export default withErrorHandler;
