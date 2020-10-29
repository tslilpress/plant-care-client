// import React, { useState } from 'react'
// import Modal from 'react-bootstrap/Modal'
// import Button from 'react-bootstrap/Button'
// import PlantIndex from '../PlantIndex/PlantIndex'
// import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
//
// function MyPlants (props) {
//   console.log('modal props', props)
//   const [show, setShow] = useState(false)
//
//   const handleClose = () => setShow(false)
//   const handleShow = () => setShow(true)
//   const { user } = props
//
//   let jsx
//   if (props.user !== null) {
//     jsx =
//     <div>
//       <Button variant="primary" onClick={handleShow}>
//         My Plants
//       </Button>
//
//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>My Plants</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div>
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleClose}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   }
//
//   return (
//     <div>
//       {jsx}
//     </div>
//   )
// }
//
// export default MyPlants
