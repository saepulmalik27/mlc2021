import React from "react"



const Illu = ({src, className, imgClass}) => {
  return (
    <div className={className}>
      <img src={`${src}`} alt="illu" className={imgClass} />
    </div>
  )
}
export default Illu
