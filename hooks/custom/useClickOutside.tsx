import React, { EventHandler, useEffect } from 'react'

const useClickOutside = ({ ref, show, setShow }: any) => {


  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref?.current && !ref.current.contains(event.target) && show) {
        setShow(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, show]);

}

export default useClickOutside
