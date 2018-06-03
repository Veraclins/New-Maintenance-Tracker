import prepTable from './data';

export const testGetAllRequests = (req, res) => {
  prepTable();
};

// export const approveRequest = (req, res) => {
//   (async () => {
//     const { requestId } = req.params;
//     const query = {
//       text: 'UPDATE requests SET status=($1) WHERE (id=($2) AND status=($3)) RETURNING *',
//       values: ['approved', requestId, 'pending'],
//     };
//     try {
//       await client.query(query)
//         .then((response) => {
//           const request = response.rows[0];
//           if (request !== null && typeof request === 'object') {
//             res.send(request);
//           } else {
//             res.status(404).send({
//               message: 'The given requestId does not exist or it has already been approved/disapproved. Please check again',
//             });
//           }
//         })
//         .catch(err => res.send(err.message));
//     } finally {
//       client.release();
//     }
//   })();
// };
